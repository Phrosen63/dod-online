<template>
  <div
    v-if="Object.keys(stats).length > 0"
    class="character-stats"
  >
    <h2>Stats</h2>
    <ul class="character-stats-list">
      <li
        v-for="stat in stats"
        :key="stat.name"
        class="character-stat"
      >
        <template v-for="(value, name) in stat">
          <span
            :key="`key_${name}`"
            class="character-stat__name"
          >
            {{ name }}:
          </span>
          <span
            :key="`key_${name}_${value}`"
            class="character-stat__value"
          >
            {{ value }}
          </span>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CharacterStats',
  props: {
    stats: {
      type: Array,
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
