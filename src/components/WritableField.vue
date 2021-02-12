<template>
  <input
    type="text"
    :value="data.value"
    class="hidden-textfield"
    title="Click to edit"
    @focus="$event.target.select()"
    @change="updateText(data.nestedField, $event)"
  >
</template>

<script>
// Modules
import { createNestedFieldObject, writeNestedObjToCurrentUser } from '@/api/writeToDb';

export default {
  name: 'WriteableField',
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
      writeNestedObjToCurrentUser(this.data.document, this.data.id, nestedObject);
    }
  },
};
</script>
