const setUser = (state, payload)  => {
  state.user = payload;
};

const setCustomDiceRoll = (state, payload)  => {
  if (payload && typeof payload === 'object' && payload.message) {
    state.customDiceRoll = payload;
  }
};

const setCharacterNoteSaved = (state, payload)  => {
  state.characterNoteSaved = payload;
};

const setCharacterNoteDeleted = (state, payload)  => {
  state.characterNoteDeleted = payload;
};

const setInventoryItemSaved = (state, payload)  => {
  state.inventoryItemSaved = payload;
};

const setInventoryItemAdded = (state, payload)  => {
  state.inventoryItemAdded = payload;
};

export default {
  setUser,
  setCustomDiceRoll,
  setCharacterNoteSaved,
  setCharacterNoteDeleted,
  setInventoryItemSaved,
  setInventoryItemAdded,
};
