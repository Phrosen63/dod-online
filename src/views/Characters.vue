<template>
  <div class="characters">
    <CharacterList />
  </div>
</template>

<script>
import CharacterList from '@/components/CharacterList';

export default {
  name: 'Characters',
  components: {
    CharacterList,
  },
}
</script>

<style scoped>
.characters {
  width: 80%;
  margin: 100px auto;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
}
</style>
