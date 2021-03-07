<template>
  <div class="lobby view-window">
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
.lobby-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
