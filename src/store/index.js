import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import mutations from './mutations';

export default new Vuex.Store({
  state: {
    characterNoteAdded: null,
    characterNoteSaved: null,
    characterNoteDeleted: null,
    inventoryItemAdded: null,
    inventoryItemSaved: null,
    inventoryItemDeleted: null,
    characterSkillAdded: null,
    characterSkillSaved: null,
    characterSkillDeleted: null,
  },
  mutations,
});
