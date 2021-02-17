<template>
  <form
    class="new-char"
    @submit.prevent="create"
  >
    <h1>Create a new character</h1>
    <p class="preamble">
      ~ Fill out the form ~
    </p>
    <div class="new-char-wrapper">
      <label class="new-char__label">
        Name:
      </label>
      <input
        v-model="char.name"
        class="new-char__input"
        type="text"
        required
      >
    </div>
    <div class="new-char-wrapper">
      <label class="new-char__label">
        Class:
      </label>
      <input
        v-model="char.class"
        class="new-char__input"
        type="text"
      >
    </div>
    <div class="new-char-stats__wrapper">
      <label class="new-char__label">
        Race:
      </label>
      <input
        v-model="char.race"
        class="new-char__input"
        type="text"
      >
    </div>
    <div class="new-char-stats">
      <div class="new-char-stats__wrapper">
        <label class="new-char__label">
          Strength:
        </label>
        <input
          v-model="char.stats.strength"
          class="new-char__input-number"
          type="number"
          min="1"
          :max="maxStatValue"
          step="1"
          value="1"
          required
        >
      </div>
      <div class="new-char-stats__wrapper">
        <label class="new-char__label">
          Agility:
        </label>
        <input
          v-model="char.stats.agility"
          class="new-char__input-number"
          type="number"
          min="1"
          :max="maxStatValue"
          step="1"
          value="1"
          required
        >
      </div>
      <div class="new-char-stats__wrapper">
        <label class="new-char__label">
          Spiritus:
        </label>
        <input
          v-model="char.stats.spiritus"
          class="new-char__input-number"
          type="number"
          min="1"
          :max="maxStatValue"
          step="1"
          value="1"
          required
        >
      </div>
      <div class="new-char-stats__wrapper">
        <label class="new-char__label">
          Perception:
        </label>
        <input
          v-model="char.stats.perception"
          class="new-char__input-number"
          type="number"
          min="1"
          :max="maxStatValue"
          step="1"
          value="1"
          required
        >
      </div>
      <div class="new-char-stats__wrapper">
        <label class="new-char__label">
          Size:
        </label>
        <input
          v-model="char.stats.size"
          class="new-char__input-number"
          type="number"
          min="1"
          :max="maxStatValue"
          step="1"
          value="1"
          required
        >
      </div>
      <div class="new-char-stats__wrapper">
        <label class="new-char__label">
          Physique:
        </label>
        <input
          v-model="char.stats.physique"
          class="new-char__input-number"
          type="number"
          min="1"
          :max="maxStatValue"
          step="1"
          value="1"
          required
        >
      </div>
      <div class="new-char-stats__wrapper">
        <label class="new-char__label">
          Intelligence:
        </label>
        <input
          v-model="char.stats.intelligence"
          class="new-char__input-number"
          type="number"
          min="1"
          :max="maxStatValue"
          step="1"
          value="1"
          required
        >
      </div>
      <div class="new-char-stats__wrapper">
        <label class="new-char__label">
          Charisma:
        </label>
        <input
          v-model="char.stats.charisma"
          class="new-char__input-number"
          type="number"
          min="1"
          :max="maxStatValue"
          step="1"
          value="1"
          required
        >
      </div>
    </div>
    <div class="new-char-stats__wrapper">
      <button
        class="new-char__button"
        @click="closeModal"
      >
        Cancel
      </button>
      <input
        type="submit"
        class="new-char__button"
        value="Create"
      >
    </div>
  </form>
</template>

<script>
// Modules
import { db } from '@/api/database/db';
import { getFirebaseUser } from '@/api/database/user';

export default {
  name: 'AddCharacter',
  data() {
    return {
      maxStatValue: 999,
      char: {
        name: undefined,
        class: undefined,
        race: undefined,
        stats: {
          strength: undefined,
          spiritus: undefined,
          agility: undefined,
          perception: undefined,
          size: undefined,
          physique: undefined,
          charisma: undefined,
          intelligence: undefined,
        },
      },
    };
  },
  methods: {
    closeModal() {
      this.$modal.hideAll();
    },
    resetForm() {
      this.char.name = undefined;
      this.char.class = undefined;
      this.char.race = undefined;
      this.char.stats = {
        strength: undefined,
        spiritus: undefined,
        agility: undefined,
        perception: undefined,
        size: undefined,
        physique: undefined,
        charisma: undefined,
        intelligence: undefined,
      };
    },
    async create() {
      const currentUser = await getFirebaseUser();
      const { uid } = currentUser;
      const COLLECTION_NAME = `/users/${uid}/characters`;

      const data = {
        info: {
          name: this.char.name,
          class: this.char.class,
          race: this.char.race,
        },
        stats: this.char.stats,
        skills: {},
        inventory: {},
        notes: {},
      };

      if (uid) {
        db.collection(COLLECTION_NAME).add(data)
          .then(() => {
            this.resetForm();
            this.closeModal();
            this.$router.go(0);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      }
    },
  },
};
</script>

<style scoped>
.new-char {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.new-char-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.new-char-stats__wrapper {
  display: flex;
  min-width: 49%;
  justify-content: space-between;
}

.new-char-stats {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
  margin: 15px 0 35px 0;
}

.new-char__label,
.new-char__input,
.new-char__select,
.new-char__text,
.new-char__button,
.new-char__input-number {
  flex: 1 0 auto;
  font-size: 20px;
  margin: 5px 0;
}

.new-char__label {
  flex: 0 0 auto;
}

.new-char__input,
.new-char__input-number {
  outline: none;
  margin: 0 0 0 5px;
  padding: 0 5px;
}

.new-char__input {
  border: 0;
  border-bottom: 1px dashed #3d3d3d;
}

.new-char__input-number {
  flex: 0 0 50%;
  margin: 5px 15px 0 5px;
}

.new-char__button {
  margin: 0 0 0 10px;
  padding: 5px 20px;
  font-size: 18px;
  cursor: pointer;
}
</style>
