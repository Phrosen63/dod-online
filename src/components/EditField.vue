<template>
  <div class="edit-field-wrapper">
    <label class="edit-field__label">
      {{ data.fieldName }}:
    </label>
    <input
      type="text"
      class="edit-field__input"
      :value="data.value"
      @keyup="$emit('editFieldUpdate', {
        key: data.key,
        value: $event.target.value
      })"
    >
  </div>
</template>

<script>
export default {
  name: 'EditField',
  props: {
    data: {
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
.edit-field-wrapper {
  flex: 1 0 auto;
  display: flex;
  margin: 5px 0;
}

.edit-field__label {
  flex: 0 0 20%;
  font-size: 20px;
}

.edit-field__input {
  flex: 1 0 80%;
  font-size: 20px;
}
</style>
