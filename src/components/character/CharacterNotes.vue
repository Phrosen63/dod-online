<template>
  <div class="character-notes">
    <h2>Notes</h2>
    <!-- <AddField :data="{ name: 'Add note' }" /> -->
    <transition-group
      name="transition-list"
      tag="ul"
    >
      <li
        v-for="note in showNotes"
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
            Edit
          </button>
          <button
            class="note-control note-control__strike"
            :data-id="note.id"
            @click="clickStrike(note.id)"
          >
            Cross-out
          </button>
          <button
            class="note-control note-control__delete"
            :data-id="note.id"
            @click="clickDelete(note.id)"
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
import EditFieldModal from '@/components/modals/EditFieldModal';

// Modules
import { writeNestedObjToCurrentUser } from '@/api/database/write';
import { deleteDocumentFromCurrentUser } from '@/api/database/delete';

export default {
  name: 'CharacterNotes',
  props: {
    id: {
      type: String,
      required: true,
      default() {
        return '';
      },
    },
    notes: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      showNotes: [],
      NOTE_COLLECTION: undefined,
    };
  },
  computed: {
    characterNoteSavedListener() {
      return this.$store.state.characterNoteSaved;
    },
  },
  watch: {
    characterNoteSavedListener(arr) {
      arr.forEach(obj => {
        const target = this.showNotes.find((note) => note.id === obj.id);
        target[obj.key] = obj.value;
      });
    }
  },
  created() {
    this.showNotes = this.notes;
    this.NOTE_COLLECTION = `characters/${this.id}/notes`;
  },
  methods: {
    getNoteObjectById(id) {
      return this.showNotes.find((note) => note.id === id);
    },
    clickEdit(noteId) {
      const note = this.getNoteObjectById(noteId);
      const data = [
        {
          id: note.id,
          key: 'key',
          value: note.key,
        },
        {
          id: note.id,
          key: 'value',
          value: note.value,
        },
      ];

      const componentProps = {
        data,
        title: note.key,
        noteId: noteId,
        uid: this.id,
        firestore: {
          field: 'notes',
          document: 'characters',
        },
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
      const note = this.getNoteObjectById(noteId);
      note.strikethrough = !note.strikethrough;
      writeNestedObjToCurrentUser(this.NOTE_COLLECTION, note.id, { strikethrough: note.strikethrough });
    },
    clickDelete(noteId) {
      const index = this.showNotes.findIndex(note => note.id === noteId);
      if (index > -1) {
        const note = this.showNotes[index];
        this.showNotes.splice(index, 1);
        deleteDocumentFromCurrentUser(this.NOTE_COLLECTION, note.id);
      }
    },
  }
};
</script>

<style scoped>
.character-notes {
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

.character-notes-item {
  position: relative;
}

.character-notes-item__name {
  margin: 20px 0 10px 0;
  font-size: 20px;
  text-transform: capitalize;
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

.character-notes-item:hover > .note-controls {
  display: block;
}
</style>
