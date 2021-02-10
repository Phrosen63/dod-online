<template>
  <div class="character-skills">

  </div>
</template>

<script>
export default {
  name: 'CharacterSkills',
  props: {
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
