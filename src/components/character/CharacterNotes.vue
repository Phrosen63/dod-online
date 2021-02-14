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
        class="character-notes-item"
      >
        <p class="character-notes-item__name">
          {{ key }}
        </p>
        <span class="character-notes-item__text">
          {{ item.text }}
        </span>
        <button class="note-control note-control__edit">
          Edit
        </button>
        <button class="note-control note-control__strike">
          Cross-out
        </button>
        <button class="note-control note-control__delete">
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
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

.note-control {
  position: absolute;
  top: 0;
}

.note-control__edit {
  right: 80px;
}

.note-control__strike {
  right: 40px;
}

.note-control__delete {
  right: 0;
}
</style>
