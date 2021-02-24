const setUser = (state, payload)  => {
  state.user = payload;
};

const setCustomDiceRoll = (state, payload)  => {
  if (payload && typeof payload === 'object' && payload.message) {
    state.customDiceRoll = payload;
  }
};

const setCharacterNoteSaved = (state, payload)  => {
  if (payload && typeof payload === 'object') {
    state.characterNoteSaved = payload;
  }
};

const setCharacterNoteAdded = (state, payload)  => {
  if (payload && typeof payload === 'object') {
    state.characterNoteAdded = payload;
  }
};

const setCharacterNoteDeleted = (state, payload)  => {
  if (payload && typeof payload === 'object') {
    state.characterNoteDeleted = payload;
  }
};

const setInventoryItemSaved = (state, payload)  => {
  if (payload && typeof payload === 'object') {
    state.inventoryItemSaved = payload;
  }
};

const setInventoryItemAdded = (state, payload)  => {
  if (payload && typeof payload === 'object') {
    state.inventoryItemAdded = payload;
  }
};

const setInventoryItemDeleted = (state, payload)  => {
  if (payload && typeof payload === 'object') {
    state.inventoryItemDeleted = payload;
  }
};

export default {
  setUser,
  setCustomDiceRoll,
  setCharacterNoteSaved,
  setCharacterNoteAdded,
  setCharacterNoteDeleted,
  setInventoryItemSaved,
  setInventoryItemAdded,
  setInventoryItemDeleted,
};
