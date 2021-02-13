<template>
  <div
    v-if="Object.keys(stats).length > 0"
    class="character-stats"
  >
    <h2>Stats</h2>
    <ul class="character-stats-list">
      <li
        v-for="(stat, key) in stats"
        :key="key"
        class="character-stat"
      >
        <span class="character-stat__name">
          {{ key }}:
        </span>
        <WritableField
          class="character-stat__value"
          :data="{
            id,
            field: 'stats',
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
    id: {
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
.character-stat span {
  font-size: 18px;
}
</style>
