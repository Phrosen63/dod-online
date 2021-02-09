<template>
  <div class="character-inventory">
    <h2 v-if="Object.keys(inventory).length > 0">Inventory</h2>
    <ul>
      <li v-for="(item, key) in inventory" :key="key" class="character-inventory-item">
        <p class="character-inventory-item__name">
          {{ key }}
        </p>
        <ul>
          <li 
            v-for="(attribute, key) in item" :key="key" 
            class="character-inventory-attribute-list"
          >
            <span>
              {{ key }}:
            </span>
            <span>
              {{ attribute }}
            </span>
          </li>
        </ul>
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

.character-inventory-item__name {
  font-size: 20px;
  margin: 20px 0 10px 0;
}

.character-inventory-attribute-list {
  margin: 0 0 0 10px;
}
</style>
