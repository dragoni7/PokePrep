import { PokeType } from '@/gen/generated-types';

export type SingleType =
  | 'NORMAL'
  | 'FIRE'
  | 'WATER'
  | 'ELECTRIC'
  | 'GRASS'
  | 'ICE'
  | 'FIGHTING'
  | 'POISON'
  | 'GROUND'
  | 'FLYING'
  | 'PSYCHIC'
  | 'BUG'
  | 'ROCK'
  | 'GHOST'
  | 'DRAGON'
  | 'DARK'
  | 'STEEL'
  | 'FAIRY';

export type TypeColor = {
  NORMAL: string;
  FIRE: string;
  WATER: string;
  ELECTRIC: string;
  GRASS: string;
  ICE: string;
  FIGHTING: string;
  POISON: string;
  GROUND: string;
  FLYING: string;
  PSYCHIC: string;
  BUG: string;
  ROCK: string;
  GHOST: string;
  DRAGON: string;
  DARK: string;
  STEEL: string;
  FAIRY: string;
};

export type TypeResults = {
  '0': PokeType[];
  '0.25': PokeType[];
  '0.5': PokeType[];
  '1': PokeType[];
  '2': PokeType[];
  '4': PokeType[];
};

export type Pokemon = {
  abilities: any[];
  forms: any;
  id: number;
  moves: any[];
  name: string;
  species: any;
  sprites: {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
  };
  stats: {
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
  };
  EV: {
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
  };
  types: [SingleType, SingleType | undefined];
  weight: number;
  height: number;
};
