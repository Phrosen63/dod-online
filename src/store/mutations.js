// Modules
import { deleteDocumentFromCurrentUser } from '@/api/database/delete';
import { writeNewObjToCurrentUser } from '@/api/database/write';

const setCharacterList = (state, payload)  => {
  if (payload && typeof payload === 'object') {
    state.characterList = payload;
  }
};

const setSelectedCharacter = (state, payload)  => {
  if (payload && typeof payload === 'object') {
    state.selectedCharacter = payload;
  }
};

const setCharacterClicked = (state, payload)  => {
  if (payload && typeof payload === 'object') {
    state.selectedCharacter = payload;
  }
};

const updateCharacterInfo = (state, payload) => {
  if (payload && typeof payload === 'object') {
    state.selectedCharacter.info[payload.key] = payload.value;
  }
};

const updateCharacterStats = (state, payload) => {
  if (payload && typeof payload === 'object') {
    state.selectedCharacter.stats[payload.key] = payload.value;
  }
};

const addCharacterInventoryItem = (state, payload) => {
  if (payload && typeof payload === 'object') {
    const obj = payload.data;
    if (payload.collectionPath) {
      writeNewObjToCurrentUser(payload.collectionPath, obj).then((id) => {
        obj.id = id;
        state.selectedCharacter.inventory.push(obj);
      });
    }
  }
};

const updateCharacterInventoryItem = (state, payload) => {
  if (payload && typeof payload === 'object') {
    const result = {};
    payload.forEach(obj => {
      result[obj.key] = obj.value;
    });
    result.id = payload[0].id;

    const index = state.selectedCharacter.inventory.findIndex(item => item.id === result.id);
    if (index > -1) {
      Object.keys(state.selectedCharacter.inventory[index]).forEach(key => {
        state.selectedCharacter.inventory[index][key] = result[key];
      });
    }
  }
};

const deleteCharacterInventoryItem = (state, payload) => {
  if (payload && typeof payload === 'object') {
    const obj = payload.data;
    if (obj.value && obj.collectionPath) {
      const index = state.selectedCharacter.inventory.findIndex(item => item.id === obj.id);
      if (index > -1) {
        const item = state.selectedCharacter.inventory[index];
        state.selectedCharacter.inventory.splice(index, 1);
        deleteDocumentFromCurrentUser(obj.collectionPath, item.id);
      }
    }
  }
};

const addCharacterSkill = (state, payload) => {
  if (payload && typeof payload === 'object') {
    const obj = payload.data;
    if (payload.collectionPath) {
      writeNewObjToCurrentUser(payload.collectionPath, obj).then((id) => {
        obj.id = id;
        state.selectedCharacter.skills.push(obj);
      });
    }
  }
};

const updateCharacterSkill = (state, payload) => {
  if (payload && typeof payload === 'object') {
    const result = {};
    payload.forEach(obj => {
      if (obj.key !== 'fieldName') {
        result[obj.key] = obj.value;
      }
    });
    result.id = payload[0].id;

    const index = state.selectedCharacter.skills.findIndex(item => item.id === result.id);
    if (index > -1) {
      Object.keys(state.selectedCharacter.skills[index]).forEach(key => {
        state.selectedCharacter.skills[index][key] = result[key];
      });
    }
  }
};

const deleteCharacterSkill = (state, payload) => {
  if (payload && typeof payload === 'object') {
    const obj = payload.data;
    if (obj.value && obj.collectionPath) {
      const index = state.selectedCharacter.skills.findIndex(item => item.id === obj.id);
      if (index > -1) {
        const item = state.selectedCharacter.skills[index];
        state.selectedCharacter.skills.splice(index, 1);
        deleteDocumentFromCurrentUser(obj.collectionPath, item.id);
      }
    }
  }
};

const addCharacterNote = (state, payload) => {
  if (payload && typeof payload === 'object') {
    const obj = {
      strikethrough: false,
      key: payload.data.Title,
      value: payload.data.Text,
    };
    if (payload.collectionPath) {
      writeNewObjToCurrentUser(payload.collectionPath, obj).then((id) => {
        obj.id = id;
        obj.strikethrough = false;
        state.selectedCharacter.notes.push(obj);
      });
    }
  }
};

const updateCharacterNote = (state, payload) => {
  if (payload && typeof payload === 'object') {
    const result = {};
    payload.forEach(obj => {
      if (obj.key !== 'fieldName') {
        result[obj.key] = obj.value;
      }
    });
    result.id = payload[0].id;

    const index = state.selectedCharacter.notes.findIndex(item => item.id === result.id);
    if (index > -1) {
      Object.keys(state.selectedCharacter.notes[index]).forEach(key => {
        state.selectedCharacter.notes[index][key] = result[key];
      });
    }
  }
};

const deleteCharacterNote = (state, payload) => {
  if (payload && typeof payload === 'object') {
    const obj = payload.data;
    if (obj.value && obj.collectionPath) {
      const index = state.selectedCharacter.notes.findIndex(item => item.id === obj.id);
      if (index > -1) {
        const item = state.selectedCharacter.notes[index];
        state.selectedCharacter.notes.splice(index, 1);
        deleteDocumentFromCurrentUser(obj.collectionPath, item.id);
      }
    }
  }
};

const addCharacterArmor = (state, payload) => {
  if (payload && typeof payload === 'object') {
    const obj = payload.data;
    if (payload.collectionPath) {
      writeNewObjToCurrentUser(payload.collectionPath, obj).then((id) => {
        obj.id = id;
        state.selectedCharacter.armor.push(obj);
      });
    }
  }
};

const updateCharacterArmor = (state, payload) => {
  if (payload && typeof payload === 'object') {
    const result = {};
    payload.forEach(obj => {
      result[obj.key] = obj.value;
    });
    result.id = payload[0].id;

    const index = state.selectedCharacter.armor.findIndex(armor => armor.id === result.id);
    if (index > -1) {
      Object.keys(state.selectedCharacter.armor[index]).forEach(key => {
        state.selectedCharacter.armor[index][key] = result[key];
      });
    }
  }
};

const deleteCharacterArmor = (state, payload) => {
  if (payload && typeof payload === 'object') {
    const obj = payload.data;
    if (obj.value && obj.collectionPath) {
      const index = state.selectedCharacter.armor.findIndex(armor => armor.id === obj.id);
      if (index > -1) {
        const armor = state.selectedCharacter.armor[index];
        state.selectedCharacter.armor.splice(index, 1);
        deleteDocumentFromCurrentUser(obj.collectionPath, armor.id);
      }
    }
  }
};

const addCharacterWealth = (state, payload) => {
  if (payload && typeof payload === 'object') {
    const obj = {
      key: payload.data.Title,
      value: payload.data.Text,
    };
    if (payload.collectionPath) {
      writeNewObjToCurrentUser(payload.collectionPath, obj).then((id) => {
        obj.id = id;
        state.selectedCharacter.wealth.push(obj);
      });
    }
  }
};

const updateCharacterWealth = (state, payload) => {
  if (payload && typeof payload === 'object') {
    const result = {};
    payload.forEach(obj => {
      if (obj.key !== 'fieldName') {
        result[obj.key] = obj.value;
      }
    });
    result.id = payload[0].id;

    const index = state.selectedCharacter.wealth.findIndex(item => item.id === result.id);
    if (index > -1) {
      Object.keys(state.selectedCharacter.wealth[index]).forEach(key => {
        state.selectedCharacter.wealth[index][key] = result[key];
      });
    }
  }
};

const deleteCharacterWealth = (state, payload) => {
  if (payload && typeof payload === 'object') {
    const obj = payload.data;
    if (obj.value && obj.collectionPath) {
      const index = state.selectedCharacter.wealth.findIndex(item => item.id === obj.id);
      if (index > -1) {
        const item = state.selectedCharacter.wealth[index];
        state.selectedCharacter.wealth.splice(index, 1);
        deleteDocumentFromCurrentUser(obj.collectionPath, item.id);
      }
    }
  }
};

const updateLanguage = (state, payload) => {
  if (payload && typeof payload === 'object') {
    const obj = payload.data;
    if (obj.value) {
      state.settings.language = obj.value;
    }
  }
};

const updateRole = (state, payload) => {
  if (payload && typeof payload === 'object') {
    const obj = payload.data;
    if (obj.value) {
      state.settings.role = obj.value;
    }
  }
};

const updateSettingsId = (state, payload) => {
  if (payload && typeof payload === 'object') {
    const obj = payload.data;
    if (obj.value) {
      state.settings.id = obj.value;
    }
  }
};

const updateUserDisplayName = (state, payload) => {
  if (payload && typeof payload === 'object') {
    const obj = payload.data;
    if (obj.value) {
      state.settings.displayName = obj.value;
    }
  }
};

const updateUserEmail = (state, payload) => {
  if (payload && typeof payload === 'object') {
    const obj = payload.data;
    if (obj.value) {
      state.settings.email = obj.value;
    }
  }
};

// Export mutations
export default {
  // User character
  setCharacterList,
  setSelectedCharacter,
  setCharacterClicked,

  updateCharacterInfo,
  updateCharacterStats,

  addCharacterInventoryItem,
  updateCharacterInventoryItem,
  deleteCharacterInventoryItem,

  addCharacterSkill,
  updateCharacterSkill,
  deleteCharacterSkill,

  addCharacterNote,
  updateCharacterNote,
  deleteCharacterNote,

  addCharacterArmor,
  updateCharacterArmor,
  deleteCharacterArmor,

  addCharacterWealth,
  updateCharacterWealth,
  deleteCharacterWealth,

  // User settings
  updateLanguage,
  updateRole,
  updateSettingsId,
  updateUserDisplayName,
  updateUserEmail,
};
