import { AbilityDef, Pokemon, PokemonAbility } from '@/types';
import { promises as fs } from 'fs';
import path from 'path';

const POKEMON_COUNT = 1025;
const ABILITY_COUNT = 367;

async function generatePokemonAbilities(): Promise<AbilityDef[]> {
  var abilities: AbilityDef[] = [];

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/ability?limit=${ABILITY_COUNT}&offset=0`
    );
    if (!response.ok) {
      throw new Error('Error in fetching all abilities');
    }

    const data = await response.json();

    for (const key in data.results) {
      const abilityResponse = await fetch(data.results[key].url);
      if (!abilityResponse.ok) {
        throw new Error('Ability response error');
      }

      const abilityData = await abilityResponse.json();

      abilities.push({
        name: abilityData.name,
        flavorText:
          abilityData['flavor_text_entries'].findLast((e: any) => e.language.name === 'en')
            ?.flavor_text || '',
        description:
          abilityData['effect_entries'].findLast((e: any) => e.language.name === 'en')?.effect ||
          '',
        pokemon: abilityData.pokemon.map((p: any): string => {
          return p.pokemon.name;
        }),
      });
    }
  } catch (err) {
    console.log(err);
  }

  return abilities;
}

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
        throw new Error('Pokemno response error');
      }

      const pokemonData = await pokemonResponse.json();

      pokemon.push({
        abilities: pokemonData.abilities.map((entry: any): PokemonAbility => {
          return { name: entry.ability.name, hidden: entry.is_hidden };
        }),
        forms: pokemonData.forms,
        id: pokemonData.id,
        moves: [],
        name: pokemonData.name,
        species: pokemonData.species,
        icon: pokemonData.sprites.other['official-artwork'].front_default,
        shinyIcon: pokemonData.sprites.other['official-artwork'].front_shiny,
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

fs.writeFile(path.resolve(path.join(...['.', 'public', 'pokedex.json'])), fileData);

/*-----------------------------------------------------------------------------------*/

const abilities = await generatePokemonAbilities();

var fileData = '{\n';

for (var i = 0; i < abilities.length; i++) {
  fileData += `\t"${abilities[i].name}":\n\t${JSON.stringify(abilities[i])}${
    i + 1 === abilities.length ? '' : ','
  }\n`;
}

fileData += '\n}';

fs.writeFile(path.resolve(path.join(...['.', 'public', 'abilities.json'])), fileData);
