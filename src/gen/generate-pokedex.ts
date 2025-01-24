import { Pokemon } from '@/types';
import { promises as fs } from 'fs';
import path from 'path';

const POKEMON_COUNT = 1025;

async function generatePokeDex(): Promise<Pokemon[]> {
  var pokemon: Pokemon[] = [];

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_COUNT}&offset=0`
    );
    if (!response.ok) {
      throw new Error('Error in fetching all pokemon');
    }

    const data = await response.json();

    for (const key in data.results) {
      const pokemonResponse = await fetch(data.results[key].url);
      if (!pokemonResponse.ok) {
        throw new Error('Response error');
      }

      const pokemonData = await pokemonResponse.json();

      pokemon.push({
        abilities: pokemonData.abilities,
        forms: pokemonData.forms,
        id: pokemonData.id,
        moves: [],
        name: pokemonData.name,
        species: pokemonData.species,
        sprites: {
          back_default: pokemonData.sprites.back_default,
          back_female: pokemonData.sprites.back_female,
          back_shiny: pokemonData.sprites.back_shiny,
          back_shiny_female: pokemonData.sprites.back_shiny_female,
          front_default: pokemonData.sprites.front_default,
          front_female: pokemonData.sprites.front_female,
          front_shiny: pokemonData.sprites.front_shiny,
          front_shiny_female: pokemonData.sprites.front_shiny_female,
        },
        stats: {
          hp: pokemonData.stats[0].base_stat,
          attack: pokemonData.stats[1].base_stat,
          defense: pokemonData.stats[2].base_stat,
          special_attack: pokemonData.stats[3].base_stat,
          special_defense: pokemonData.stats[4].base_stat,
          speed: pokemonData.stats[5].base_stat,
        },
        EV: {
          hp: pokemonData.stats[0].effort,
          attack: pokemonData.stats[1].effort,
          defense: pokemonData.stats[2].effort,
          special_attack: pokemonData.stats[3].effort,
          special_defense: pokemonData.stats[4].effort,
          speed: pokemonData.stats[5].effort,
        },
        types: [
          pokemonData.types[0].type.name.toUpperCase(),
          pokemonData.types[1] ? pokemonData.types[1].type.name.toUpperCase() : undefined,
        ],
        weight: pokemonData.weight,
        height: pokemonData.height,
      });
    }
  } catch (err) {
    console.log(err);
  }

  return pokemon;
}

const pokedex = await generatePokeDex();

var fileData = '{\n';

for (var i = 0; i < pokedex.length; i++) {
  fileData += `\t"${pokedex[i].id}":\n\t${JSON.stringify(pokedex[i])}${
    i + 1 === pokedex.length ? '' : ','
  }\n`;
}

fileData += '\n}';

fs.writeFile(path.resolve(path.join(...['.', 'public', 'data', 'pokedex.json'])), fileData);
