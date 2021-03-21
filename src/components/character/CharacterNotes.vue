<template>
  <div class="character-notes">
    <h2>{{ $t('notes') }}</h2>
    <button
      class="button--add"
      @click="addNote"
    >
      +{{ $t('add_note') }}
    </button>
    <transition-group
      name="transition-list"
      tag="ul"
    >
      <li
        v-for="note in selectedCharacter.notes"
        :key="note.id"
        class="character-notes-item"
        :class="note.strikethrough ? 'character-notes-item--strikethrough' : ''"
      >
        <p class="character-notes-item__name">
          {{ note.key }}
        </p>
        <span class="character-notes-item__text">
          {{ note.value }}
        </span>
        <div class="note-controls">
          <button
            class="note-control note-control__edit"
            :data-id="note.id"
            @click="clickEdit(note.id)"
          >
            {{ $t('edit') }}
          </button>
          <button
            class="note-control note-control__strike"
            :data-id="note.id"
            @click="clickStrike(note.id)"
          >
            {{ $t('cross_out') }}
          </button>
          <button
            class="note-control note-control__delete"
            :data-id="note.id"
            @click="clickDelete(note.id)"
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

// Modules
import { writeNestedObjToCurrentUser } from '@/api/database/write';

export default {
  name: 'CharacterNotes',
  computed: {
    selectedCharacter() {
      return this.$store.state.selectedCharacter;
    },
  },
  methods: {
    getNoteObjectById(id) {
      return this.selectedCharacter.notes.find((note) => note.id === id);
    },
    clickEdit(noteId) {
      const NOTES_COLLECTION = `characters/${this.selectedCharacter.id}/notes`;
      const note = this.getNoteObjectById(noteId);
      const data = [
        {
          id: note.id,
          key: 'key',
          value: note.key,
          fieldName: this.$t('title'),
        },
        {
          id: note.id,
          key: 'value',
          value: note.value,
          fieldName: this.$t('text'),
        },
      ];

      const componentProps = {
        data,
        title: {
          key: this.$t('edit_field'),
          value: note.key,
        },
        objectId: noteId,
        characterId: this.selectedCharacter.id,
        collectionPath: NOTES_COLLECTION,
        mutation: 'updateCharacterNote',
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
    clickStrike(noteId) {
      const NOTES_COLLECTION = `characters/${this.selectedCharacter.id}/notes`;
      const note = this.getNoteObjectById(noteId);
      note.strikethrough = !note.strikethrough;
      writeNestedObjToCurrentUser(NOTES_COLLECTION, note.id, note);
    },
    clickDelete(noteId) {
      const NOTES_COLLECTION = `characters/${this.selectedCharacter.id}/notes`;
      const note = this.getNoteObjectById(noteId);

      const componentProps = {
        data: {
          button: {
            yes: this.$t('yes'),
            no: this.$t('no'),
          },
        },
        heading: {
          title: `${this.$t('warning_message_title')}.`,
          preamble: `${this.$t('warning_message_preamble')}: ${note.key}`,
          content: `${this.$t('warning_message_content')}`,
        },
        objectId: noteId,
        collectionPath: NOTES_COLLECTION,
        mutation: 'deleteCharacterNote',
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
    addNote() {
      const NOTES_COLLECTION = `characters/${this.selectedCharacter.id}/notes`;
      const data = [
        {
          key: 'Title',
          fieldName: this.$t('title'),
        },
        {
          key: 'Text',
          fieldName: this.$t('text'),
        },
      ];

      const componentProps = {
        data,
        title: this.$t('add_note'),
        collectionPath: NOTES_COLLECTION,
        mutation: 'addCharacterNote',
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
.character-notes {
  padding: 0 0 55px 0;
}

.character-notes-item {
  position: relative;
}

.character-notes-item__name {
  margin: 20px 0 10px 0;
  font-size: 20px;
}

.character-notes-item__text {
  margin: 0 0 0 10px;
}

.character-notes-item--strikethrough p,
.character-notes-item--strikethrough span {
  text-decoration: line-through;
}

.note-controls {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
}

.note-control {
  cursor: pointer;
}

.note-control__edit {
  margin: 0 5px 0 0;
}

.note-control__strike {
  margin: 0 5px 0 0;
}

.character-notes-item:hover {
  background-color: #e4e4e4;
}

.character-notes-item:hover > .note-controls {
  display: block;
}
</style>
