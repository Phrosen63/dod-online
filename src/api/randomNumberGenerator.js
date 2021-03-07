const randomNumberWithinRange = (min, max) => {
  return max > min ? Math.floor(Math.random() * (max - min + 1)) + min : 
    Math.floor(Math.random() * (min - max + 1)) + max;
};

const rollDieD3 = () => randomNumberWithinRange(1, 3);
const rollDieD4 = () => randomNumberWithinRange(1, 4);
const rollDieD6 = () => randomNumberWithinRange(1, 6);
const rollDieD8 = () => randomNumberWithinRange(1, 8);
const rollDieD10 = () => randomNumberWithinRange(1, 10);
const rollDieD12 = () => randomNumberWithinRange(1, 12);
const rollDieD20 = () => randomNumberWithinRange(1, 20);
const rollDieD100 = () => randomNumberWithinRange(1, 100);

const rollDie = (die, min, max) => {
  const cleanedDie = die.replace(/T/g, 'D');
  switch (cleanedDie) {
    case 'D3':
      return { 
        die: 'T3',
        value: rollDieD3(),
      };
    case 'D4':
      return { 
        die: 'T4',
        value: rollDieD4(),
      };
    case 'D6':
      return { 
        die: 'T6',
        value: rollDieD6(),
      };
    case 'D8':
      return { 
        die: 'T8',
        value: rollDieD8(),
      };
    case 'D10':
      return { 
        die: 'T10',
        value: rollDieD10(),
      };
    case 'D12':
      return { 
        die: 'T12',
        value: rollDieD12(),
      };
    case 'D20':
      return { 
        die: 'T20',
        value: rollDieD20(),
      };
    case 'D100':
      return { 
        die: 'T100',
        value: rollDieD100(),
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
  rollDieD3,
  rollDieD4,
  rollDieD6,
  rollDieD8,
  rollDieD10,
  rollDieD12,
  rollDieD20,
  rollDieD100,
  rollDie,
  rollDice,
};
