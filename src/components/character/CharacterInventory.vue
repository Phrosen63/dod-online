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
        v-for="item in selectedCharacter.inventory"
        :key="item.id"
        class="character-inventory-item"
      >
        <p
          v-for="(value, key) in item"
          :key="getUniqueObjectKey(item.id, key)"
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

export default {
  name: 'CharacterInventory',
  computed: {
    selectedCharacter() {
      return this.$store.state.selectedCharacter;
    },
  },
  methods: {
    getItemById(id) {
      return this.selectedCharacter.inventory.find((item) => item.id === id);
    },
    getUniqueObjectKey(id, key) {
      return `${id}_${key}`;
    },
    clickEdit(itemId) {
      const INVENTORY_COLLECTION = `characters/${this.selectedCharacter.id}/inventory`;
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
        collectionPath: INVENTORY_COLLECTION,
        mutation: 'updateCharacterInventoryItem',
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
      const INVENTORY_COLLECTION = `characters/${this.selectedCharacter.id}/inventory`;
      const item = this.selectedCharacter.inventory.find(obj => obj.id === itemId);
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
        collectionPath: INVENTORY_COLLECTION,
        mutation: 'deleteCharacterInventoryItem',
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
      const INVENTORY_COLLECTION = `characters/${this.selectedCharacter.id}/inventory`;

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
        collectionPath: INVENTORY_COLLECTION,
        mutation: 'addCharacterInventoryItem',
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
  border-bottom: 1px solid #a2a2a2;
  padding: 0 0 25px 0;
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
