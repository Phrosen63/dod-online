<template>
  <ul class="stats-list">
    <li
      v-for="(stat, key) in stats"
      :key="key"
      class="stats-list-item"
    >
      <p class="stat">
        {{ $t(key.toLowerCase()) }}: {{ stat }}
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'UserCharacterStatsList',
  props: {
    stats: {
      type: Object,
      required: true,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.stat {
  margin: 5px 0;
}
</style>
