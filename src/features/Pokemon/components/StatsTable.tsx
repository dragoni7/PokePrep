import { PokemonStats } from '@/types';
import { Box, Stack, styled, Typography } from '@mui/material';

interface StatsTableProps {
  stats: PokemonStats;
}

const StatBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

export default function StatsTable(props: StatsTableProps) {
  function highestStat(stat: keyof PokemonStats) {
    var result = true;
    Object.entries(props.stats).forEach(([key, value]) => {
      if (stat !== key && props.stats[stat] < value) {
        result = false;
      }
    });

    return result;
  }

  return (
    <Stack
      direction="row"
      gap={2}
      alignItems="flex-start"
      textAlign="center"
      sx={{
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 5,
        border: '4px solid rgba(0,0,0,0.5)',
        p: 2,
        height: '18%',
      }}
    >
      <StatBox>
        <Typography color={highestStat('hp') ? 'secondary' : ''}>
          <div>HP</div>
          <div>{props.stats.hp}</div>
        </Typography>
      </StatBox>
      <StatBox>
        <Typography color={highestStat('defense') ? 'secondary' : ''}>
          <div>DEF</div>
          <div>{props.stats.defense}</div>
        </Typography>
      </StatBox>
      <StatBox>
        <Typography color={highestStat('special_defense') ? 'secondary' : ''}>
          <div>SPDEF</div>
          <div>{props.stats.special_defense}</div>
        </Typography>
      </StatBox>
      <StatBox>
        <Typography color={highestStat('attack') ? 'secondary' : ''}>
          <div>ATK</div>
          <div>{props.stats.attack}</div>
        </Typography>
      </StatBox>
      <StatBox>
        <Typography color={highestStat('special_attack') ? 'secondary' : ''}>
          <div>SPATK</div>
          <div>{props.stats.special_attack}</div>
        </Typography>
      </StatBox>
      <StatBox>
        <Typography color={highestStat('speed') ? 'secondary' : ''}>
          <div>SPD</div>
          <div>{props.stats.speed}</div>
        </Typography>
      </StatBox>
    </Stack>
  );
}
