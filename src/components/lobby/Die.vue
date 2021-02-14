<template>
  <button
    class="die"
    :title="data.title"
    @click="rollDie(data.die)"
  >
    {{ data.die }}
  </button>
</template>

<script>
// Modules
import { writeObject } from '@/api/database/write';
import { getUserDisplayName } from '@/api/database/user';
import { rollDie } from '@/api/randomNumberGenerator';

export default {
  name: 'Die',
  props: {
    data: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
  },
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
      writeObject('console', 'shared', {
        message: `${this.userDisplayName} rolled: ${result.value}, with a: ${result.die}`,
      });
    },
  },
};
</script>

<style scoped>
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
</style>
