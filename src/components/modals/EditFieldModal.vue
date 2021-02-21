<template>
  <div class="edit-field-modal">
    <h1>Edit field: {{ title }}</h1>
    <div class="edit-field-modal-form">
      <EditField
        v-for="(obj, index) in data"
        :key="index"
        :data="{
          key: obj.key,
          value: obj.value,
          fieldName: obj.fieldName,
        }"
        @editFieldUpdate="updateDataValue($event, obj)"
      />
    </div>
    <div class="edit-field-modal-wrapper">
      <button
        class="edit-field-modal__button"
        @click="cancel"
      >
        Cancel
      </button>
      <button
        class="edit-field-modal__button"
        @click="save"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script>
// Components
import EditField from '@/components/EditField';

// Modules
import { writeNestedObjToCurrentUser } from '@/api/database/write';

export default {
  name: 'EditFieldModal',
  components: {
    EditField,
  },
  data() {
    return {
      data: [],
      title: undefined,
      objectId: undefined,
      characterId: undefined,
      NOTE_COLLECTION: undefined,
    };
  },
  created() {
    this.data = this.$attrs.data;
    this.title = this.$attrs.title;
    this.objectId = this.$attrs.objectId;
    this.characterId = this.$attrs.characterId;
    this.NOTE_COLLECTION = `characters/${this.characterId}/notes`;
  },
  methods: {
    updateDataValue(e, obj) {
      obj.value = e.value;
    },
    cancel() {
      this.$modal.hideAll();
    },
    save() {
      this.data.forEach(item => {
        const obj = {};
        obj[item.key] = item.value;
        writeNestedObjToCurrentUser(this.NOTE_COLLECTION, this.objectId, obj);
      });
      this.$store.commit('setCharacterNoteSaved', this.data);
      this.$modal.hideAll();
    },
  }
};
</script>

<style scoped>
.edit-field-modal {
  padding: 10px;
}

.edit-field-modal-form {
  display: flex;
  flex-direction: column;
}

.edit-field-modal-wrapper {
  flex: 1 0 auto;
  display: flex;
  margin: 5px 0;
}

.edit-field-modal__button {
  flex: 1 0 auto;
  margin: 0;
  padding: 5px 20px;
  font-size: 18px;
  cursor: pointer;
}

.edit-field-modal__button:last-of-type {
  margin: 0 0 0 10px;
}
</style>
