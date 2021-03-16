<template>
  <div class="lobby view-window">
    <h1>Lobby</h1>
    <div class="grid">
      <div class="row">
        <div class="col-2">
          <Dice />
        </div>
        <div class="col-10">
          <Console />
        </div>
      </div>
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
