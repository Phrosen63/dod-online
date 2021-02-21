<template>
  <button
    class="add-field-button"
    @click="click"
  >
    {{ data.name }}
  </button>
</template>

<script>
// Componentes
import AddOrEditFieldModal from '@/components/modals/AddOrEditFieldModal';

export default {
  name: 'AddField',
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
    click() {
      const data = [
        {
          id: undefined,
          key: 'key',
          value: '',
          fieldName: 'Title',
        },
        {
          id: undefined,
          key: 'value',
          value: '',
          fieldName: 'Text',
        },
      ];

      const componentProps = {
        data,
        title: {
          key: 'Add field',
          value: '',
        },
        objectId: undefined,
        uid: this.id,
        path: `characters/${this.data.characterId}/notes`,
      };
      const modalProps = {
        height: 'auto',
        scrollable: true,
        focusTrap: true,
      };

      this.$modal.show(
        AddOrEditFieldModal,
        componentProps,
        modalProps,
      );
    },
  },
};
</script>

<style scoped>
.add-field-button {
  cursor: pointer;
  padding: 0 20px;
  font-size: 18px;
  line-height: 36px;
}
</style>
