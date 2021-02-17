<template>
  <div class="characters-list">
    <pulse-loader
      v-if="loading"
      class="spinner"
      :size="size"
      :color="color"
    />
    <div
      v-else
      class="characters-list-wrapper"
    >
      <div class="side-bar">
        <button
          class="add-character-button"
          @click="showModal"
        >
          +New character
        </button>
        <ul>
          <li
            v-for="(character) in characters"
            :key="character.id"
            :class="{ selected: character.clicked }"
            @click="selectCharacter(character.id, character.clicked)"
          >
            {{ character.info.name }}
          </li>
        </ul>
      </div>
      <CharacterViewer
        v-if="characterSelected"
        :character="selectedCharacter"
      />
    </div>
  </div>
</template>

<script>
// Components
import CharacterViewer from './CharacterViewer';
import AddCharacter from '../modals/AddCharacter';

// Modules
import { db } from '@/api/database/db';
import { getFirebaseUser } from '@/api/database/user';
import { PulseLoader } from 'vue-spinner/dist/vue-spinner.min';

/* eslint-disable no-tabs */
/*
DB structure:

users / <uid> / characters /	<charName> / inventory
					   / stats
				<charName>
				<charName>

users / <uid> / settings / ...
*/
/* eslint-enable no-tabs */

export default {
  name: 'CharacterList',
  components: {
    CharacterViewer,
    PulseLoader,
  },
  data() {
    return {
      characters: [],
      selectedCharacter: {},
      characterSelected: false,
      loading: true,
      color: '#75a1de',
      size: '25px',
    };
  },
  created() {
    this.getCharacters();
  },
  methods: {
    async getCharacters() {
      const currentUser = await getFirebaseUser();
      const { uid } = currentUser;

      if (uid) {
        const COLLECTION_NAME = `/users/${uid}/characters`;
        const snapshot = await db.collection(COLLECTION_NAME).get();
        const chars = snapshot.docs.map((doc) => doc.data());

        for (let i = 0; i < snapshot.docs.length; i += 1) {
          chars[i].id = snapshot.docs[i].id;
        }

        this.characters = chars;
        this.loading = false;
      }
    },
    resetSelectedCharacters() {
      this.characters.forEach((char) => {
        char.clicked = false;
        this.characterSelected = false;
      });
    },
    selectCharacter(id, clicked) {
      this.resetSelectedCharacters();
      this.selectedCharacter = this.characters.filter((char) => char.id === id)[0];
      this.selectedCharacter.clicked = !clicked;
      this.characterSelected = true;
    },
    showModal() {
      const componentProps = {};
      const modalProps = {
        height: 'auto',
        scrollable: true,
        draggable: false,
        focusTrap: true,
      };

      this.$modal.show(
        AddCharacter,
        componentProps,
        modalProps,
      );
    },
  },
};
</script>

<style scoped>
.characters-list-wrapper {
  display: flex;
  flex-direction: row;
}

.selected {
  font-weight: bold;
  background-color: #ffeac4;
}

.side-bar {
  flex: 1 0 20%;
}

.add-character-button {
  cursor: pointer;
  padding: 0 20px;
  font-size: 18px;
  line-height: 36px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
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
