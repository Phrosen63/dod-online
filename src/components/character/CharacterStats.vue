<template>
  <div class="character-stats">
    <h2>{{ $t('stats') }}</h2>
    <ul class="character-stats-list">
      <li
        v-for="(stat, key) in selectedCharacter.stats"
        :key="key"
        class="character-stat"
      >
        <label class="writableField-label">
          {{ $t(key.toLowerCase()) }}:
        </label>
        <input
          type="text"
          :value="stat"
          class="hidden-textfield"
          title="Click to edit"
          @focus="$event.target.select()"
          @change="updateText(key, $event)"
        >
      </li>
    </ul>
  </div>
</template>

<script>
// Modules
import { createDocumentFieldObject, updateDocumentFieldForCurrentUser } from '@/api/database/write';

export default {
  name: 'CharacterStats',
  computed: {
    selectedCharacter() {
      return this.$store.state.selectedCharacter;
    },
  },
  methods: {
    async updateText(key, event) {
      const data = createDocumentFieldObject({
        map: 'stats',
        key,
        value: event.target.value,
      });
      updateDocumentFieldForCurrentUser({
        collection: 'characters',
        document: this.$store.state.selectedCharacter.id,
        data,
      }).then(() => {
          this.$store.commit('updateCharacterStats', {
            key,
            value: event.target.value,
          });
        }).catch(e => console.log('Error: ' + e));
    },
  },
};
</script>

<style scoped>
.character-stats {
  flex: 0 1 auto;
}

.character-stats-list {
  display: flex;
  flex-direction: column;
}

.character-stat {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.character-stat input {
  width: 200px;
}

.character-stat__name {
  font-size: 18px;
  text-transform: capitalize;
}
</style>
