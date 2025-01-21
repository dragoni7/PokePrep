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

export type TypeResults = {
  '0': PokeType[];
  '0.25': PokeType[];
  '0.5': PokeType[];
  '1': PokeType[];
  '2': PokeType[];
  '4': PokeType[];
};
