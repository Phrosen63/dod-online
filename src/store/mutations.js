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

const setCharacterNoteAdded = (state, payload)  => {
  state.characterNoteAdded = payload;
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

const setInventoryItemDeleted = (state, payload)  => {
  state.inventoryItemDeleted = payload;
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
