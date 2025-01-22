import { RootState } from '@/store';
import { TypeResults } from '@/types';
import { Divider, Grid2, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDefensiveTypes, getOffensiveTypes } from '../util/type-utils';
import TypeEffectivenessAccordion from './TypeEffectivenessAccordion';

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
    <>
      <Grid2 container spacing={0} textAlign="center" mb={5}>
        <Grid2 size={6}>
          <Typography variant="h3" mb={2}>
            Defense
          </Typography>
          <Divider />
        </Grid2>
        <Grid2 size={6}>
          <Typography variant="h3" mb={2}>
            Offense
          </Typography>
          <Divider />
        </Grid2>
      </Grid2>

      <Grid2 container spacing={8} textAlign="center">
        <Grid2 size={6}>
          <TypeEffectivenessAccordion label="Immune" types={bestDefense[0]} />
          <TypeEffectivenessAccordion label="x0.25" types={bestDefense[0.25]} />
          <TypeEffectivenessAccordion label="x0.5" types={bestDefense[0.5]} />
          <TypeEffectivenessAccordion label="x1.0" types={bestDefense[1]} />
          <TypeEffectivenessAccordion label="x2.0" types={bestDefense[2]} />
          <TypeEffectivenessAccordion label="x4.0" types={bestDefense[4]} />
        </Grid2>
        <Grid2 size={6}>
          <TypeEffectivenessAccordion label="x4.0" types={bestOffense[4]} />
          <TypeEffectivenessAccordion label="x2.0" types={bestOffense[2]} />
          <TypeEffectivenessAccordion label="x1.0" types={bestOffense[1]} />
          <TypeEffectivenessAccordion label="x0.5" types={bestOffense[0.5]} />
          <TypeEffectivenessAccordion label="x0.25" types={bestOffense[0.25]} />
          <TypeEffectivenessAccordion label="Immune" types={bestOffense[0]} />
        </Grid2>
      </Grid2>
    </>
  );
}
