import { PokeType } from '@/generated/generated-types';
import { SingleType } from '@/types';
import { TYPE_COLORS } from '@/util/colors';
import { Chip, Stack } from '@mui/material';

interface TypeChipProps {
  type: PokeType;
  onClick?: () => void;
}

export default function TypeChip(props: TypeChipProps) {
  function colorFromType(type: SingleType) {
    return TYPE_COLORS[type];
  }

  return props.type.includes('_') ? (
    <Stack
      direction="row"
      spacing={0.2}
      alignItems="center"
      justifyContent="center"
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        borderRadius: 10,
        cursor: 'pointer',
      })}
      onClick={props.onClick}
    >
      {props.type.split('_').map((t) => (
        <Chip
          key={t}
          label={t}
          avatar={<img src={`/assets/icons/${t.toLocaleLowerCase()}.svg`} />}
          sx={{
            backgroundColor: colorFromType(t as SingleType),
            fontWeight: 800,
            fontSize: {
              xs: '0.52rem',
              md: '0.72rem',
            },
            height: {
              xs: 24,
              md: 32,
            },
          }}
        />
      ))}
    </Stack>
  ) : (
    <Chip
      key={props.type}
      label={props.type}
      avatar={<img src={`/assets/icons/${props.type.toLocaleLowerCase()}.svg`} />}
      onClick={props.onClick}
      clickable={false}
      sx={{
        backgroundColor: colorFromType(props.type as SingleType),
        fontWeight: 800,
        cursor: 'pointer',
        fontSize: {
          xs: '0.65rem',
          md: '0.8rem',
        },
        height: {
          xs: 24,
          md: 32,
        },
      }}
    />
  );
}
