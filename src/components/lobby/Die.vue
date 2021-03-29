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
      messageColor: {
        name: '#e4b03b',
        result: '#00ff08',
        dice: '#ffefa0',
      },
    };
  },
  created() {
    this.userDisplayName = this.setUserDisplayName();
  },
  methods: {
    async setUserDisplayName() {
      this.userDisplayName = await getUserDisplayName();
    },
    highlightText({value, color}) {
      return `<span style="color: ${color};">${value}</span>`;
    },
    rollDie(die) {
      const result = rollDie(die);

      const highlight = {
        name: this.highlightText({
          value: this.userDisplayName,
          color: this.messageColor.name,
        }),
        result: this.highlightText({
          value: result.value,
          color: this.messageColor.result,
        }),
        die: this.highlightText({
          value: this.$t(result.die),
          color: this.messageColor.dice,
        }),
      };

      const message = `${highlight.name} ${this.$t('rolled')}: ${highlight.result}, ${this.$t('with_a')}: ${highlight.die}`;
      const hiddenMessage = `${highlight.name} ${this.$t('rolled')} ${this.$t('hidden_result')}`;

      const data = {
        message,
        date: Date.now(),
        hiddenMessage,
      };
      this.$store.commit('setConsoleMessage', data);
    },
  },
};
</script>

<style scoped>
.die {
  background-color: tomato;
  border-radius: 10%;
  border: 1px solid #000;
  width: 70px;
  height: 70px;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
}
</style>
