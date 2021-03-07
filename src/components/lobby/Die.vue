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
      const message = this.$i18n.locale === 'en' ?
        `${this.userDisplayName} rolled: ${result.value}, with a: ${result.die}` :
        `${this.userDisplayName} rullade: ${result.value}, med en: ${this.$t(result.die)}`;

      writeObject('console', 'shared', {
        message,
      });
    },
  },
};
</script>

<style scoped>
.die {
  flex: 0 0 auto;
  margin: 10px;
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
