import { Pokemon, SingleType } from '@/types';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function useFilteredPokedex(pokedex: Pokemon[]) {
  const [filteredDex, setFilteredDex] = useState<Pokemon[]>(pokedex);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setFilteredDex(filterDex(pokedex));
  }, [pokedex]);

  useEffect(() => {
    setFilteredDex(filterDex(pokedex));
  }, [searchParams]);

  function filterDex(pokedex: Pokemon[]): Pokemon[] {
    var filtered = pokedex;

    if (searchParams.has('name') && searchParams.get('name') !== null) {
      filtered = Object.values(filtered).filter((p) => p.name.includes(searchParams.get('name')!));
    }

    if (searchParams.has('type1') && searchParams.has('type2')) {
      filtered = Object.values(filtered).filter(
        (p) =>
          p.types.includes(searchParams.get('type1') as SingleType) &&
          p.types.includes(searchParams.get('type2') as SingleType)
      );
    } else if (searchParams.has('type1')) {
      filtered = Object.values(filtered).filter((p) =>
        p.types.includes(searchParams.get('type1') as SingleType)
      );
    }

    if (searchParams.has('ability') && searchParams.get('ability') !== null) {
      filtered = filtered.filter((p) =>
        p.abilities.some((p) => p.name === searchParams.get('ability'))
      );
    }

    return filtered;
  }

  return filteredDex;
}
