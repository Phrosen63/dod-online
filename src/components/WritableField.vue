<template>
  <div>
    <label class="writableField-label">
      {{ data.title }}:
    </label>
    <input
      type="text"
      :value="data.value"
      class="hidden-textfield"
      title="Click to edit"
      @focus="$event.target.select()"
      @change="updateText(data.nestedField, $event)"
    >
  </div>
</template>

<script>
// Modules
import { createNestedFieldObject, writeNestedObjToCurrentUser } from '@/api/database/write';

export default {
  name: 'WritableField',
  props: {
    data: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
  },
  methods: {
    async updateText(nestedField, event) {
      const nestedObject = createNestedFieldObject(this.data.field, nestedField, event.target.value);
      writeNestedObjToCurrentUser(this.data.document, this.data.characterId, nestedObject);
    }
  },
};
</script>

<style scoped>
.writableField-label {
  text-transform: capitalize;
  font-size: 18px;
}
</style>
