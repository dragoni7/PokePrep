import { AbilityDef } from '@/types';
import { useEffect, useState } from 'react';

export default function useAbilities() {
  const [abilities, setAbilities] = useState<AbilityDef[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/abilities.json');
      const jsonData = await response.json();
      setAbilities(Object.values(jsonData));
    };

    fetchData();
  }, []);

  return abilities;
}
