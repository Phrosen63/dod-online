<template>
  <div class="grid dice-wrapper">
    <div class="row">
      <div class="col-4">
        <Die :data="{ title: getTitle('D3'), die: $t('D3') }" />
      </div>
      <div class="col-4">
        <Die :data="{ title: getTitle('D4'), die: $t('D4') }" />
      </div>
      <div class="col-4">
        <Die :data="{ title: getTitle('D6'), die: $t('D6') }" />
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <Die :data="{ title: getTitle('D8'), die: $t('D8') }" />
      </div>
      <div class="col-4">
        <Die :data="{ title: getTitle('D10'), die: $t('D10') }" />
      </div>
      <div class="col-4">
        <Die :data="{ title: getTitle('D12'), die: $t('D12') }" />
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <Die :data="{ title: getTitle('D20'), die: $t('D20') }" />
      </div>
      <div class="col-4">
        <Die :data="{ title: getTitle('D100'), die: $t('D100') }" />
      </div>
      <div class="col-4" />
    </div>
    <div class="row">
      <div class="col-12">
        <button
          class="die custom-die"
          @click="showModal"
        >
          {{ $t('custom') }}
        </button>
      </div>
    </div>
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
  margin: 38px 5px 0 5px;
}

.custom-die {
  width: 100%;
  background-color: tomato;
  border-radius: 5px;
  border: 1px solid #000;
  height: 70px;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
}
</style>
