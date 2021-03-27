import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    characterList: null,
    selectedCharacter: null,
    settings: {
      displayName: null,
      email: null,
      language: 'en',
      role: 4,
      id: null,
    },
    error: {
      hasError: false,
      message: null,
    }
  },
  actions,
  mutations,
});
