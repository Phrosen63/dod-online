<template>
  <div class="character-magic">
    <h2>{{ $t('magic_prayers') }}</h2>
    <div class="character-magic__button-wrapper">
      <button
        class="button--add"
        @click="addCustomMagic('spell')"
      >
        +{{ $t('add_spell') }}
      </button>
      <button
        class="button--add"
        @click="addCustomMagic('prayer')"
      >
        +{{ $t('add_prayer') }}
      </button>
      <button
        class="button--add"
        @click="addCustomMagic('custom')"
      >
        +{{ $t('add_custom_magic') }}
      </button>
    </div>
    <transition-group
      name="transition-list"
      tag="ul"
    >
      <li
        v-for="magic in selectedCharacter.magic"
        :key="magic.id"
        class="character-magic-list-item"
      >
        <p
          v-for="(value, key) in trimmedMagic(magic)"
          :key="getUniqueObjectKey(magic.id, key)"
        >
          {{ key }}:
          {{ value }}
        </p>
        <div class="magic-controls">
          <button
            class="magic-control magic-control__edit"
            :data-id="magic.id"
            @click="clickEdit(magic.id)"
          >
            {{ $t('edit') }}
          </button>
          <button
            class="magic-control magic-control__delete"
            :data-id="magic.id"
            @click="clickDelete(magic.id)"
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
  name: 'CharacterMagic',
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
        return `users/${this.selectedCharacter.uid}/characters/${this.selectedCharacter.id}/magic`;
      }
      return undefined;
    },
    trimmedMagic(magic) {
      const obj = Object.assign({}, magic);
      delete obj['id'];
      delete obj['uid'];
      return obj;
    },
    getMagicById(id) {
      return this.selectedCharacter.magic.find((magic) => magic.id === id);
    },
    getUniqueObjectKey(id, key) {
      return `${id}_${key}`;
    },
    addCustomMagic(type) {
      const MAGIC_COLLECTION = this.getCollectionPath();
      let title = this.$t('add_custom_magic');
      const data = [];

      if (MAGIC_COLLECTION) {
        if (type === 'spell' || type === 'prayer') {
          data.push({
            key: this.$t('name'),
          });
          data.push({
            key: this.$t('description'),
          });
          data.push({
            key: this.$t('effect'),
          });
          data.push({
            key: this.$t('damage'),
          });
          data.push({
            key: this.$t('cost'),
          });
        }

        if (type === 'spell') {
          title = this.$t('add_spell');
        }

        if (type === 'prayer') {
          title = this.$t('add_prayer');
        }

        const componentProps = {
          data,
          title,
          collectionPath: MAGIC_COLLECTION,
          mutation: 'addObject',
          stateTarget: this.$store.state.selectedCharacter.magic,
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
    clickEdit(magicId) {
      const MAGIC_COLLECTION = this.getCollectionPath();

      if (MAGIC_COLLECTION) {
        const magic = this.getMagicById(magicId);
        const data = [];

        Object.keys(magic).forEach(key => {
          if (key !== 'id' && key !== 'uid') {
            const temp = {
              id: magicId,
              key: key,
              value: magic[key],
              fieldName: key,
            };
            data.push(temp);
          }
        });

        const componentProps = {
          data,
          title: {
            key: this.$t('edit_field'),
            value: magic[this.$t('name')],
          },
          objectId: magicId,
          collectionPath: MAGIC_COLLECTION,
          mutation: 'updateObject',
          stateTarget: this.$store.state.selectedCharacter.magic,
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
    clickDelete(magicId) {
      const MAGIC_COLLECTION = this.getCollectionPath();

      if (MAGIC_COLLECTION) {
        const magic = this.selectedCharacter.magic.find(obj => obj.id === magicId);
        const componentProps = {
          data: {
            button: {
              yes: this.$t('yes'),
              no: this.$t('no'),
            },
          },
          heading: {
            title: `${this.$t('warning_message_title')} ${this.$t('magic').toLowerCase()}.`,
            preamble: `${this.$t('warning_message_preamble')} ${this.$t('magic').toLowerCase()}: ${magic[this.$t('name')]}`,
            content: `${this.$t('warning_message_content')}`,
          },
          objectId: magicId,
          collectionPath: MAGIC_COLLECTION,
          mutation: 'deleteObject',
          stateTarget: this.$store.state.selectedCharacter.magic,
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
.character-magic {
  padding: 0 0 55px 0;
}

.character-magic__button-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.character-magic__button-wrapper > button {
  flex: 0 0 auto;
}

.character-magic-list-item {
  position: relative;
}

.item-controls {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
}

.magic-control {
  cursor: pointer;
}

.magic-control__edit {
  margin: 0 5px 0 0;
}

.character-magic-list-item:hover {
  background-color: #e4e4e4;
}

.character-magic-list-item:hover > .magic-controls {
  display: block;
}
</style>
