const randomNumberWithinRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const rollDieT4 = () => randomNumberWithinRange(1, 4);
const rollDieT6 = () => randomNumberWithinRange(1, 6);
const rollDieT8 = () => randomNumberWithinRange(1, 8);
const rollDieT12 = () => randomNumberWithinRange(1, 12);
const rollDieT20 = () => randomNumberWithinRange(1, 20);
const rollDieT100 = () => randomNumberWithinRange(1, 100);

const rollDie = (die, min, max) => {
  switch (die) {
    case 'T4':
      return { 
        die: 'T4',
        value: rollDieT4(),
      };
    case 'T6':
      return { 
        die: 'T6',
        value: rollDieT6(),
      };
    case 'T8':
      return { 
        die: 'T8',
        value: rollDieT8(),
      };
    case 'T12':
      return { 
        die: 'T12',
        value: rollDieT12(),
      };
    case 'T20':
      return { 
        die: 'T20',
        value: rollDieT20(),
      };
    case 'T100':
      return { 
        die: 'T100',
        value: rollDieT100(),
      };
  }
  return max ? {
    die: 'custom die',
    value: randomNumberWithinRange(min, max),
  } : {
    die: 'null',
    value: 0,
  };
};

// Export randomNumberGenerator methods
export {
  randomNumberWithinRange,
  rollDieT4,
  rollDieT6,
  rollDieT8,
  rollDieT12,
  rollDieT20,
  rollDieT100,
  rollDie,
};
