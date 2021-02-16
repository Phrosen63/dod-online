import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    customDiceRoll: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setCustomDiceRoll(state, payload) {
      if (payload && typeof payload === 'object' && payload.message) {
        state.customDiceRoll = payload;
      }
    },
  },
});
