import { Pokemon } from '@/types';
import { useEffect, useState } from 'react';

export default function usePokedex() {
  const [pokedex, setPokedex] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/pokedex.json');
      const jsonData = await response.json();
      setPokedex(Object.values<Pokemon>(jsonData));
    };

    fetchData();
  }, []);

  return pokedex;
}
