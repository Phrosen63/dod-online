<template>
  <div class="modal-window custom-dice">
    <h1 class="modal-heading">
      {{ $t('custom_die_roll') }}
    </h1>
    <p class="preamble">
      ~ {{ $t('custom_dice_info_1') }} ~ <br>
      ~ {{ $t('custom_dice_info_2') }} ~
    </p>
    <label class="custom-dice__label">
      {{ $t('how_many_rolls') }}
    </label>
    <input
      v-model="amount"
      class="custom-dice__input"
      type="number"
      min="1"
      :max="maxNumberOfRolls"
      step="1"
      value="1"
    >
    <label class="custom-dice__label">
      {{ $t('select_die') }}
    </label>
    <select
      v-model="die"
      class="custom-dice__select"
    >
      <option>{{ $t('custom') }}</option>
      <option>{{ $t('D3') }}</option>
      <option>{{ $t('D4') }}</option>
      <option>{{ $t('D6') }}</option>
      <option>{{ $t('D8') }}</option>
      <option>{{ $t('D10') }}</option>
      <option>{{ $t('D12') }}</option>
      <option>{{ $t('D20') }}</option>
      <option>{{ $t('D100') }}</option>
    </select>
    <div
      v-if="die === 'Custom'"
      class="custom-dice-wrapper"
    >
      <label class="custom-dice__label">
        {{ $t('custom_die_min') }}
      </label>
      <input
        v-model="min"
        class="custom-dice__input"
        type="number"
        min="1"
        :max="customDie.minMax"
        step="1"
        value="1"
      >
      <label class="custom-dice__label">
        {{ $t('custom_die_max') }}
      </label>
      <input
        v-model="max"
        class="custom-dice__input"
        type="number"
        min="1"
        :max="customDie.maxMax"
        step="1"
        value="1"
      >
    </div>
    <label class="custom-dice__label">
      {{ $t('bonus') }}
    </label>
    <input
      v-model="bonus"
      class="custom-dice__input"
      type="number"
      :min="minBonus"
      :max="maxBonus"
      step="1"
      value="0"
    >
    <div class="custom-dice__wrapper">
      <span class="custom-dice__text custom-dice__text--static">
        {{ $t('rolling') }}:
      </span>
      <span class="custom-dice__text">
        {{ getOutput() }}
      </span>
    </div>
    <div class="custom-dice__wrapper">
      <button
        class="custom-dice__button"
        @click="closeModal"
      >
        {{ $t('close') }}
      </button>
      <button
        class="custom-dice__button"
        @click="roll"
      >
        {{ $t('roll') }}!
      </button>
    </div>
  </div>
</template>

<script>
// Modules
import { writeObject } from '@/api/database/write';
import { rollDice } from '@/api/randomNumberGenerator';
import { getUserDisplayName } from '@/api/database/user';

export default {
  name: 'CustomDice',
  data() {
    return {
      userDisplayName: undefined,
      amount: 1,
      die: 'Custom',
      bonus: 0,
      min: 1,
      max: 1,
      maxNumberOfRolls: 1000,
      maxBonus: 9999,
      minBonus: -9999,
      customDie: {
        minMax: 9998,
        maxMax: 9999,
      },
    };
  },
  async created() {
    this.userDisplayName = await getUserDisplayName();
  },
  methods: {
    closeModal() {
      this.$modal.hideAll();
    },
    getConsoleMessage(eachResult, combinedResult) {
      const rolls = eachResult.join(' + ');

      if (this.die === 'Custom') {
        const min = this.min > this.customDie.minMax ? this.customDie.minMax : this.min;
        const max = this.max > this.customDie.maxMax ? this.customDie.maxMax : this.max;

        if (this.bonus !== 0) {
          return this.amount > 1 ?
            `${this.userDisplayName} rolled: ${combinedResult} (${rolls})${this.getBonus()}, using: ${this.getOutput()} (${min}, ${max})` :
            `${this.userDisplayName} rolled: ${combinedResult}, with a: ${this.die} die (${min}, ${max})${this.getBonus()}`;
        }
        return this.amount > 1 ?
          `${this.userDisplayName} rolled: ${combinedResult} (${rolls})${this.getBonus()}, using: ${this.getOutput()} (${min}, ${max})` :
          `${this.userDisplayName} rolled: ${combinedResult}, with a: ${this.die} die (${min}, ${max})`;
      }

      if (this.bonus !== 0) {
        return this.amount > 1 ?
          `${this.userDisplayName} rolled: ${combinedResult} (${rolls})${this.getBonus()}, using: ${this.getOutput()}` :
          `${this.userDisplayName} rolled: ${combinedResult}, with a: ${this.die}${this.getBonus()}`;
      }

      return this.amount > 1 ?
        `${this.userDisplayName} rolled: ${combinedResult} (${rolls})${this.getBonus()}, using: ${this.getOutput()}` :
        `${this.userDisplayName} rolled: ${combinedResult}, with a: ${this.die}`;
    },
    roll() {
      const amount = this.amount > this.maxNumberOfRolls ? this.maxNumberOfRolls : this.amount;
      const min = this.min > this.customDie.minMax ? this.customDie.minMax : this.min;
      const max = this.max > this.customDie.maxMax ? this.customDie.maxMax : this.max;

      const result = rollDice({
        amount: amount,
        type: this.die,
        min: min,
        max: max,
        bonus: this.bonus,
      });

      writeObject('console', 'shared', {
        message: this.getConsoleMessage(result.eachResult, result.combinedResult)
      });
    },
    getBonus() {
      let bonus;
      if (this.bonus > 0) {
        bonus = this.bonus > this.maxBonus ? this.maxBonus : this.bonus;
        return `+${bonus}`;
      }
      if (this.bonus < 0) {
        bonus = this.bonus < this.minBonus ? this.minBonus : this.bonus;
        return `${bonus}`;
      }
      return '';
    },
    getOutput() {
      const amount = this.amount > this.maxNumberOfRolls ? this.maxNumberOfRolls : this.amount;
      if (this.die === 'Custom') {
        return `${amount}x Custom die ${this.getBonus()}`;
      }
      return `${amount}${this.die}${this.getBonus()}`
    },
  },
};
</script>

<style scoped>
.custom-dice {
  display: flex;
  flex-direction: column;
}

.custom-dice__label,
.custom-dice__input,
.custom-dice__select,
.custom-dice__text,
.custom-dice__button {
  font-size: 20px;
  margin: 5px 0;
}

.custom-dice-wrapper {
  display: flex;
  flex-direction: column;
}

.custom-dice__select {
  cursor: pointer;
}

.custom-dice__text {
  margin: 0;
}

.custom-dice__text--static {
  margin: 0 10px 0 0;
  font-weight: 600;
}

.custom-dice__wrapper {
  flex: 1 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 5px 0;
}

.custom-dice__button {
  margin: 0 0 0 10px;
  padding: 5px 20px;
  font-size: 18px;
  cursor: pointer;
}
</style>
