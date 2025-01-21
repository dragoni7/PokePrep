import { PokeType } from '@/generated/generated-types';

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
