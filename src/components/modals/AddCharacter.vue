<template>
  <form
    class="modal-window new-char"
    @submit.prevent="create"
  >
    <h1 class="modal-heading">
      {{ $t('create_new_character') }}
    </h1>
    <p class="preamble">
      ~ {{ $t('fill_out_the_form') }} ~
    </p>
    <div class="modal-wrapper">
      <label class="modal-label">
        {{ $t('name') }}:
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
        {{ $t('class') }}:
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
        {{ $t('race') }}:
      </label>
      <input
        v-model="char.race"
        class="new-char__input"
        type="text"
        required
      >
    </div>
    <button
      type="button"
      class="modal-button button__auto-roll"
      @click="autoRoll"
    >
      {{ $t('auto_roll_stats') }}
    </button>
    <div class="new-char-stats">
      <div
        v-for="stat in stats"
        :key="stat"
        class="new-char-stats__wrapper"
      >
        <label class="modal-label">
          {{ $t(stat) }}:
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
        {{ $t('cancel') }}
      </button>
      <input
        type="submit"
        class="modal-button"
        :value="$t('create')"
      >
    </div>
  </form>
</template>

<script>
// Modules
import { db } from '@/api/database/db';
import { getFirebaseUser } from '@/api/database/user';
import { rollDice } from '@/api/randomNumberGenerator';

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
          psyche: undefined,
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
      'psyche',
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
        psyche: undefined,
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
            Name: 'Old clothes',
            Description: 'Old, dirty clothes, which offers little to no protection..',
          };
          const notes = {
            key: 'Welcome',
            value: 'Welcome to dod-online!',
            strikethrough: false,
          };
          const skills = {
            key: 'Sample skill',
            value: 'Edit or delete this sample skill',
          };
          const armor = {
            Name: 'Straw hat',
            Description: 'An well-worn straw hat with holes in it',
            Effect: '',
            Value: '0',
          };
          const wealth = {
            key: 'Copper',
            value: '0',
          };

          db.collection(`${collectionPath}/${docRef.id}/inventory`).add(inventory);
          db.collection(`${collectionPath}/${docRef.id}/notes`).add(notes);
          db.collection(`${collectionPath}/${docRef.id}/skills`).add(skills);
          db.collection(`${collectionPath}/${docRef.id}/armor`).add(armor);
          db.collection(`${collectionPath}/${docRef.id}/wealth`).add(wealth);

          this.resetForm();
          this.closeModal();
          this.$router.go(0);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      }
    },
    autoRoll() {
      Object.keys(this.char.stats).forEach((key) => {
        const result = rollDice({
          amount: 2,
          type: 'T6',
          min: 0,
          max: 0,
          bonus: 6,
        });
        this.char.stats[key] = result.combinedResult;
      });
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

.button__auto-roll {
  display: block;
  margin: 25px auto 0 auto;
}

.new-char-stats {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
  margin: 10px 0 35px 0;
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
  padding: 0 0 0 5px;
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
