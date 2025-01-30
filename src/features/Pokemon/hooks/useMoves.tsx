import { MoveDef } from '@/types';
import { useState, useEffect } from 'react';

export default function useMoves() {
  const [moves, setMoves] = useState<MoveDef[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/moves.json');
      const jsonData = await response.json();
      setMoves(Object.values(jsonData));
    };

    fetchData();
  }, []);

  return moves;
}
