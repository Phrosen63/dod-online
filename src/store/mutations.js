const setUser = (state, payload)  => {
  state.user = payload;
};

const setCustomDiceRoll = (state, payload)  => {
  if (payload && typeof payload === 'object' && payload.message) {
    state.customDiceRoll = payload;
  }
};

const setCharacterNoteAdded = (state, payload)  => {
  if (payload && typeof payload === 'object') {
    state.characterNoteAdded = payload;
  }
};

const setCharacterNoteSaved = (state, payload)  => {
  if (payload && typeof payload === 'object') {
    state.characterNoteSaved = payload;
  }
};

const setCharacterNoteDeleted = (state, payload)  => {
  if (payload && typeof payload === 'object') {
    state.characterNoteDeleted = payload;
  }
};

const setInventoryItemAdded = (state, payload)  => {
  if (payload && typeof payload === 'object') {
    state.inventoryItemAdded = payload;
  }
};

const setInventoryItemSaved = (state, payload)  => {
  if (payload && typeof payload === 'object') {
    state.inventoryItemSaved = payload;
  }
};

const setInventoryItemDeleted = (state, payload)  => {
  if (payload && typeof payload === 'object') {
    state.inventoryItemDeleted = payload;
  }
};

const setCharacterSkillAdded = (state, payload)  => {
  if (payload && typeof payload === 'object') {
    state.characterSkillAdded = payload;
  }
};

const setCharacterSkillSaved = (state, payload)  => {
  if (payload && typeof payload === 'object') {
    state.characterSkillSaved = payload;
  }
};

const setCharacterSkillDeleted = (state, payload)  => {
  if (payload && typeof payload === 'object') {
    state.characterSkillDeleted = payload;
  }
};

export default {
  setUser,
  setCustomDiceRoll,

  setCharacterNoteSaved,
  setCharacterNoteAdded,
  setCharacterNoteDeleted,

  setInventoryItemAdded,
  setInventoryItemSaved,
  setInventoryItemDeleted,

  setCharacterSkillAdded,
  setCharacterSkillSaved,
  setCharacterSkillDeleted,
};
