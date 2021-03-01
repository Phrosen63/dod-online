const resetAllCharactersClicked = (context) => {
  context.state.characterList.forEach((char) => {
    char.clicked = false;
  });
};

export default {
  resetAllCharactersClicked,
};
