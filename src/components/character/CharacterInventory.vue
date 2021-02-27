<template>
  <div class="character-inventory">
    <h2>Inventory</h2>
    <div class="character-inventory__button-wrapper">
      <button
        class="button--add"
        @click="addCustomItem('weapon')"
      >
        +Add weapon
      </button>
      <button
        class="button--add"
        @click="addCustomItem('item')"
      >
        +Add item
      </button>
      <button
        class="button--add"
        @click="addCustomItem('custom')"
      >
        +Add custom item
      </button>
    </div>
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
import AddFieldsMultipleModal from '@/components/modals/AddFieldsMultipleModal';
import EditFieldModal from '@/components/modals/EditFieldModal';
import PromptBoolean from '@/components/modals/PromptBoolean';

// Modules
import { deleteDocumentFromCurrentUser } from '@/api/database/delete';
import { writeNewObjToCurrentUser } from '@/api/database/write';

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
    characterInventoryAddedListener() {
      return this.$store.state.inventoryItemAdded;
    },
    characterInventoryDeletedListener() {
      return this.$store.state.inventoryItemDeleted;
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
    },
    characterInventoryAddedListener(data) {
      writeNewObjToCurrentUser(this.INVENTORY_COLLECTION, data).then((id) => {
        data.id = id;
        this.inventory.push(data);
      });
    },
    characterInventoryDeletedListener(data) {
      const index = this.inventory.findIndex(item => item.id === data.id);
      if (index > -1) {
        const item = this.inventory[index];
        this.inventory.splice(index, 1);
        deleteDocumentFromCurrentUser(this.INVENTORY_COLLECTION, item.id);
      }
    },
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
        EditFieldModal,
        componentProps,
        modalProps,
      );
    },
    clickDelete(itemId) {
      const item = this.inventory.find(obj => obj.id === itemId);
      const componentProps = {
        data: {
          button: {
            yes: 'Yes',
            no: 'No',
          },
        },
        heading: {
          title: `Warning! Delete item.`,
          preamble: `Delete item: ${item.key}`,
          content: `This cannot be undone. Delete anyway?`,
        },
        objectId: itemId,
        mutation: 'setInventoryItemDeleted',
      };
      const modalProps = {
        height: 'auto',
        scrollable: true,
        focusTrap: true,
      };

      this.$modal.show(
        PromptBoolean,
        componentProps,
        modalProps,
      );
    },
    addCustomItem(type) {
      const data = [];
      let title = 'Add custom item';

      if (type === 'weapon') {
        title = 'Add weapon';
        data.push({
          key: 'Name',
        });
        data.push({
          key: 'Damage',
        });
        data.push({
          key: 'Description',
        });
      }

      if (type === 'item') {
        title = 'Add item';
        data.push({
          key: 'Name',
        });
        data.push({
          key: 'Description',
        });
        data.push({
          key: 'Quantity',
        });
        data.push({
          key: 'Weight',
        });
      }

      const componentProps = {
        data,
        title,
        mutation: 'setInventoryItemAdded',
      };
      const modalProps = {
        height: 'auto',
        scrollable: true,
        focusTrap: true,
      };

      this.$modal.show(
        AddFieldsMultipleModal,
        componentProps,
        modalProps,
      );
    },
  }
};
</script>

<style scoped>
.character-inventory {
  flex: 1 1 49%;
}

.character-inventory__button-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.character-inventory__button-wrapper > button {
  flex: 0 0 auto;
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
