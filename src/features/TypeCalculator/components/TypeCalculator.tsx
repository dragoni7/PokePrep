import { RootState } from '@/store';
import { TypeResults } from '@/types';
import { alpha, Grid2, Tooltip, Typography } from '@mui/material';
import { HelpOutline } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDefensiveTypes, getOffensiveTypes } from '../util/type-utils';
import TypeEffectivenessAccordion from './TypeEffectivenessAccordion';

export default function TypeCalculator() {
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
    <Grid2 container spacing={{ xs: 2, md: 6 }} textAlign="center" mx={4} my={4} mb={8}>
      <Grid2 size={6}>
        <Typography
          variant="h4"
          sx={(theme) => ({
            borderRadius: 2,
            backgroundColor: theme.palette.primary.highlight,
          })}
        >
          Defense&nbsp;
          <Tooltip
            title={'When recieving damage from STAB moves of selected types'}
            placement="top"
            arrow
          >
            <HelpOutline fontSize="small" />
          </Tooltip>
        </Typography>
      </Grid2>
      <Grid2 size={6}>
        <Typography
          variant="h4"
          sx={(theme) => ({
            borderRadius: 2,
            backgroundColor: theme.palette.primary.highlight,
          })}
        >
          Offense &nbsp;
          <Tooltip title={'When attacking selected types'} placement="top" arrow>
            <HelpOutline fontSize="small" />
          </Tooltip>
        </Typography>
      </Grid2>
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
  );
}
