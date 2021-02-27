<template>
  <div class="dice-wrapper">
    <div class="dice">
      <Die :data="{ title: 'Roll T3', die: 'T3' }" />
      <Die :data="{ title: 'Roll T4', die: 'T4' }" />
      <Die :data="{ title: 'Roll T6', die: 'T6' }" />
      <Die :data="{ title: 'Roll T8', die: 'T8' }" />
      <Die :data="{ title: 'Roll T10', die: 'T10' }" />
      <Die :data="{ title: 'Roll T12', die: 'T12' }" />
      <Die :data="{ title: 'Roll 204', die: 'T20' }" />
      <Die :data="{ title: 'Roll100T4', die: 'T100' }" />
    </div>
    <button
      class="die custom-die"
      @click="showModal"
    >
      Custom
    </button>
  </div>
</template>

<script>
// Components
import Die from './Die';
import CustomDice from '../modals/CustomDice'

export default {
  name: 'Dice',
  components: {
    Die,
  },
  methods: {
    showModal() {
      const componentProps = {};
      const modalProps = {
        height: 'auto',
        scrollable: true,
        draggable: true,
        focusTrap: true,
      };

      this.$modal.show(
        CustomDice,
        componentProps,
        modalProps,
      );
    },
  },
};
</script>

<style scoped>
.dice-wrapper {
  flex: 1 0 20%;
  display: flex;
  flex-direction: column;
  margin: 41px 0 0 0;
}

.dice {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 10px;
  margin: 0 0 25px 0;
}

.custom-die {
  flex: 1 0 auto;
  margin: 0 20px;
  background-color: tomato;
  border-radius: 5px;
  border: 1px solid #000;
  min-height: 60px;
  max-height: 60px;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
}
</style>
