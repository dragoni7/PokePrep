import { RootState } from '@/store';
import { PokeType, TypeEffectiveness } from '@/types';
import { TypeChart } from '@/util/type-chart';
import { Chip, Container } from '@mui/material';
import { useSelector } from 'react-redux';

export default function TypeOptimizer() {
  const selectedTypes = useSelector((state: RootState) => state.typesConfig.type);

  function findBestTypes(opponent: PokeType[]): PokeType[] {
    const firstType = opponent[0];
    const secondType = selectedTypes.length == 2 ? opponent[1] : undefined;

    if (!firstType) return [];

    const firstEffectiveness: TypeEffectiveness = TypeChart[firstType];
    Object.assign(firstEffectiveness, {key: "value"});

    if (!secondType) {
      const singleTypes = Object.keys(firstEffectiveness).filter((key) => {
        return firstEffectiveness[key as PokeType] < 1;
      }) as PokeType[];


    }

    const secondEffectiveness: TypeEffectiveness = TypeChart[secondType];

    const merged: TypeEffectiveness = 

    return [];
  }

  function getResistances(firstType: PokeType, secondType?: PokeType): PokeType[] {
    const effectiveness: TypeEffectiveness = TypeChart[firstType];

    const firstResistances: [PokeType, number][] = Object.entries(TypeChart[firstType]).filter(
      ([key, value]) => {
        return effectiveness[key as PokeType] < 1;
      }
    ) as [PokeType, number][];

    var secondResistances: [PokeType, number][] = [];

    if (secondType)
      secondResistances = Object.entries(TypeChart[secondType]).filter(([key, value]) => {
        return effectiveness[key as PokeType] < 1;
      }) as [PokeType, number][];

    return [];
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
