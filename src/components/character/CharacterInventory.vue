<template>
  <div class="character-inventory">
    <h2>Inventory</h2>
    <ul>
      <li
        v-for="(item, key) in inventory"
        :key="key"
        class="character-inventory-item"
      >
        <p class="character-inventory-item__name">
          {{ key }}
        </p>
        <ul>
          <li
            v-for="(value, attribute) in item"
            :key="attribute"
            class="character-inventory-attribute-list"
          >
            <span>
              {{ attribute }}:
            </span>
            <span>
              {{ value }}
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
    id: {
      type: String,
      required: true,
      default() {
        return '';
      },
    },
    inventory: {
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
.character-inventory {
  flex: 1 0 auto;
}

.character-inventory-item__name {
  margin: 20px 0 10px 0;
  font-size: 20px;
}

.character-inventory-attribute-list {
  margin: 0 0 0 10px;
}
</style>
