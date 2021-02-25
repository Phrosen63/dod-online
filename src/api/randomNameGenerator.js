import { randomNumberWithinRange } from '@/api/randomNumberGenerator';

const prefixes = [
  'deadly',
  'slow',
  'sly',
  'scared',
  'craven',
  'simple',
  'brave',
  'curious',
  'easily-excited',
  'smelly',
  'weak',
  'strong',
  'bold',
  'glorious',
  'escaped',
  'little',
  'big',
  'fat',
  'skinny',
  'outrageous',
  'snivelling',
  'feeble',
  'mighty',
  'generous',
];

const suffixes = [
  'raven',
  'cat',
  'orc',
  'moron',
  'peasant',
  'king',
  'queen',
  'lord',
  'lady',
  'warrior',
  'wizard',
  'end-boss',
  'giraffe',
  'eagle',
  'bear',
  'wolf',
  'nobody',
  'elf',
  'dwarf',
  'hobbit',
  'angel',
  'demon',
  'vampire',
  'prisoner',
  'aristocrat',
  'carpenter',
  'shopkeeper',
  'tavernkeep',
  'mayor',
  'bastard',
  'jester',
];

const generateName = () => {
  let rand = randomNumberWithinRange(1, prefixes.length) -1;
  const prefix = prefixes[rand];
  
  rand = randomNumberWithinRange(1, suffixes.length) -1;
  const suffix = suffixes[rand];

  return `The ${prefix} ${suffix}`;
};

// Export method
export {
  generateName,
};
