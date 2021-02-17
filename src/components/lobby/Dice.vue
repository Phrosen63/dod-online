<template>
  <div class="dice">
    <Die :data="{ title: 'Roll T3', die: 'T3' }" />
    <Die :data="{ title: 'Roll T4', die: 'T4' }" />
    <Die :data="{ title: 'Roll T6', die: 'T6' }" />
    <Die :data="{ title: 'Roll T8', die: 'T8' }" />
    <Die :data="{ title: 'Roll T10', die: 'T10' }" />
    <Die :data="{ title: 'Roll T12', die: 'T12' }" />
    <Die :data="{ title: 'Roll 204', die: 'T20' }" />
    <Die :data="{ title: 'Roll100T4', die: 'T100' }" />
    <button
      class="die custom-die"
      @click="showModal"
    >
      Roll custom die
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
.dice {
  flex: 0 0 20%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 360px;
  margin: 41px 0 0 0;
  padding: 0 10px;
}

.die {
  flex: 0 0 auto;
  margin: 0 10%;
  background-color: tomato;
  border-radius: 10%;
  border: 1px solid #000;
  width: 60px;
  height: 60px;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
}

.custom-die {
  flex: 1 0 auto;
}
</style>
