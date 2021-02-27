<template>
  <div class="characters  view-window">
    <h1>Characters</h1>
    <p class="preamble">
      ~ Click on a field to edit it's value ~
    </p>
    <CharacterList />
  </div>
</template>

<script>
// Components
import CharacterList from '@/components/character/CharacterList';

export default {
  name: 'Characters',
  components: {
    CharacterList,
  },
};
</script>

<style scoped>
.characters > h1 {
  margin: 22px 0 10px 0;
}
</style>
