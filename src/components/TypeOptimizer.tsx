import { TYPE_CHART } from '@/generated/generated-type-chart';
import { PokeType } from '@/generated/generated-types';
import { RootState } from '@/store';
import { SingleType } from '@/types';
import { Chip, Container } from '@mui/material';
import { useSelector } from 'react-redux';

export default function TypeOptimizer() {
  const selectedTypes = useSelector((state: RootState) => state.typesConfig.type);

  function findBestTypes(opponent: SingleType[]): PokeType[] {
    const firstType = opponent[0];
    const secondType = selectedTypes.length == 2 ? opponent[1] : undefined;

    if (!firstType) return [];

    const firstEffectiveness = TYPE_CHART[firstType];

    if (!secondType) {
      const results = Object.keys(firstEffectiveness).filter((key) => {
        return firstEffectiveness[key as PokeType] < 1;
      }) as PokeType[];

      return results;
    }

    const secondEffectiveness = TYPE_CHART[secondType];

    const merged = Object.keys(firstEffectiveness).filter((key) => {
      return firstEffectiveness[key as PokeType] < 1 && secondEffectiveness[key as PokeType] < 1;
    }) as PokeType[];

    return merged;
  }

  return (
    <div>
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        Use...&nbsp;
        {findBestTypes(selectedTypes)?.map((type: PokeType) => (
          <Chip key={type} label={type} />
        ))}
      </Container>
    </div>
  );
}
