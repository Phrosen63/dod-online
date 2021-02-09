<template>
  <div class="characters-list">
    <ul>
      <li
        v-for="(character) in characters" :key="character.id"
        :class="{ selected: character.clicked }"
        @click="selectCharacter(character.id, character.clicked)"
      >
        {{ character.info.name }}
      </li>
    </ul>
    <CharacterViewer :character="selectedCharacter" />
  </div>
</template>

<script>
// Components
import CharacterViewer from './CharacterViewer';

// Modules
import { db } from '@/api/db';

/*
DB structure:

users / <uid> / characters /	<charName> / inventory
					   / stats
				<charName>
				<charName>

users / <uid> / settings / ...
*/

export default {
  name: 'CharacterList',
  components: {
    CharacterViewer,
  },
  data() {
    return {
      userId: undefined,
      characters: undefined,
      selectedCharacter: {},
    };
  },
  created() {
    const currentUser = this.$store.state.user;
    this.userId = currentUser.uid;

    this.getCharacters(this.userId);
  },
  methods: {
    async getCharacters(uid) {
      if (uid) {
        const COLLECTION_NAME = `/users/${uid}/characters`;
        const snapshot = await db.collection(COLLECTION_NAME).get();
        const chars = snapshot.docs.map(doc => doc.data());

        for(let i = 0; i < snapshot.docs.length; i+=1) {
          chars[i].id = snapshot.docs[i].id;
        }

        this.characters = chars;
      }
    },
    resetSelectedCharacters() {
      this.characters.forEach(char => char.clicked = false);
    },
    selectCharacter(id, clicked) {
      this.resetSelectedCharacters();
      this.selectedCharacter = this.characters.filter(char => char.id === id)[0];
      this.selectedCharacter.clicked = !clicked;
      console.log(this.selectedCharacter);
    },
  },
}
</script>

<style scoped>
.characters-list {
  display: flex;
  flex-direction: row;
}

.selected {
  font-weight: bold;
  background-color: #ffeac4;
}

ul {
  max-width: 20%;
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1 0 auto;
}

li {
  cursor: pointer;
  margin: 10px 0;
  padding: 10px 5px;
  font-size: 20px;
}

li:hover {
  background-color: #ffeac4;
}
</style>
