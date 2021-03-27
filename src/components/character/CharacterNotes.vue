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
        <p
          v-for="(value, key) in trimmedNote(note)"
          :key="getUniqueObjectKey(note.id, key)"
        >
          <span class="character-notes-item__name">
            {{ key }}:
          </span>
          <span class="character-notes-item__text">
            {{ value }}
          </span>
        </p>
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
import { writeObject } from '@/api/database/write';

export default {
  name: 'CharacterNotes',
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
        return `users/${this.selectedCharacter.uid}/characters/${this.selectedCharacter.id}/notes`;
      }
      return undefined;
    },
    trimmedNote(note) {
      const obj = Object.assign({}, note);
      delete obj['uid'];
      delete obj['id'];
      delete obj['strikethrough'];
      return obj;
    },
    getUniqueObjectKey(id, key) {
      return `${id}_${key}`;
    },
    getNoteObjectById(id) {
      return this.selectedCharacter.notes.find((note) => note.id === id);
    },
    addNote() {
      const NOTES_COLLECTION = this.getCollectionPath();

      if (NOTES_COLLECTION) {
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
          mutation: 'addObject',
          stateTarget: this.$store.state.selectedCharacter.notes,
          extras: [
            {
              key: 'strikethrough',
              value: false,
            },
          ],
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
    clickEdit(noteId) {
      const NOTES_COLLECTION = this.getCollectionPath();

      if (NOTES_COLLECTION) {
        const note = this.getNoteObjectById(noteId);
        const data = [
          {
            id: note.id,
            key: 'Title',
            value: note.Title,
            fieldName: this.$t('title'),
          },
          {
            id: note.id,
            key: 'Text',
            value: note.Text,
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
          mutation: 'updateObject',
          stateTarget: this.$store.state.selectedCharacter.notes,
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
    clickStrike(noteId) {
      const NOTES_COLLECTION = this.getCollectionPath();

      if (NOTES_COLLECTION) {
        const note = this.getNoteObjectById(noteId);
        note.strikethrough = !note.strikethrough;
  
        writeObject({
          collectionPath: NOTES_COLLECTION,
          document: note.id,
          data: note,
        });
      }
    },
    clickDelete(noteId) {
      const NOTES_COLLECTION = this.getCollectionPath();

      if (NOTES_COLLECTION) {
        const note = this.getNoteObjectById(noteId);
  
        const componentProps = {
          data: {
            button: {
              yes: this.$t('yes'),
              no: this.$t('no'),
            },
          },
          heading: {
            title: `${this.$t('warning_message_title')} ${this.$t('note').toLowerCase()}.`,
            preamble: `${this.$t('warning_message_preamble')} ${this.$t('note').toLowerCase()}: ${note.Title}`,
            content: `${this.$t('warning_message_content')}`,
          },
          objectId: noteId,
          collectionPath: NOTES_COLLECTION,
          mutation: 'deleteObject',
          stateTarget: this.$store.state.selectedCharacter.notes,
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
