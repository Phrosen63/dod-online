<template>
  <div
    v-if="Object.keys(notes).length > 0"
    class="character-notes"
  >
    <h2>Notes</h2>
    <transition-group
      name="transition-list"
      tag="ul"
    >
      <li
        v-for="note in showNotes"
        :key="note.title"
        :ref="note.title"
        class="character-notes-item"
        :class="note.strikethrough ? 'character-notes-item--strikethrough' : ''"
      >
        <p class="character-notes-item__name">
          {{ note.title }}
        </p>
        <span class="character-notes-item__text">
          {{ note.text }}
        </span>
        <div class="note-controls">
          <button
            class="note-control note-control__edit"
            @click="clickEdit(note.title)"
          >
            Edit
          </button>
          <button
            class="note-control note-control__strike"
            @click="clickStrike(note.title)"
          >
            Cross-out
          </button>
          <button
            class="note-control note-control__delete"
            @click="clickDelete(note.title)"
          >
            Delete
          </button>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
// Modules
import { deleteNestedFieldFromCurrentUser } from '@/api/database/delete';
import {
  createDoubleNestedFieldObject,
  writeNestedObjToCurrentUser,
  } from '@/api/database/writeToDb';

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
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      showNotes: [],
    };
  },
  created() {
    // Convert weird firestore object into javascript array, store the result in this.showNotes
    Object.keys(this.notes).forEach(key => {
      const obj = {
        title: key,
      };

      const nestedObject = this.notes[key];
      Object.keys(nestedObject).forEach(nestedKey => {
        obj[nestedKey] = nestedObject[nestedKey];        
      });

      this.showNotes.push(obj);
    });
  },
  methods: {
    clickEdit(title) {
      console.log('edit button was clicked!' + title);
    },
    clickStrike(title) {
      const li = this.$refs[title][0];
      let value;

      if (li.classList.contains('character-notes-item--strikethrough')) {
        li.classList.remove('character-notes-item--strikethrough');
        value = false;
      } else {
        li.classList.value = li.classList.value + ' character-notes-item--strikethrough';
        value = true;
      }

      const obj = createDoubleNestedFieldObject('notes', title, 'strikethrough', value);
      writeNestedObjToCurrentUser('characters', this.id, obj);
    },
    clickDelete(title) {
      const index = this.showNotes.findIndex(x => x.title === title);
      if (index > -1) {
        this.showNotes.splice(index, 1);
        deleteNestedFieldFromCurrentUser(this.id, title);
      }
    },
  },
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
