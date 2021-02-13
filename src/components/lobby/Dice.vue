<template>
  <div class="dice">
    <button @click="rollDie">
      Roll die!
    </button>
  </div>
</template>

<script>
// Modules
import { writeObject } from '@/api/database/writeToDb';
import { getFirebaseUser } from '@/api/database/getUserData';

export default {
  name: 'Dice',
  data() {
    return {
      userDisplayName: '',
    };
  },
  created() {
    this.getUserDisplayName();
  },
  methods: {
    async getUserDisplayName() {
      // TODO: Create method for this in API
      const currentUser = await getFirebaseUser();
      this.userDisplayName = currentUser.displayName;
    },
    rollDie() {
      // TODO: Create API for random numbers
      const max = 6;
      const min = 1;
      let result = Math.floor(Math.random() * (max - min + 1)) + min;

      const data = {
        user: this.userDisplayName,
        value: result,
        dice: 'T6',
      }
      writeObject('console', 'shared', data);
    },
  },
};
</script>

<style scoped>
.dice {
  flex: 0 0 20%;
}
</style>
