const randomNumberWithinRange = (min, max) => {
  return max > min ? Math.floor(Math.random() * (max - min + 1)) + min : 
    Math.floor(Math.random() * (min - max + 1)) + max;
};

const rollDieT3 = () => randomNumberWithinRange(1, 3);
const rollDieT4 = () => randomNumberWithinRange(1, 4);
const rollDieT6 = () => randomNumberWithinRange(1, 6);
const rollDieT8 = () => randomNumberWithinRange(1, 8);
const rollDieT10 = () => randomNumberWithinRange(1, 10);
const rollDieT12 = () => randomNumberWithinRange(1, 12);
const rollDieT20 = () => randomNumberWithinRange(1, 20);
const rollDieT100 = () => randomNumberWithinRange(1, 100);

const rollDie = (die, min, max) => {
  switch (die) {
    case 'T3':
      return { 
        die: 'T3',
        value: rollDieT3(),
      };
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
    case 'T10':
      return { 
        die: 'T10',
        value: rollDieT10(),
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

const rollDice = ({ amount, type, min, max, bonus }) => {
  const eachResult = [];
  let combinedResult = 0;

  let cleanAmount = amount ? parseInt(amount) : 1;
  let cleanMin = min ? parseInt(min) : 1;
  let cleanMax = max ? parseInt(max) : 1;
  let cleanBonus = bonus ? parseInt(bonus) : 0;

  for (var i = 0; i < cleanAmount; i += 1) {
    const result = rollDie(type, cleanMin, cleanMax);
    const value = parseInt(result.value);
    combinedResult += value;
    eachResult.push(value);
  }
  combinedResult += cleanBonus;

  return {
    combinedResult,
    eachResult,
  };
}

// Export randomNumberGenerator methods
export {
  randomNumberWithinRange,
  rollDieT3,
  rollDieT4,
  rollDieT6,
  rollDieT8,
  rollDieT10,
  rollDieT12,
  rollDieT20,
  rollDieT100,
  rollDie,
  rollDice,
};
