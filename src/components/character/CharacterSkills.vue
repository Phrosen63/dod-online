<template>
  <div class="character-skills" />
</template>

<script>
export default {
  name: 'CharacterSkills',
  props: {
    id: {
      type: String,
      required: true,
      default() {
        return '';
      },
    },
    skills: {
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

</style>
