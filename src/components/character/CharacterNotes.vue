<template>
  <div
    v-if="Object.keys(notes).length > 0"
    class="character-notes"
  >
    <h2>Notes</h2>
    <ul>
      <li
        v-for="(item, key) in notes"
        :key="key"
        :ref="key"
        class="character-notes-item"
        :class="item.strikethrough ? 'character-notes-item--strikethrough' : ''"
      >
        <p class="character-notes-item__name">
          {{ key }}
        </p>
        <span class="character-notes-item__text">
          {{ item.text }}
        </span>
        <div class="note-controls">
          <button
            class="note-control note-control__edit"
            @click="clickEdit(key)"
          >
            Edit
          </button>
          <button
            class="note-control note-control__strike"
            @click="clickStrike(key)"
          >
            Cross-out
          </button>
          <button
            class="note-control note-control__delete"
            @click="clickDelete(key)"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// Modules
import { createDoubleNestedFieldObject, writeNestedObjToCurrentUser } from '@/api/database/writeToDb';

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
      console.log('delete button was clicked!' + title);
    },
  },
};
</script>

<style scoped>
.character-notes {
  flex: 1 0 auto;
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

/*
.note-control__delete {
}
*/

.character-notes-item:hover > .note-controls {
  display: block;
}
</style>
