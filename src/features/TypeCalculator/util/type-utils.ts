import { TYPE_CHART } from '@/generated/generated-type-chart';
import { PokeType } from '@/generated/generated-types';
import { SingleType, TypeResults } from '@/types';

export function getDefensiveTypes(against: SingleType[]) {
  var results: TypeResults = {
    0: [],
    0.25: [],
    0.5: [],
    1: [],
    2: [],
    4: [],
  };

  if (!against[0]) return results;

  const firstEffectiveness = TYPE_CHART[against[0]];

  if (!against[1]) {
    results[0] = Object.keys(firstEffectiveness).filter((key) => {
      return firstEffectiveness[key as PokeType] === 0;
    }) as PokeType[];

    results[0.25] = Object.keys(firstEffectiveness).filter((key) => {
      return firstEffectiveness[key as PokeType] === 0.25;
    }) as PokeType[];

    results[0.5] = Object.keys(firstEffectiveness).filter((key) => {
      return firstEffectiveness[key as PokeType] === 0.5;
    }) as PokeType[];

    results[1] = Object.keys(firstEffectiveness).filter((key) => {
      return firstEffectiveness[key as PokeType] === 1;
    }) as PokeType[];

    results[2] = Object.keys(firstEffectiveness).filter((key) => {
      return firstEffectiveness[key as PokeType] === 2;
    }) as PokeType[];

    results[4] = Object.keys(firstEffectiveness).filter((key) => {
      return firstEffectiveness[key as PokeType] === 4;
    }) as PokeType[];

    return results;
  }

  const secondEffectiveness = TYPE_CHART[against[1]];

  results[0] = Object.keys(firstEffectiveness).filter((key) => {
    return firstEffectiveness[key as PokeType] === 0 && secondEffectiveness[key as PokeType] === 0;
  }) as PokeType[];

  results[0.25] = Object.keys(firstEffectiveness).filter((key) => {
    return (
      firstEffectiveness[key as PokeType] === 0.25 && secondEffectiveness[key as PokeType] === 0.25
    );
  }) as PokeType[];

  results[0.5] = Object.keys(firstEffectiveness).filter((key) => {
    return (
      firstEffectiveness[key as PokeType] === 0.5 && secondEffectiveness[key as PokeType] === 0.5
    );
  }) as PokeType[];

  results[1] = Object.keys(firstEffectiveness).filter((key) => {
    return firstEffectiveness[key as PokeType] === 1 && secondEffectiveness[key as PokeType] === 1;
  }) as PokeType[];

  results[2] = Object.keys(firstEffectiveness).filter((key) => {
    return firstEffectiveness[key as PokeType] === 2 || secondEffectiveness[key as PokeType] === 2;
  }) as PokeType[];

  results[4] = Object.keys(firstEffectiveness).filter((key) => {
    return firstEffectiveness[key as PokeType] === 4 || secondEffectiveness[key as PokeType] === 4;
  }) as PokeType[];

  return results;
}

export function getOffensiveTypes(against: SingleType[]) {
  var results: TypeResults = {
    0: [],
    0.25: [],
    0.5: [],
    1: [],
    2: [],
    4: [],
  };

  var type: PokeType;

  if (!against[0]) return results;

  type = against[0];

  if (against[1]) {
    type += ('_' + against[1]) as PokeType;

    if (!(type in TYPE_CHART.NORMAL)) {
      type = against[1] + '_' + against[0];
    }
  }

  results[0] = Object.keys(TYPE_CHART).filter((key) => {
    return TYPE_CHART[key as SingleType][type] === 0;
  }) as PokeType[];

  results[0.25] = Object.keys(TYPE_CHART).filter((key) => {
    return TYPE_CHART[key as SingleType][type] === 0.25;
  }) as PokeType[];

  results[0.5] = Object.keys(TYPE_CHART).filter((key) => {
    return TYPE_CHART[key as SingleType][type] === 0.5;
  }) as PokeType[];

  results[1] = Object.keys(TYPE_CHART).filter((key) => {
    return TYPE_CHART[key as SingleType][type] === 1;
  }) as PokeType[];

  results[2] = Object.keys(TYPE_CHART).filter((key) => {
    return TYPE_CHART[key as SingleType][type] === 2;
  }) as PokeType[];

  results[4] = Object.keys(TYPE_CHART).filter((key) => {
    return TYPE_CHART[key as SingleType][type] === 4;
  }) as PokeType[];

  return results;
}
