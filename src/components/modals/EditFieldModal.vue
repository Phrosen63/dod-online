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
          fieldName: obj.fieldName || obj.key,
        }"
        @editFieldUpdate="updateDataValue($event, obj)"
      />
    </div>
    <div class="modal-wrapper">
      <button
        class="modal-button"
        @click="cancel"
      >
        {{ $t('cancel') }}
      </button>
      <button
        class="modal-button"
        @click="save"
      >
        {{ $t('save') }}
      </button>
    </div>
  </div>
</template>

<script>
// Components
import EditField from '@/components/EditField';

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
      collectionPath: undefined,
      mutation: undefined,
      stateTarget: undefined,
      id: undefined,
    };
  },
  created() {
    this.data = this.$attrs.data;
    this.title = this.$attrs.title;
    this.objectId = this.$attrs.objectId;
    this.mutation = this.$attrs.mutation;
    this.collectionPath = this.$attrs.collectionPath;
    this.stateTarget = this.$attrs.stateTarget;
    this.id = this.$attrs.data[0].id;
  },
  methods: {
    updateDataValue(e, obj) {
      obj.value = e.value;
    },
    cancel() {
      this.$modal.hideAll();
    },
    save() {
      const obj = {};
      obj.collectionPath = this.collectionPath;
      obj.stateTarget = this.stateTarget;
      obj.id = this.id;
      obj.data = {};

      this.data.forEach(item => {
        obj.data[item.key] = item.value;
      });

      this.$store.commit(this.mutation, obj);
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
