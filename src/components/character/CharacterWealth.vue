<template>
  <div class="character-wealth">
    <h2>{{ $t('wealth') }}</h2>
    <button
      class="button--add"
      @click="addWealth"
    >
      +{{ $t('add_wealth') }}
    </button>
    <transition-group
      name="transition-list"
      tag="ul"
    >
      <li
        v-for="wealth in selectedCharacter.wealth"
        :key="wealth.id"
        class="character-wealth-item"
        :class="wealth.strikethrough ? 'character-wealth-item--strikethrough' : ''"
      >
        <p class="character-wealth-item__name">
          {{ wealth.key }}:
        </p>
        <span class="character-wealth-item__text">
          {{ wealth.value }}
        </span>
        <div class="wealth-controls">
          <button
            class="wealth-control wealth-control__edit"
            :data-id="wealth.id"
            @click="clickEdit(wealth.id)"
          >
            {{ $t('edit') }}
          </button>
          <button
            class="wealth-control wealth-control__delete"
            :data-id="wealth.id"
            @click="clickDelete(wealth.id)"
          >
            {{ $t('delete') }}
          </button>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
// Components
import AddFieldsMultipleModal from '@/components/modals/AddFieldsMultipleModal';
import EditFieldModal from '@/components/modals/EditFieldModal';
import PromptBoolean from '@/components/modals/PromptBoolean';

export default {
  name: 'CharacterWealth',
  computed: {
    selectedCharacter() {
      return this.$store.state.selectedCharacter;
    },
  },
  methods: {
    getWealthObjectById(id) {
      return this.selectedCharacter.wealth.find((wealth) => wealth.id === id);
    },
    clickEdit(wealthId) {
      const WEALTH_COLLECTION = `characters/${this.selectedCharacter.id}/wealth`;
      const wealth = this.getWealthObjectById(wealthId);
      const data = [
        {
          id: wealth.id,
          key: 'key',
          value: wealth.key,
          fieldName: 'Title',
        },
        {
          id: wealth.id,
          key: 'value',
          value: wealth.value,
          fieldName: 'Text',
        },
      ];

      const componentProps = {
        data,
        title: {
          key: this.$t('edit_field'),
          value: wealth.key,
        },
        objectId: wealth.id,
        characterId: this.selectedCharacter.id,
        collectionPath: WEALTH_COLLECTION,
        mutation: 'updateCharacterWealth',
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
    clickDelete(wealthId) {
      const WEALTH_COLLECTION = `characters/${this.selectedCharacter.id}/wealth`;
      const wealth = this.getWealthObjectById(wealthId);

      const componentProps = {
        data: {
          button: {
            yes: 'Yes',
            no: 'No',
          },
        },
        heading: {
          title: `Warning! Delete wealth.`,
          preamble: `Delete wealth: ${wealth.key}`,
          content: `This cannot be undone. Delete anyway?`,
        },
        objectId: wealth.id,
        collectionPath: WEALTH_COLLECTION,
        mutation: 'deleteCharacterWealth',
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
    addWealth() {
      const WEALTH_COLLECTION = `characters/${this.selectedCharacter.id}/wealth`;
      const data = [
        {
          key: 'Title',
        },
        {
          key: 'Text',
        },
      ];

      const componentProps = {
        data,
        title: 'Add wealth',
        collectionPath: WEALTH_COLLECTION,
        mutation: 'addCharacterWealth',
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
.character-wealth {
  flex: 1 0 auto;
}

.character-wealth-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  position: relative;
  padding: 25px 0 0 0;
}

.character-wealth-item__name {
  flex: 0 0 auto;
  margin: 0 5px 0 0;
}

.character-wealth-item__value {
  flex: 0 0 auto;
  margin: 0;
}

.wealth-controls {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
}

.wealth-control {
  cursor: pointer;
}

.wealth-control__edit {
  margin: 0 5px 0 0;
}

.character-wealth-item:hover {
  background-color: #e4e4e4;
}

.character-wealth-item:hover > .wealth-controls {
  display: block;
}
</style>
