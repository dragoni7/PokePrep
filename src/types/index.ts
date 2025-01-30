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
  abilities: PokemonAbility[];
  forms: any;
  id: number;
  moves: {
    name: string;
    versionGroupDetails: {
      levelLearned: number;
      learnMethod:
        | 'machine'
        | 'level-up'
        | 'egg'
        | 'tutor'
        | 'light-ball-egg'
        | 'form-change'
        | 'zygarde-cube';
      versionGroup: string;
    }[];
  }[];
  name: string;
  species: any;
  icon: string;
  shinyIcon: string;
  stats: PokemonStats;
  EV: PokemonStats;
  types: [SingleType, SingleType | undefined];
  weight: number;
  height: number;
};

export type PokemonStats = {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
};

export type PokemonAbility = {
  name: string;
  hidden: boolean;
};

export type AbilityDef = {
  name: string;
  flavorText: string;
  description: string;
  pokemon: string[];
};

export type MoveDef = {
  name: string;
  flavorText: string;
  ailment: string;
  ailmentChance: number;
  moveCategory:
    | 'damage'
    | 'ailment'
    | 'net-good-stats'
    | 'heal'
    | 'damage+ailment'
    | 'swagger'
    | 'damage+lower'
    | 'damage+raise'
    | 'damage+heal'
    | 'ohko'
    | 'whole-field-effect'
    | 'field-effect'
    | 'force-switch'
    | 'unique'
    | null;
  accuracy: number | null;
  power: number | null;
  pp: number;
  priority: number;
  critRate: number;
  drain: number;
  flinchChange: number;
  healing: number;
  maxHits: number | null;
  maxTurns: number | null;
  minHits: number | null;
  minTurns: number | null;
  statChance: number;
  damageClass: 'status' | 'physical' | 'special';
  type: SingleType;
  pokemon: string[];
};
