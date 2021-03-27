// Modules
import { deleteDocument } from '@/api/database/delete';
import { writeObject, writeNewObject } from '@/api/database/write';

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

const addObject = (state, payload) => {
  if (payload && typeof payload === 'object') {
    const obj = payload.data;

    if (payload.extras) {
      payload.extras.forEach(extra => {
        obj[extra.key] = extra.value;
      });
    }

    if (payload.collectionPath) {
      writeNewObject({
        collectionPath: payload.collectionPath,
        data: obj,
      }).then((id) => {
        obj.id = id;

        if (payload.stateTarget) {
          payload.stateTarget.push(obj);
        }
      });
    }
  }
};

const updateObject = (state, payload) => {
  if (payload && typeof payload === 'object') {
    if (payload.stateTarget && payload.id) {
      const target = payload.stateTarget.find(item => item.id === payload.id);

      if (target && payload.collectionPath) {
        const source = { ...target, ...payload.data };
        Object.keys(target).forEach(key => {
          target[key] = source[key];
        });

        writeObject({
          collectionPath: payload.collectionPath,
          document: payload.id,
          data: target,
        });
      }
    }
  }
}

const deleteObject = (state, payload) => {
  if (payload && typeof payload === 'object') {
    const index = payload.stateTarget.findIndex(item => item.id === payload.id);

    if (index > -1) {
      payload.stateTarget.splice(index, 1);

      deleteDocument({
        collectionPath: payload.collectionPath,
        docId: payload.id,
      });
    }
  }
};

const setError = (state, payload) => {
  if (payload && typeof payload === 'object') {
    state.error = payload;
  }
};

const resetError = (state) => {
  state.error.hasError = false;
  state.error.message = null;
};

// Export mutations
export default {
  // User character
  setCharacterList,
  setSelectedCharacter,

  updateCharacterInfo,
  updateCharacterStats,

  // User settings
  updateLanguage,
  updateRole,
  updateSettingsId,
  updateUserDisplayName,
  updateUserEmail,

  // General
  addObject,
  updateObject,
  deleteObject,

  // Error handling
  setError,
  resetError,
};
