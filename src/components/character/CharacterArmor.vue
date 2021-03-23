<template>
  <div class="character-armor">
    <h2>{{ $t('armor') }}</h2>
    <div class="character-armor-wrapper">
      <button
        class="button--add"
        @click="addArmor()"
      >
        +{{ $t('add_armor') }}
      </button>
      <transition-group
        name="transition-list"
        tag="ul"
        class="character-armor-parts"
      >
        <li
          v-for="armor in selectedCharacter.armor"
          :key="armor.id"
          class="character-armor-part"
        >
          <p
            v-for="(value, key) in armor"
            :key="getUniqueObjectKey(armor.id, key)"
            :data-type="key.toLowerCase()"
          >
            {{ key }}:
            {{ value }}
          </p>
          <div class="armor-controls">
            <button
              class="armor-control armor-control__edit"
              :data-id="armor.id"
              @click="clickEdit(armor.id)"
            >
              {{ $t('edit') }}
            </button>
            <button
              class="armor-control armor-control__delete"
              :data-id="armor.id"
              @click="clickDelete(armor.id)"
            >
              {{ $t('delete') }}
            </button>
          </div>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
// Componentes
import AddFieldsMultipleModal from '@/components/modals/AddFieldsMultipleModal';
import EditFieldModal from '@/components/modals/EditFieldModal';
import PromptBoolean from '@/components/modals/PromptBoolean';

export default {
  name: 'CharacterArmor',
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
    getCollectionPath() {
      if (this.selectedCharacter.uid && this.selectedCharacter.id) {
        return `users/${this.selectedCharacter.uid}/characters/${this.selectedCharacter.id}/armor`;
      }
      return undefined;
    },
    getArmorById(id) {
      return this.selectedCharacter.armor.find((armor) => armor.id === id);
    },
    getUniqueObjectKey(id, key) {
      return `${id}_${key}`;
    },
    addArmor() {
      const ARMOR_COLLECTION = this.getCollectionPath();

      if (ARMOR_COLLECTION) {
        const data = [
          {
            key: this.$t('name'),
          },
          {
            key: this.$t('description'),
          },
          {
            key: this.$t('effect'),
          },
          {
            key: this.$t('value'),
          },
        ];
  
        const componentProps = {
          data,
          title: this.$t('add_armor'),
          collectionPath: ARMOR_COLLECTION,
          mutation: 'addObject',
          stateTarget: this.$store.state.selectedCharacter.armor,
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
    clickEdit(armorId) {
      const ARMOR_COLLECTION = this.getCollectionPath();

      if (ARMOR_COLLECTION) {
        const armor = this.getArmorById(armorId);
        const data = [];
  
        Object.keys(armor).forEach(key => {
          if (key !== 'id') {
            const temp = {
              id: armorId,
              key: key,
              value: armor[key],
              fieldName: key,
            };
            data.push(temp);
          }
        });
  
        const componentProps = {
          data,
          title: {
            key: this.$t('edit_field'),
            value: armor.key,
          },
          objectId: armorId,
          collectionPath: ARMOR_COLLECTION,
          mutation: 'updateObject',
          stateTarget: this.$store.state.selectedCharacter.armor,
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
    clickDelete(armorId) {
      const ARMOR_COLLECTION = this.getCollectionPath();

      if (ARMOR_COLLECTION) {
        const armor = this.selectedCharacter.armor.find(obj => obj.id === armorId);
        const componentProps = {
          data: {
            button: {
              yes: this.$t('yes'),
              no: this.$t('no'),
            },
          },
          heading: {
            title: `${this.$t('warning_message_title')} ${this.$t('armor').toLowerCase()}.`,
            preamble: `${this.$t('warning_message_preamble')} ${this.$t('armor').toLowerCase()}: ${armor.name}`,
            content: `${this.$t('warning_message_content')}`,
          },
          objectId: armorId,
          collectionPath: ARMOR_COLLECTION,
          mutation: 'deleteObject',
          stateTarget: this.$store.state.selectedCharacter.armor,
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
.character-armor-part {
  position: relative;
  padding: 10px 0 0 0;
}

[data-type="id"] {
  display: none;
}

.armor-controls {
  display: none;
  position: absolute;
  top: 5px;
  right: 5px;
}

.armor-control {
  cursor: pointer;
}

.armor-control__edit {
  margin: 0 5px 0 0;
}

.character-armor-part:hover {
  background-color: #e4e4e4;
}

.character-armor-part:hover > .armor-controls {
  display: block;
}
</style>
