import { SingleType } from '@/types';
import { TYPES } from '@/util/types';
import { promises as fs } from 'fs';
import path from 'path';

function generatePokeTypes(): string[] {
  var dualTypes: string[] = [];
  var results = TYPES as string[];
  for (var i = 0; i < TYPES.length; i++) {
    for (var j = i + 1; j < TYPES.length; j++) {
      dualTypes.push(TYPES[i] + '_' + TYPES[j]);
    }
  }

  return results.concat(dualTypes);
}

function generateTypeChart() {
  const typeChart = {
    NORMAL: {
      NORMAL: 1.0,
      FIRE: 1.0,
      WATER: 1.0,
      ELECTRIC: 1.0,
      GRASS: 1.0,
      ICE: 1.0,
      FIGHTING: 1.0,
      POISON: 1.0,
      GROUND: 1.0,
      FLYING: 1.0,
      PSYCHIC: 1.0,
      BUG: 1.0,
      ROCK: 0.5,
      GHOST: 0,
      DRAGON: 1.0,
      DARK: 1.0,
      STEEL: 0.5,
      FAIRY: 1.0,
    },
    FIRE: {
      NORMAL: 1.0,
      FIRE: 0.5,
      WATER: 0.5,
      ELECTRIC: 1.0,
      GRASS: 2.0,
      ICE: 2.0,
      FIGHTING: 1.0,
      POISON: 1.0,
      GROUND: 1.0,
      FLYING: 1.0,
      PSYCHIC: 1.0,
      BUG: 2.0,
      ROCK: 0.5,
      GHOST: 1.0,
      DRAGON: 0.5,
      DARK: 1.0,
      STEEL: 2.0,
      FAIRY: 1.0,
    },
    WATER: {
      NORMAL: 1.0,
      FIRE: 2.0,
      WATER: 0.5,
      ELECTRIC: 1.0,
      GRASS: 0.5,
      ICE: 1.0,
      FIGHTING: 1.0,
      POISON: 1.0,
      GROUND: 2.0,
      FLYING: 1.0,
      PSYCHIC: 1.0,
      BUG: 1.0,
      ROCK: 2.0,
      GHOST: 1.0,
      DRAGON: 0.5,
      DARK: 1.0,
      STEEL: 1.0,
      FAIRY: 1.0,
    },
    ELECTRIC: {
      NORMAL: 1.0,
      FIRE: 1.0,
      WATER: 2.0,
      ELECTRIC: 0.5,
      GRASS: 0.5,
      ICE: 1.0,
      FIGHTING: 1.0,
      POISON: 1.0,
      GROUND: 0,
      FLYING: 2.0,
      PSYCHIC: 1.0,
      BUG: 1.0,
      ROCK: 1.0,
      GHOST: 1.0,
      DRAGON: 0.5,
      DARK: 1.0,
      STEEL: 1.0,
      FAIRY: 1.0,
    },
    GRASS: {
      NORMAL: 1.0,
      FIRE: 0.5,
      WATER: 2.0,
      ELECTRIC: 1.0,
      GRASS: 0.5,
      ICE: 1.0,
      FIGHTING: 1.0,
      POISON: 0.5,
      GROUND: 2.0,
      FLYING: 0.5,
      PSYCHIC: 1.0,
      BUG: 0.5,
      ROCK: 2.0,
      GHOST: 1.0,
      DRAGON: 0.5,
      DARK: 1.0,
      STEEL: 0.5,
      FAIRY: 1.0,
    },
    ICE: {
      NORMAL: 1.0,
      FIRE: 0.5,
      WATER: 0.5,
      ELECTRIC: 1.0,
      GRASS: 2.0,
      ICE: 0.5,
      FIGHTING: 1.0,
      POISON: 1.0,
      GROUND: 2.0,
      FLYING: 2.0,
      PSYCHIC: 1.0,
      BUG: 1.0,
      ROCK: 1.0,
      GHOST: 1.0,
      DRAGON: 2.0,
      DARK: 1.0,
      STEEL: 0.5,
      FAIRY: 1.0,
    },
    FIGHTING: {
      NORMAL: 2.0,
      FIRE: 1.0,
      WATER: 1.0,
      ELECTRIC: 1.0,
      GRASS: 1.0,
      ICE: 2.0,
      FIGHTING: 1.0,
      POISON: 0.5,
      GROUND: 1.0,
      FLYING: 0.5,
      PSYCHIC: 0.5,
      BUG: 0.5,
      ROCK: 2.0,
      GHOST: 0,
      DRAGON: 1.0,
      DARK: 2.0,
      STEEL: 2.0,
      FAIRY: 0.5,
    },
    POISON: {
      NORMAL: 1.0,
      FIRE: 1.0,
      WATER: 1.0,
      ELECTRIC: 1.0,
      GRASS: 2.0,
      ICE: 1.0,
      FIGHTING: 1.0,
      POISON: 0.5,
      GROUND: 0.5,
      FLYING: 1.0,
      PSYCHIC: 1.0,
      BUG: 1.0,
      ROCK: 0.5,
      GHOST: 0.5,
      DRAGON: 1.0,
      DARK: 1.0,
      STEEL: 0,
      FAIRY: 2.0,
    },
    GROUND: {
      NORMAL: 1.0,
      FIRE: 2.0,
      WATER: 1.0,
      ELECTRIC: 2.0,
      GRASS: 0.5,
      ICE: 1.0,
      FIGHTING: 1.0,
      POISON: 2.0,
      GROUND: 1.0,
      FLYING: 0,
      PSYCHIC: 1.0,
      BUG: 0.5,
      ROCK: 2.0,
      GHOST: 1.0,
      DRAGON: 1.0,
      DARK: 1.0,
      STEEL: 2.0,
      FAIRY: 1.0,
    },
    FLYING: {
      NORMAL: 1.0,
      FIRE: 1.0,
      WATER: 1.0,
      ELECTRIC: 0.5,
      GRASS: 2.0,
      ICE: 1.0,
      FIGHTING: 2.0,
      POISON: 1.0,
      GROUND: 1.0,
      FLYING: 1.0,
      PSYCHIC: 1.0,
      BUG: 2.0,
      ROCK: 0.5,
      GHOST: 1.0,
      DRAGON: 1.0,
      DARK: 1.0,
      STEEL: 0.5,
      FAIRY: 1.0,
    },
    PSYCHIC: {
      NORMAL: 1.0,
      FIRE: 1.0,
      WATER: 1.0,
      ELECTRIC: 1.0,
      GRASS: 1.0,
      ICE: 1.0,
      FIGHTING: 2.0,
      POISON: 2.0,
      GROUND: 1.0,
      FLYING: 1.0,
      PSYCHIC: 0.5,
      BUG: 1.0,
      ROCK: 1.0,
      GHOST: 1.0,
      DRAGON: 1.0,
      DARK: 0,
      STEEL: 0.5,
      FAIRY: 1.0,
    },
    BUG: {
      NORMAL: 1.0,
      FIRE: 0.5,
      WATER: 1.0,
      ELECTRIC: 1.0,
      GRASS: 2.0,
      ICE: 1.0,
      FIGHTING: 0.5,
      POISON: 0.5,
      GROUND: 1.0,
      FLYING: 0.5,
      PSYCHIC: 2.0,
      BUG: 1.0,
      ROCK: 1.0,
      GHOST: 0.5,
      DRAGON: 1.0,
      DARK: 2.0,
      STEEL: 0.5,
      FAIRY: 0.5,
    },
    ROCK: {
      NORMAL: 1.0,
      FIRE: 2.0,
      WATER: 1.0,
      ELECTRIC: 1.0,
      GRASS: 1.0,
      ICE: 2.0,
      FIGHTING: 0.5,
      POISON: 1.0,
      GROUND: 0.5,
      FLYING: 2.0,
      PSYCHIC: 1.0,
      BUG: 2.0,
      ROCK: 1.0,
      GHOST: 1.0,
      DRAGON: 1.0,
      DARK: 1.0,
      STEEL: 0.5,
      FAIRY: 1.0,
    },
    GHOST: {
      NORMAL: 0,
      FIRE: 1.0,
      WATER: 1.0,
      ELECTRIC: 1.0,
      GRASS: 1.0,
      ICE: 1.0,
      FIGHTING: 1.0,
      POISON: 1.0,
      GROUND: 1.0,
      FLYING: 1.0,
      PSYCHIC: 2.0,
      BUG: 1.0,
      ROCK: 1.0,
      GHOST: 2.0,
      DRAGON: 1.0,
      DARK: 0.5,
      STEEL: 1.0,
      FAIRY: 1.0,
    },
    DRAGON: {
      NORMAL: 1.0,
      FIRE: 1.0,
      WATER: 1.0,
      ELECTRIC: 1.0,
      GRASS: 1.0,
      ICE: 1.0,
      FIGHTING: 1.0,
      POISON: 1.0,
      GROUND: 1.0,
      FLYING: 1.0,
      PSYCHIC: 1.0,
      BUG: 1.0,
      ROCK: 1.0,
      GHOST: 1.0,
      DRAGON: 2.0,
      DARK: 1.0,
      STEEL: 0.5,
      FAIRY: 0.0,
    },
    DARK: {
      NORMAL: 1.0,
      FIRE: 1.0,
      WATER: 1.0,
      ELECTRIC: 1.0,
      GRASS: 1.0,
      ICE: 1.0,
      FIGHTING: 0.5,
      POISON: 1.0,
      GROUND: 1.0,
      FLYING: 1.0,
      PSYCHIC: 2.0,
      BUG: 1.0,
      ROCK: 1.0,
      GHOST: 2.0,
      DRAGON: 1.0,
      DARK: 0.5,
      STEEL: 1.0,
      FAIRY: 0.5,
    },
    STEEL: {
      NORMAL: 1.0,
      FIRE: 0.5,
      WATER: 0.5,
      ELECTRIC: 0.5,
      GRASS: 1.0,
      ICE: 2.0,
      FIGHTING: 1.0,
      POISON: 1.0,
      GROUND: 1.0,
      FLYING: 1.0,
      PSYCHIC: 1.0,
      BUG: 1.0,
      ROCK: 2.0,
      GHOST: 1.0,
      DRAGON: 1.0,
      DARK: 1.0,
      STEEL: 0.5,
      FAIRY: 2.0,
    },
    FAIRY: {
      NORMAL: 1.0,
      FIRE: 0.5,
      WATER: 1.0,
      ELECTRIC: 1.0,
      GRASS: 1.0,
      ICE: 1.0,
      FIGHTING: 2.0,
      POISON: 0.5,
      GROUND: 1.0,
      FLYING: 1.0,
      PSYCHIC: 1.0,
      BUG: 1.0,
      ROCK: 1.0,
      GHOST: 1.0,
      DRAGON: 2.0,
      DARK: 2.0,
      STEEL: 0.5,
      FAIRY: 1.0,
    },
  };

  Object.entries(typeChart).forEach(([_, value]) => {
    for (var i = 0; i < TYPES.length; i++) {
      for (var j = i + 1; j < TYPES.length; j++) {
        const v: number = value[TYPES[i] as SingleType] * value[TYPES[j] as SingleType];

        Object.assign(value, { [TYPES[i] + '_' + TYPES[j]]: v });
      }
    }
  });

  return typeChart;
}

const pokeTypes = generatePokeTypes();

var fileData = 'export type PokeType = \n';

for (const type of pokeTypes) {
  fileData += `| '` + type + `'\n`;
}

fileData += '\n';

fileData += 'export type TypeEffectiveness = {\n';

for (const type of pokeTypes) {
  fileData += type + ': number;\n';
}

fileData += '}\n';

fileData += 'export type EffectivenessChart = {\n';

for (const type of TYPES) {
  fileData += type + ': TypeEffectiveness;\n';
}

fileData += '}';

fs.writeFile(path.resolve(path.join(...['.', 'src', 'generated', 'generated-types.ts'])), fileData);

/*----------------------------------------------------------------------------------------------*/

const typeChart = generateTypeChart();

fileData = `import { EffectivenessChart } from "./generated-types";\n\nexport const TYPE_CHART: EffectivenessChart = ${JSON.stringify(
  typeChart
)}`;

fs.writeFile(
  path.resolve(path.join(...['.', 'src', 'generated', 'generated-type-chart.ts'])),
  fileData
);
