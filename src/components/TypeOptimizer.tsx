import { RootState } from '@/store';
import { Chip } from '@mui/material';

import { useSelector } from 'react-redux';

export default function TypeOptimizer() {
  const selectedTypes = useSelector((state: RootState) => state.typesConfig.type);

  function findBestTypes(opponent: string[]): string[] {
    var result: string[] = ['FIRE', 'FIGHTING'];

    return result;
  }
  return (
    <div>
      Use...
      {findBestTypes(selectedTypes).map((type) => (
        <Chip key={type} label={type} />
      ))}
    </div>
  );
}
