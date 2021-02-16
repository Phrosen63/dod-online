<template>
  <div class="characters">
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
.characters {
  width: 80%;
  margin: 100px auto;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  min-height: 500px;
}

.characters > h1 {
  margin: 22px 0 10px 0;
}
</style>
