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
  name: 'CharacterInfo',
  computed: {
    selectedCharacter() {
      return this.$store.state.selectedCharacter;
    },
  },
  methods: {
    async updateText(key, event) {
      const data = createDocumentFieldObject({
        map: 'info',
        key,
        value: event.target.value,
      });
      updateDocumentFieldForCurrentUser({
        collection: 'characters',
        document: this.$store.state.selectedCharacter.id,
        data,
      }).then(() => {
          this.$store.commit('updateCharacterInfo', {
            key,
            value: event.target.value,
          });
        }).catch(e => console.log('Error: ' + e));
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
