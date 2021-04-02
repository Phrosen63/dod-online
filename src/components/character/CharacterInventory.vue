<template>
  <div>
    <h2>{{ $t('inventory') }}</h2>
    <div class="character-inventory__button-wrapper">
      <button
        class="button--add"
        @click="addCustomItem('weapon')"
      >
        +{{ $t('add_weapon') }}
      </button>
      <button
        class="button--add"
        @click="addCustomItem('item')"
      >
        +{{ $t('add_item') }}
      </button>
      <button
        class="button--add"
        @click="addCustomItem('custom')"
      >
        +{{ $t('add_custom_item') }}
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
          v-for="(value, key) in trimmedItem(item)"
          :key="getUniqueObjectKey(item.id, key)"
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
            {{ $t('edit') }}
          </button>
          <button
            class="item-control item-control__delete"
            :data-id="item.id"
            @click="clickDelete(item.id)"
          >
            {{ $t('delete') }}
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
      const query = this.getQuery();

      if (query.uid && query.characterId) {
        if (this.getSelectedCharacterId() !== query.characterId) {
          this.getCharacterById(query.uid, query.characterId);
        }
      }

      return this.$store.state.selectedCharacter;
    },
  },
  methods: {
    getQuery() {
      const query = this.$route.query;
      return query ? {
        uid: query.uid || undefined,
        characterId: query.characterId || undefined,
      } : undefined;
    },
    getSelectedCharacterId() {
      return this.$store.state.selectedCharacter ? this.$store.state.selectedCharacter.id : '';
    },
    getCollectionPath() {
      if (this.selectedCharacter.uid && this.selectedCharacter.id) {
        return `users/${this.selectedCharacter.uid}/characters/${this.selectedCharacter.id}/inventory`;
      }
      return undefined;
    },
    trimmedItem(item) {
      const obj = Object.assign({}, item);
      delete obj['id'];
      delete obj['uid'];
      return obj;
    },
    getItemById(id) {
      return this.selectedCharacter.inventory.find((item) => item.id === id);
    },
    getUniqueObjectKey(id, key) {
      return `${id}_${key}`;
    },
    addCustomItem(type) {
      const INVENTORY_COLLECTION = this.getCollectionPath();
      let title = this.$t('add_custom_item');
      const data = [];

      if (INVENTORY_COLLECTION) {
        if (type === 'weapon') {
          title = this.$t('add_weapon');
          data.push({
            key: this.$t('name'),
          });
          data.push({
            key: this.$t('damage'),
          });
          data.push({
            key: this.$t('description'),
          });
        }

        if (type === 'item') {
          title = this.$t('add_item');
          data.push({
            key: this.$t('name'),
          });
          data.push({
            key: this.$t('description'),
          });
          data.push({
            key: this.$t('quantity'),
          });
          data.push({
            key: this.$t('weight'),
          });
        }

        const componentProps = {
          data,
          title,
          collectionPath: INVENTORY_COLLECTION,
          mutation: 'addObject',
          stateTarget: this.$store.state.selectedCharacter.inventory,
          uid: this.selectedCharacter.uid,
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
      }
    },
    clickEdit(itemId) {
      const INVENTORY_COLLECTION = this.getCollectionPath();

      if (INVENTORY_COLLECTION) {
        const item = this.getItemById(itemId);
        const data = [];

        Object.keys(item).forEach(key => {
          if (key !== 'id' && key !== 'uid') {
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
            key: this.$t('edit_field'),
            value: item[this.$t('name')],
          },
          objectId: itemId,
          collectionPath: INVENTORY_COLLECTION,
          mutation: 'updateObject',
          stateTarget: this.$store.state.selectedCharacter.inventory,
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
      }
    },
    clickDelete(itemId) {
      const INVENTORY_COLLECTION = this.getCollectionPath();

      if (INVENTORY_COLLECTION) {
        const item = this.selectedCharacter.inventory.find(obj => obj.id === itemId);
        const componentProps = {
          data: {
            button: {
              yes: this.$t('yes'),
              no: this.$t('no'),
            },
          },
          heading: {
            title: `${this.$t('warning_message_title')} ${this.$t('inventory').toLowerCase()}.`,
            preamble: `${this.$t('warning_message_preamble')} ${this.$t('inventory').toLowerCase()}: ${item[this.$t('name')]}`,
            content: `${this.$t('warning_message_content')}`,
          },
          objectId: itemId,
          collectionPath: INVENTORY_COLLECTION,
          mutation: 'deleteObject',
          stateTarget: this.$store.state.selectedCharacter.inventory,
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
      }
    },
  }
};
</script>

<style scoped>
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

.character-inventory-item:hover {
  background-color: #e4e4e4;
}

.character-inventory-item:hover > .item-controls {
  display: block;
}
</style>
