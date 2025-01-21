import { TYPE_CHART } from '@/generated/generated-type-chart';
import { PokeType } from '@/generated/generated-types';
import { RootState } from '@/store';
import { SingleType, TypeResults } from '@/types';
import { Chip, Container, Grid2, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function TypeOptimizer() {
  const selectedTypes = useSelector((state: RootState) => state.typesConfig.type);

  const [bestDefense, setBestDefense] = useState<TypeResults>({
    0: [],
    0.25: [],
    0.5: [],
    1: [],
    2: [],
    4: [],
  });

  const [bestOffense, setBestOffense] = useState<TypeResults>({
    0: [],
    0.25: [],
    0.5: [],
    1: [],
    2: [],
    4: [],
  });

  useEffect(() => {
    setBestDefense(findBestTypes(selectedTypes));
    setBestOffense(getBestOffense(selectedTypes));
  }, [selectedTypes]);

  function findBestTypes(opponent: SingleType[]): TypeResults {
    var results: TypeResults = {
      0: [],
      0.25: [],
      0.5: [],
      1: [],
      2: [],
      4: [],
    };

    const firstType = opponent[0];
    const secondType = selectedTypes.length == 2 ? opponent[1] : undefined;

    if (!firstType) return results;

    const firstEffectiveness = TYPE_CHART[firstType];

    if (!secondType) {
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

    const secondEffectiveness = TYPE_CHART[secondType];

    results[0] = Object.keys(firstEffectiveness).filter((key) => {
      return (
        firstEffectiveness[key as PokeType] === 0 && secondEffectiveness[key as PokeType] === 0
      );
    }) as PokeType[];

    results[0.25] = Object.keys(firstEffectiveness).filter((key) => {
      return (
        firstEffectiveness[key as PokeType] === 0.25 &&
        secondEffectiveness[key as PokeType] === 0.25
      );
    }) as PokeType[];

    results[0.5] = Object.keys(firstEffectiveness).filter((key) => {
      return (
        firstEffectiveness[key as PokeType] === 0.5 && secondEffectiveness[key as PokeType] === 0.5
      );
    }) as PokeType[];

    results[1] = Object.keys(firstEffectiveness).filter((key) => {
      return (
        firstEffectiveness[key as PokeType] === 1 && secondEffectiveness[key as PokeType] === 1
      );
    }) as PokeType[];

    results[2] = Object.keys(firstEffectiveness).filter((key) => {
      return (
        firstEffectiveness[key as PokeType] === 2 || secondEffectiveness[key as PokeType] === 2
      );
    }) as PokeType[];

    results[4] = Object.keys(firstEffectiveness).filter((key) => {
      return (
        firstEffectiveness[key as PokeType] === 4 || secondEffectiveness[key as PokeType] === 4
      );
    }) as PokeType[];

    return results;
  }

  function getBestOffense(opponent: SingleType[]): TypeResults {
    var results: TypeResults = {
      0: [],
      0.25: [],
      0.5: [],
      1: [],
      2: [],
      4: [],
    };

    var type: PokeType;

    if (!opponent[0]) return results;

    type = opponent[0];

    if (opponent[1]) {
      type += ('_' + opponent[1]) as PokeType;

      if (!(type in TYPE_CHART.NORMAL)) {
        type = opponent[1] + '_' + opponent[0];
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

  return (
    <Container>
      <Grid2 container spacing={2} textAlign="center">
        <Grid2 size={6}>
          <Typography variant="h3">Defense</Typography>
        </Grid2>
        <Grid2 size={6}>
          <Typography variant="h3">Offense</Typography>
        </Grid2>
        <Grid2 size={6}>
          <Typography variant="h4">Immune</Typography>
          <Grid2 container spacing={1}>
            {bestDefense[0].map((entry) => (
              <Grid2 size={4}>
                <Chip key={entry} label={entry} />
              </Grid2>
            ))}
          </Grid2>
          <Typography variant="h4">x0.25</Typography>
          <Grid2 container spacing={1}>
            {bestDefense[0.25].map((entry) => (
              <Grid2 size={4}>
                <Chip key={entry} label={entry} />
              </Grid2>
            ))}
          </Grid2>
          <Typography variant="h4">x0.5</Typography>
          <Grid2 container spacing={1}>
            {bestDefense[0.5].map((entry) => (
              <Grid2 size={4}>
                <Chip key={entry} label={entry} />
              </Grid2>
            ))}
          </Grid2>
          <Typography variant="h4">x1</Typography>
          <Grid2 container spacing={1}>
            {bestDefense[1].map((entry) => (
              <Grid2 size={4}>
                <Chip key={entry} label={entry} />
              </Grid2>
            ))}
          </Grid2>
          <Typography variant="h4">x2</Typography>
          <Grid2 container spacing={1}>
            {bestDefense[2].map((entry) => (
              <Grid2 size={4}>
                <Chip key={entry} label={entry} />
              </Grid2>
            ))}
          </Grid2>
          <Typography variant="h4">x4</Typography>
          <Grid2 container spacing={1}>
            {bestDefense[4].map((entry) => (
              <Grid2 size={4}>
                <Chip key={entry} label={entry} />
              </Grid2>
            ))}
          </Grid2>
        </Grid2>
        <Grid2 size={6}>
          <Typography variant="h4">Immune</Typography>
          <Grid2 container spacing={1}>
            {bestOffense[0].map((entry) => (
              <Grid2 size={4}>
                <Chip key={entry} label={entry} />
              </Grid2>
            ))}
          </Grid2>
          <Typography variant="h4">x0.25</Typography>
          <Grid2 container spacing={1}>
            {bestOffense[0.25].map((entry) => (
              <Grid2 size={4}>
                <Chip key={entry} label={entry} />
              </Grid2>
            ))}
          </Grid2>
          <Typography variant="h4">x0.5</Typography>
          <Grid2 container spacing={1}>
            {bestOffense[0.5].map((entry) => (
              <Grid2 size={4}>
                <Chip key={entry} label={entry} />
              </Grid2>
            ))}
          </Grid2>
          <Typography variant="h4">x1</Typography>
          <Grid2 container spacing={1}>
            {bestOffense[1].map((entry) => (
              <Grid2 size={4}>
                <Chip key={entry} label={entry} />
              </Grid2>
            ))}
          </Grid2>
          <Typography variant="h4">x2</Typography>
          <Grid2 container spacing={1}>
            {bestOffense[2].map((entry) => (
              <Grid2 size={4}>
                <Chip key={entry} label={entry} />
              </Grid2>
            ))}
          </Grid2>
          <Typography variant="h4">x4</Typography>
          <Grid2 container spacing={1}>
            {bestOffense[4].map((entry) => (
              <Grid2 size={4}>
                <Chip key={entry} label={entry} />
              </Grid2>
            ))}
          </Grid2>
        </Grid2>
      </Grid2>
    </Container>
  );
}
