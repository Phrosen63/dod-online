<template>
  <div class="modal-window">
    <h1 class="modal-heading">
      {{ title.key }}: {{ title.value }}
    </h1>
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
    <div class="modal-wrapper">
      <button
        class="modal-button"
        @click="cancel"
      >
        Cancel
      </button>
      <button
        class="modal-button"
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
import { writeNestedObjToCurrentUser, writeNewObjToCurrentUser } from '@/api/database/write';

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
      COLLECTION_PATH: undefined,
      mutation: undefined,
    };
  },
  created() {
    this.data = this.$attrs.data;
    this.title = this.$attrs.title;
    this.objectId = this.$attrs.objectId;
    this.characterId = this.$attrs.characterId;
    this.COLLECTION_PATH = this.$attrs.path;
    this.mutation = this.$attrs.mutation;
  },
  methods: {
    updateDataValue(e, obj) {
      obj.value = e.value;
    },
    cancel() {
      this.$modal.hideAll();
    },
    save() {
      if (this.objectId) {
        // Edit existing field
        this.data.forEach(item => {
          const obj = {};
          obj[item.key] = item.value;
          writeNestedObjToCurrentUser(this.COLLECTION_PATH, this.objectId, obj);
          this.$store.commit(this.mutation, this.data);
        });
      } else {
        // Add new field
        const result = {};
        this.data.forEach(item => {
          const obj = {};
          obj[item.key] = item.value;
          Object.assign(result, obj);
        });

        result.strikethrough = false;
        writeNewObjToCurrentUser(this.COLLECTION_PATH, result).then(val => {
          result.id = val;
          this.data.push(result);
          this.$store.commit(this.mutation, this.data);
        });
      }
      this.$modal.hideAll();
    },
  }
};
</script>

<style scoped>
.edit-field-modal-form {
  display: flex;
  flex-direction: column;
}

.edit-field-modal__button:last-of-type {
  margin: 0 0 0 10px;
}
</style>
