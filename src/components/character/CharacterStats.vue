<template>
  <div class="character-stats">
    <h2>Stats</h2>
    <ul class="character-stats-list">
      <li
        v-for="(stat, key) in stats"
        :key="key"
        class="character-stat"
      >
        <WritableField
          class="character-stat__value"
          :data="{
            characterId,
            field: 'stats',
            title: key,
            value: stat,
            nestedField: key,
            document: 'characters',
          }"
        />
      </li>
    </ul>
  </div>
</template>

<script>
// Components
import WritableField from '@/components/WritableField';

export default {
  name: 'CharacterStats',
  components: {
    WritableField,
  },
  props: {
    characterId: {
      type: String,
      required: true,
      default() {
        return '';
      },
    },
    stats: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.character-stat__name {
  font-size: 18px;
  text-transform: capitalize;
}
</style>
