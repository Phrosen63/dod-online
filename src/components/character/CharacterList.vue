<template>
  <div class="col-2">
    <div class="characters-list-wrapper">
      <div class="side-bar">
        <button
          class="add-character-button"
          @click="showModal"
        >
          +{{ $t('new_character') }}
        </button>
        <ul>
          <li
            v-for="(character) in characterList"
            :key="character.id"
            :class="{ selected: character.clicked }"
            @click="selectCharacter(character.id, character.clicked)"
          >
            {{ character.info.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// Components
import AddCharacter from '../modals/AddCharacter';

export default {
  name: 'CharacterList',
  computed: {
    characterList() {
      return this.$store.state.characterList;
    },
  },
  methods: {
    getCharacterById(uid) {
      return this.characterList.find(char => char.id === uid);
    },
    resetSelectedCharacters() {
      this.$store.dispatch('resetAllCharactersClicked');
    },
    selectCharacter(id, clicked) {
      this.resetSelectedCharacters();
      const selectedCharacter = this.getCharacterById(id);
      selectedCharacter.clicked = !clicked;
      this.$store.commit('setSelectedCharacter', selectedCharacter);
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
  flex-wrap: wrap;
}

.selected {
  font-weight: bold;
  background-color: #ffeac4;
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
