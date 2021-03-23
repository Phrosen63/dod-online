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
          :title="$t('title_click_to_edit')"
          @focus="$event.target.select()"
          @change="updateText(key, $event)"
        >
      </li>
    </ul>
  </div>
</template>

<script>
// Modules
import { createDocumentFieldObject, updateDocument } from '@/api/database/write';

export default {
  name: 'CharacterStats',
  computed: {
    selectedCharacter() {
      const query = this.getQuery();

      if (query.uid && query.characterId) {
        if (this.getSelectedCharacterId() !== query.characterId) {
          this.getCharacterById(query.uid, query.characterId);
        }
      }

      return this.$store.state.selectedCharacter;
    },
  },
  methods: {
    getQuery() {
      const query = this.$route.query;
      return query ? {
        uid: query.uid || undefined,
        characterId: query.characterId || undefined,
      } : undefined;
    },
    getCollectionPath() {
      if (this.selectedCharacter.uid && this.selectedCharacter.id) {
        return `users/${this.selectedCharacter.uid}/characters/`;
      }
      return undefined;
    },
    async updateText(key, event) {
      const STATS_COLLECTION = this.getCollectionPath();

      if (STATS_COLLECTION) {
        const newValue = event.target.value;
        const data = createDocumentFieldObject({
          map: 'stats',
          key,
          value: newValue,
        });
  
        updateDocument({
          collectionPath: STATS_COLLECTION,
          document: this.$store.state.selectedCharacter.id,
          data,
        }).then(() => {
            this.$store.commit('updateCharacterStats', {
              key,
              value: newValue,
            });
          }).catch(e => console.log('Error: ' + e));
      }
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
