import { RootState } from '@/store';
import { TypeResults } from '@/types';
import { Chip, Container, Grid2, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDefensiveTypes, getOffensiveTypes } from '../util/type-utils';
import TypeChip from '@/components/TypeChip';

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
    setBestDefense(getDefensiveTypes(selectedTypes));
    setBestOffense(getOffensiveTypes(selectedTypes));
  }, [selectedTypes]);

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
                <TypeChip type={entry} />
              </Grid2>
            ))}
          </Grid2>
          <Typography variant="h4">x0.25</Typography>
          <Grid2 container spacing={1}>
            {bestDefense[0.25].map((entry) => (
              <Grid2 size={4}>
                <TypeChip type={entry} />
              </Grid2>
            ))}
          </Grid2>
          <Typography variant="h4">x0.5</Typography>
          <Grid2 container spacing={1}>
            {bestDefense[0.5].map((entry) => (
              <Grid2 size={4}>
                <TypeChip type={entry} />
              </Grid2>
            ))}
          </Grid2>
          <Typography variant="h4">x1</Typography>
          <Grid2 container spacing={1}>
            {bestDefense[1].map((entry) => (
              <Grid2 size={4}>
                <TypeChip type={entry} />
              </Grid2>
            ))}
          </Grid2>
          <Typography variant="h4">x2</Typography>
          <Grid2 container spacing={1}>
            {bestDefense[2].map((entry) => (
              <Grid2 size={4}>
                <TypeChip type={entry} />
              </Grid2>
            ))}
          </Grid2>
          <Typography variant="h4">x4</Typography>
          <Grid2 container spacing={1}>
            {bestDefense[4].map((entry) => (
              <Grid2 size={4}>
                <TypeChip type={entry} />
              </Grid2>
            ))}
          </Grid2>
        </Grid2>
        <Grid2 size={6}>
          <Typography variant="h4">Immune</Typography>
          <Grid2 container spacing={1}>
            {bestOffense[0].map((entry) => (
              <Grid2 size={4}>
                <TypeChip type={entry} />
              </Grid2>
            ))}
          </Grid2>
          <Typography variant="h4">x0.25</Typography>
          <Grid2 container spacing={1}>
            {bestOffense[0.25].map((entry) => (
              <Grid2 size={4}>
                <TypeChip type={entry} />
              </Grid2>
            ))}
          </Grid2>
          <Typography variant="h4">x0.5</Typography>
          <Grid2 container spacing={1}>
            {bestOffense[0.5].map((entry) => (
              <Grid2 size={4}>
                <TypeChip type={entry} />
              </Grid2>
            ))}
          </Grid2>
          <Typography variant="h4">x1</Typography>
          <Grid2 container spacing={1}>
            {bestOffense[1].map((entry) => (
              <Grid2 size={4}>
                <TypeChip type={entry} />
              </Grid2>
            ))}
          </Grid2>
          <Typography variant="h4">x2</Typography>
          <Grid2 container spacing={1}>
            {bestOffense[2].map((entry) => (
              <Grid2 size={4}>
                <TypeChip type={entry} />
              </Grid2>
            ))}
          </Grid2>
          <Typography variant="h4">x4</Typography>
          <Grid2 container spacing={1}>
            {bestOffense[4].map((entry) => (
              <Grid2 size={4}>
                <TypeChip type={entry} />
              </Grid2>
            ))}
          </Grid2>
        </Grid2>
      </Grid2>
    </Container>
  );
}
