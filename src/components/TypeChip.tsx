import { PokeType } from '@/generated/generated-types';
import { SingleType } from '@/types';
import { TYPE_COLORS } from '@/util/colors';
import { Chip, Stack } from '@mui/material';

interface TypeChipProps {
  type: PokeType;
}

export default function TypeChip(props: TypeChipProps) {
  function colorFromType(type: SingleType) {
    return TYPE_COLORS[type];
  }

  return props.type.includes('_') ? (
    <Stack
      direction="row"
      spacing={0.3}
      alignItems="center"
      justifyContent="center"
      sx={{ backgroundColor: 'darkslategray', borderRadius: 2 }}
    >
      {props.type.split('_').map((t) => (
        <Chip key={t} label={t} sx={{ backgroundColor: colorFromType(t as SingleType) }} />
      ))}
    </Stack>
  ) : (
    <Chip
      key={props.type}
      label={props.type}
      sx={{ backgroundColor: colorFromType(props.type as SingleType) }}
    />
  );
}
