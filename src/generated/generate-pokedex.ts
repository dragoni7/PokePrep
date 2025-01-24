import { PokemonClient, NamedAPIResource, Pokemon } from 'pokenode-ts';
import { promises as fs } from 'fs';
import path from 'path';

async function generatePokeDex(): Promise<Pokemon[]> {
  const api = new PokemonClient();
  var entries: NamedAPIResource[] = [];
  await api
    .listPokemons(0, 1025) // 1025
    .then((data) => (entries = data.results))
    .catch((error) => console.log(error));

  var pokemon: Pokemon[] = [];

  for (var resource of entries) {
    await api
      .getPokemonByName(resource.name)
      .then((data) => pokemon.push(data))
      .catch((error) => console.log(error));
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
