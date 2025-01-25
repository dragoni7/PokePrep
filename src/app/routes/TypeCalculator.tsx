import { SingleType, TypeResults } from '@/types';
import { Grid2, Tooltip, Typography } from '@mui/material';
import { HelpOutline } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import {
  getDefensiveTypes,
  getOffensiveTypes,
} from '../../features/TypeCalculator/util/type-utils';
import TypeEffectivenessAccordion from '../../features/TypeCalculator/components/TypeEffectivenessAccordion';
import Hero from '@/components/Hero';
import TypeSelector from '@/features/TypeCalculator/components/TypeSelector';
import { useSearchParams } from 'react-router-dom';

export const TypeCalculator = () => {
  const [searchParams, _] = useSearchParams();

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
    const selectedTypes = searchParams.has('type1')
      ? searchParams.has('type2')
        ? [searchParams.get('type1') as SingleType, searchParams.get('type2') as SingleType]
        : [searchParams.get('type1') as SingleType]
      : [];
    setBestDefense(getDefensiveTypes(selectedTypes));
    setBestOffense(getOffensiveTypes(selectedTypes));
  }, [searchParams]);

  return (
    <>
      <Hero>
        <TypeSelector />
      </Hero>
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
    </>
  );
};
