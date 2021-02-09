<template>
  <div class="character-stats">
    <h2 v-if="Object.keys(stats).length > 0">Stats</h2>
    <ul class="character-stats-list">
      <li v-for="(stat, key) in stats" :key="key" class="character-stat">
        <span class="character-stat__name">
          {{ key }}:
        </span>
        <span class="character-stat__value">
          {{ stat }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CharacterStats',
  props: {
    stats: {
      default: {},
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.character-stats-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.character-stat span {
  font-size: 18px;
}
</style>
