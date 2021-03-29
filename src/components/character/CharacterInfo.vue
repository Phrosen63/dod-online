<template>
  <div 
    v-if="selectedCharacter"
    class="character-info"
  >
    <h2>Info</h2>
    <ul class="character-info-list">
      <li
        v-for="(info, key) in selectedCharacter.info"
        :key="key"
        class="character-info"
      >
        <label class="writableField-label">
          {{ $t(key.toLowerCase()) }}:
        </label>
        <input
          type="text"
          :value="info"
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
  name: 'CharacterInfo',
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
    getSelectedCharacterId() {
      return this.$store.state.selectedCharacter ? this.$store.state.selectedCharacter.id : '';
    },
    getCollectionPath() {
      if (this.selectedCharacter.uid && this.selectedCharacter.id) {
        return `users/${this.selectedCharacter.uid}/characters/`;
      }
      return undefined;
    },
    async updateText(key, event) {
      const INFO_COLLECTION = this.getCollectionPath();

      if (INFO_COLLECTION) {
        const newValue = event.target.value;
        const data = createDocumentFieldObject({
          map: 'info',
          key,
          value: newValue,
        });

        updateDocument({
          collectionPath: INFO_COLLECTION,
          document: this.$store.state.selectedCharacter.id,
          data,
        }).then(() => {
          this.$store.commit('updateCharacterInfo', {
            key,
            value: newValue,
          });
        }).catch(e => {
          const data = {
            hasError: true,
            message: e,
          };
          this.$store.commit('setError', data);
        });
      }
    },
  },
};
</script>

<style scoped>
.character-info {
  flex: 0 1 auto;
}

.character-info span {
  font-size: 18px;
}
</style>
