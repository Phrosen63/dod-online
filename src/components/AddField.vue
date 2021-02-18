<template>
  <button>
    {{ data.name }}
  </button>
</template>

<script>
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
};
</script>
