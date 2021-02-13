<template>
  <div class="dice">
    <button @click="rollDie('T4')">
      T4
    </button>
    <button @click="rollDie('T6')">
      T6
    </button>
    <button @click="rollDie('T8')">
      T8
    </button>
    <button @click="rollDie('T12')">
      T12
    </button>
    <button @click="rollDie('T20')">
      T20
    </button>
    <button @click="rollDie('T100')">
      T100
    </button>
  </div>
</template>

<script>
// Modules
import { writeObject } from '@/api/database/writeToDb';
import { getUserDisplayName } from '@/api/database/getUserData';
import { rollDie } from '@/api/randomNumberGenerator';

export default {
  name: 'Dice',
  data() {
    return {
      userDisplayName: undefined,
    };
  },
  created() {
    this.userDisplayName = this.setUserDisplayName();
  },
  methods: {
    async setUserDisplayName() {
      this.userDisplayName = await getUserDisplayName();
    },
    rollDie(die) {
      const result = rollDie(die);
      const data = {
        message: `${this.userDisplayName} rolled: ${result.value}, with a: ${result.die}`,
      }
      writeObject('console', 'shared', data);
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
  padding: 0 10px;
}

.dice > button {
  flex: 0 0 auto;
  margin: 0 10%;
  background-color: tomato;
  border-radius: 10%;
  border: 1px solid;
  width: 60px;
  height: 60px;
  cursor: pointer;
}
</style>
