<template>
  <div class="character-inventory">
    <h2>Inventory</h2>
    <transition-group
      name="transition-list"
      tag="ul"
    >
      <li
        v-for="item in inventory"
        :key="item.id"
        class="character-inventory-item"
      >
        <p
          v-for="(value, key, index) in item"
          :key="index"
          :data-type="key.toLowerCase()"
        >
          {{ key }}:
          {{ value }}
        </p>
        <div class="item-controls">
          <button
            class="item-control item-control__edit"
            :data-id="item.id"
            @click="clickEdit(item.id)"
          >
            Edit
          </button>
          <button
            class="item-control item-control__delete"
            :data-id="item.id"
            @click="clickDelete(item.id)"
          >
            Delete
          </button>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
// Componentes
import AddOrEditFieldModal from '@/components/modals/AddOrEditFieldModal';
import { deleteDocumentFromCurrentUser } from '@/api/database/delete';

export default {
  name: 'CharacterInventory',
  props: {
    characterId: {
      type: String,
      required: true,
      default() {
        return '';
      },
    },
    inventory: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      INVENTORY_COLLECTION: undefined,
    };
  },
  computed: {
    characterInventorySavedListener() {
      return this.$store.state.inventoryItemSaved;
    },
  },
  watch: {
    characterInventorySavedListener(arr) {
      arr.forEach(obj => {
        const target = this.inventory.find((item) => item.id === obj.id);

        if (target) {
          // Update existing object
          target[obj.key] = obj.value;
        } else {
          // Add new object
          if (obj.id) {
            this.inventory.push(obj);
          }
        }
      });
    }
  },
  created() {
    this.INVENTORY_COLLECTION = `characters/${this.characterId}/inventory`;
  },
  methods: {
    getItemById(id) {
      return this.inventory.find((item) => item.id === id);
    },
    clickEdit(itemId) {
      const item = this.getItemById(itemId);
      const data = [];

      Object.keys(item).forEach(key => {
        if (key !== 'id') {
          const temp = {
            id: itemId,
            key: key,
            value: item[key],
            fieldName: key,
          };
          data.push(temp);
        }
      });

      const componentProps = {
        data,
        title: {
          key: 'Edit field',
          value: item.key,
        },
        objectId: itemId,
        characterId: this.characterId,
        path: this.INVENTORY_COLLECTION,
        mutation: 'setInventoryItemSaved',
      };
      const modalProps = {
        height: 'auto',
        scrollable: true,
        focusTrap: true,
      };

      this.$modal.show(
        AddOrEditFieldModal,
        componentProps,
        modalProps,
      );
    },
    clickDelete(itemId) {
      console.log(itemId)
      const index = this.inventory.findIndex(item => item.id === itemId);
      console.log(index)
      if (index > -1) {
        const item = this.inventory[index];
        this.inventory.splice(index, 1);
        deleteDocumentFromCurrentUser(this.INVENTORY_COLLECTION, item.id);
      }
    },
  }
};
</script>

<style scoped>
.character-inventory {
  flex: 1 0 auto;
}

.transition-list-enter-active,
.transition-list-leave-active {
  transition: all 0.5s;
}

.transition-list-enter,
.transition-list-leave-to {
  opacity: 0;
}

.character-inventory-item {
  position: relative;
}

[data-type="id"] {
  display: none;
}

.character-inventory-item--strikethrough p,
.character-inventory-item--strikethrough span {
  text-decoration: line-through;
}

.item-controls {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
}

.item-control {
  cursor: pointer;
}

.item-control__edit {
  margin: 0 5px 0 0;
}

.item-control__strike {
  margin: 0 5px 0 0;
}

.character-inventory-item:hover {
  background-color: #e4e4e4;
}

.character-inventory-item:hover > .item-controls {
  display: block;
}
</style>
