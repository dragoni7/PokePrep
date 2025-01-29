import { AbilityDef, PokemonAbility } from '@/types';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface AbilitiesTableProps {
  pokemonAbilities: PokemonAbility[];
  abilityData: AbilityDef[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1, overflow: 'auto', height: '120px' }}>{children}</Box>}
    </div>
  );
}

export default function AbilitiesTable(props: AbilitiesTableProps) {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    setIndex(0);
  }, [props]);

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 5,
        border: '4px solid rgba(0,0,0,0.5)',
        textAlign: 'center',
        width: '100%',
      }}
    >
      <Tabs
        value={index}
        onChange={(_, newValue) => setIndex(newValue)}
        indicatorColor="secondary"
        variant="fullWidth"
      >
        {props.pokemonAbilities.map((a) => (
          <Tab
            label={a.name.replace('-', ' ')}
            sx={{
              textTransform: 'capitalize',
              fontSize: 15,
              fontWeight: 900,
              fontStyle: a.hidden ? 'italic' : 'normal',
              borderRadius: 4,
            }}
          />
        ))}
      </Tabs>
      <CustomTabPanel value={index} index={0}>
        <Typography variant="body1">
          {props.abilityData.find((p) => p.name === props.pokemonAbilities[0]?.name)?.flavorText}
        </Typography>
      </CustomTabPanel>
      <CustomTabPanel value={index} index={1}>
        <Typography variant="body1">
          {props.abilityData.find((p) => p.name === props.pokemonAbilities[1]?.name)?.flavorText}
        </Typography>
      </CustomTabPanel>
      <CustomTabPanel value={index} index={2}>
        <Typography variant="body1">
          {props.abilityData.find((p) => p.name === props.pokemonAbilities[2]?.name)?.flavorText}
        </Typography>
      </CustomTabPanel>
    </Box>
  );
}
