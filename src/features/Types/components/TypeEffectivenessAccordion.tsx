import TypeChip from '@/components/TypeChip';
import { PokeType } from '@/gen/generated-types';
import { Accordion, AccordionSummary, Typography, AccordionDetails, Grid2 } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useEffect, useState } from 'react';

interface TypeEffectivenessAccordionProps {
  types: PokeType[];
  label: string;
}

export default function TypeEffectivenessAccordion(props: TypeEffectivenessAccordionProps) {
  const [expanded, setExpanded] = useState<string | false>(false);

  useEffect(() => {
    setExpanded(props.types.length > 0 ? props.label : false);
  }, [props.types]);

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion
      disabled={props.types.length === 0}
      expanded={expanded === props.label}
      onChange={handleChange(props.label)}
      sx={{ backdropFilter: 'blur(10px)' }}
    >
      <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
        <Typography variant="h5">{props.label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid2
          container
          spacing={{ xs: 1, md: 1.25 }}
          sx={{
            maxHeight: { xs: '200px', md: '300px' },
            overflowY: 'auto', // Enable vertical scrolling
            overflowX: 'hidden', // Hide horizontal scrolling if not needed
          }}
        >
          {props.types.map((entry) => (
            <Grid2
              size={entry.includes('_') ? { xs: 12, md: 6 } : { xs: 12, md: 3 }}
              key={`${props.label}_${entry}`}
            >
              <TypeChip type={entry} />
            </Grid2>
          ))}
        </Grid2>
      </AccordionDetails>
    </Accordion>
  );
}
