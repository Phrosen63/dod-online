<template>
  <div class="lobby">
    <h1>Lobby</h1>
    <div class="lobby-wrapper">
      <Dice />
      <Console />
    </div>
  </div>
</template>

<script>
// Components
import Dice from '@/components/lobby/Dice';
import Console from '@/components/lobby/Console';

export default {
  name: 'Lobby',
  components: {
    Dice,
    Console,
  },
};
</script>

<style scoped>
.lobby {
  width: 80%;
  margin: 100px auto;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  min-height: 500px;
}

.lobby-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
