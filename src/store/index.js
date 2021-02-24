import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import mutations from './mutations';

export default new Vuex.Store({
  state: {
    user: null,
    customDiceRoll: null,
    characterNoteAdded: null,
    characterNoteSaved: null,
    characterNoteDeleted: null,
    inventoryItemSaved: null,
    inventoryItemAdded: null,
    inventoryItemDeleted: null,
  },
  mutations,
});
