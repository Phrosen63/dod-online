<template>
  <div class="custom-dice">
    <h1>Custom die roll</h1>
    <p class="preamble">
      ~ Choose number of dice to roll, then choose type of die ~ <br>
      ~ Finally choose bonuses to be added after the rolls ~
    </p>
    <label class="custom-dice__label">
      How many rolls?
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
      Select die
    </label>
    <select
      v-model="die"
      class="custom-dice__select"
    >
      <option>Custom</option>
      <option>T3</option>
      <option>T4</option>
      <option>T6</option>
      <option>T8</option>
      <option>T10</option>
      <option>T12</option>
      <option>T20</option>
      <option>T100</option>
    </select>
    <div
      v-if="die === 'Custom'"
      class="custom-dice-wrapper"
    >
      <label class="custom-dice__label">
        Custom die - min
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
        Custom die - max
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
      Bonus?
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
        Rolling: 
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
        Close
      </button>
      <button
        class="custom-dice__button"
        @click="roll"
      >
        Roll!
      </button>
    </div>
  </div>
</template>

<script>
// Modules
import { rollDie } from '@/api/randomNumberGenerator';
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
      if (this.amount > 0) {
        const loopEnd = this.amount > this.maxNumberOfRolls ? this.maxNumberOfRolls : this.amount;
        const min = this.min > this.customDie.minMax ? this.customDie.minMax : this.min;
        const max = this.max > this.customDie.maxMax ? this.customDie.maxMax : this.max;
        const eachResult = [];
        let combinedResult = 0;

        for(var i = 0; i < loopEnd; i+= 1) {
          const result = rollDie(this.die, min, max);
          const value = parseInt(result.value);
          combinedResult += value;
          eachResult.push(value);
        }
        combinedResult+= parseInt(this.bonus);

        this.$store.commit('setCustomDiceRoll', {
          message: this.getConsoleMessage(eachResult, combinedResult)
        });
      }
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
  padding: 10px;
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
