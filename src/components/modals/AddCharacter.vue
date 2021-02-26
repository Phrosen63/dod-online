<template>
  <form
    class="modal-window new-char"
    @submit.prevent="create"
  >
    <h1 class="modal-heading">
      Create a new character
    </h1>
    <p class="preamble">
      ~ Fill out the form ~
    </p>
    <div class="modal-wrapper">
      <label class="modal-label">
        Name:
      </label>
      <input
        v-model="char.name"
        class="new-char__input"
        type="text"
        required
      >
    </div>
    <div class="modal-wrapper">
      <label class="modal-label">
        Class:
      </label>
      <input
        v-model="char.class"
        class="new-char__input"
        type="text"
        required
      >
    </div>
    <div class="new-char-stats__wrapper">
      <label class="modal-label">
        Race:
      </label>
      <input
        v-model="char.race"
        class="new-char__input"
        type="text"
        required
      >
    </div>
    <div class="new-char-stats">
      <div
        v-for="stat in stats"
        :key="stat"
        class="new-char-stats__wrapper"
      >
        <label class="modal-label">
          {{ stat }}:
        </label>
        <input
          v-model="char.stats[stat]"
          class="new-char__input-number"
          type="number"
          min="1"
          :max="maxStatValue"
          step="1"
          required
        >
      </div>
    </div>
    <div class="modal-wrapper">
      <button
        class="modal-button"
        @click="closeModal"
      >
        Cancel
      </button>
      <input
        type="submit"
        class="modal-button"
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
      stats: [],
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
      CHARACTER_COLLECTION: undefined,
      user: undefined,
      hasNoCharacters: undefined,
    };
  },
  async created() {
    this.stats = [
      'strength',
      'spiritus',
      'agility',
      'perception',
      'size',
      'physique',
      'charisma',
      'intelligence',
    ];

    this.user = await getFirebaseUser();
    this.CHARACTER_COLLECTION = `/users/${this.user.uid}/characters`;
    const snapshot = await db.collection(this.CHARACTER_COLLECTION).get();
    const chars = snapshot.docs.map((doc) => doc.data());
    this.hasNoCharacters = chars.length === 0;
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
      const { uid } = this.user;

      const data = {
        info: {
          name: this.char.name,
          class: this.char.class,
          race: this.char.race,
        },
        stats: this.char.stats,
        skills: {},
      };

      if (uid) {
        let collectionPath;
        if (this.hasNoCharacters) {
          collectionPath = `/users/${this.user.uid}/characters`;
          await db.collection(collectionPath).doc();
        } else {
          collectionPath = this.CHARACTER_COLLECTION;
        }

        db.collection(collectionPath).add(data)
        .then((docRef) => {
          const inventory = {
            name: 'Old clothes',
            description: 'Old, dirty clothes, which offers little to no protection..',
          };
          const notes = {
            key: 'Welcome',
            value: 'Welcome to dod-online!',
            strikethrough: false,
          };
          const skills = {
            key: 'Sample skill',
            value: 'Edit or delete this sample skill',
            strikethrough: false,
          };
          db.collection(`${collectionPath}/${docRef.id}/inventory`).add(inventory);
          db.collection(`${collectionPath}/${docRef.id}/notes`).add(notes);
          db.collection(`${collectionPath}/${docRef.id}/skills`).add(skills);
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

.new-char__input,
.new-char__select,
.new-char__text,
.new-char__input-number {
  flex: 1 0 auto;
  font-size: 20px;
  margin: 5px 0;
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

.new-char .modal-label {
  flex: 0 0 auto;
}
</style>
