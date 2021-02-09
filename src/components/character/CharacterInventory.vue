<template>
  <div class="character-inventory">
    <h2 v-if="Object.keys(inventory).length > 0">Inventory</h2>
    <ul>
      <li v-for="(item, key) in inventory" :key="key">
        <p>
          {{ key }}
        </p>
        <p>
          {{ item }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CharacterInventory',
  props: {
    inventory: {
      default: {},
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.character-inventory {
  flex: 1 0 auto;
}
</style>
