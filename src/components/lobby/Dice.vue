<template>
  <div class="dice-wrapper">
    <div class="dice">
      <Die :data="{ title: getTitle('D3'), die: $t('D3') }" />
      <Die :data="{ title: getTitle('D4'), die: $t('D4') }" />
      <Die :data="{ title: getTitle('D6'), die: $t('D6') }" />
      <Die :data="{ title: getTitle('D8'), die: $t('D8') }" />
      <Die :data="{ title: getTitle('D10'), die: $t('D10') }" />
      <Die :data="{ title: getTitle('D12'), die: $t('D12') }" />
      <Die :data="{ title: getTitle('D20'), die: $t('D20') }" />
      <Die :data="{ title: getTitle('D100'), die: $t('D100') }" />
    </div>
    <button
      class="die custom-die"
      @click="showModal"
    >
      {{ $t('custom') }}
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
    getTitle(die) {
      return `${this.$t('roll')} ${this.$t(die)}`;
    },
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
