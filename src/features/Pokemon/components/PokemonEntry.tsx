import {
  Avatar,
  Backdrop,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { HighlightOff } from '@mui/icons-material';
import { Pokemon } from '@/types';
import { useHotkeys } from 'react-hotkeys-hook';
import { useEffect, useState } from 'react';
import StatsTable from './StatsTable';
import AbilitiesTable from './AbilitiesTable';

interface PokemonEntryProps {
  pokemon: Pokemon;
  abilityData: any;
  open: boolean;
  onClose: () => void;
}

const ShinyIcon = styled('img')({
  background: 'rgba(0,0,0,0.3)',
  borderRadius: '50%',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  height: '20%',
  width: 'auto',
  '&:hover': {
    transform: 'scale(1.1)',
    background: 'rgba(0,0,0,0.5)',
  },
});

export default function PokemonEntry(props: PokemonEntryProps) {
  const [icon, setIcon] = useState<string>(props.pokemon.icon);

  useEffect(() => {
    setIcon(props.pokemon.icon);
  }, [props]);

  useHotkeys('esc', props.onClose);
  return (
    <Backdrop open={props.open} sx={{ pt: 10, pb: 4 }}>
      <Container
        maxWidth="md"
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Card
          elevation={0}
          sx={(theme) => ({
            width: '100%',
            height: '100%',
            backgroundColor: theme.palette.background.paper,
            borderRadius: 5,
            padding: '2px 3px',
            backdropFilter: 'blur(24px)',
            outline: '6px solid rgba(255, 255, 255, 0.1)',
          })}
        >
          <CardHeader
            sx={(theme) => ({
              backgroundColor: theme.palette.secondary.main,
              borderRadius: 4,
              color: 'black',
            })}
            avatar={
              <Avatar
                aria-label="pokeball"
                sx={{ backgroundColor: 'transparent', width: '54px' }}
                src="/assets/icons/pokeball.svg"
              />
            }
            action={
              <IconButton aria-label="close" onClick={props.onClose} sx={{ color: 'black' }}>
                <HighlightOff />
              </IconButton>
            }
            title={<Typography variant="h5">{props.pokemon.name}</Typography>}
          />

          <CardContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 1,
                marginBottom: 2,
              }}
            >
              <Stack
                sx={{
                  alignItems: 'flex-end',
                  border: '3px solid yellow',
                  borderRadius: 9,
                  p: 1,
                  height: '100%',
                  width: '60%',
                }}
              >
                <img src={icon} width="100%" height="auto" />
                <ShinyIcon
                  src="/assets/icons/shiny.svg"
                  onClick={() =>
                    setIcon(
                      icon === props.pokemon.icon ? props.pokemon.shinyIcon : props.pokemon.icon
                    )
                  }
                />
              </Stack>
              <Stack
                sx={{
                  alignItems: 'center',
                  height: '100%',
                  width: '50%',
                }}
              >
                <Typography variant="h6" sx={{ pt: 1, pb: 1 }}>
                  Base Stats
                </Typography>
                <StatsTable stats={props.pokemon.stats} />
                <Typography variant="h6" sx={{ pt: 1, pb: 1 }}>
                  EVs
                </Typography>
                <StatsTable stats={props.pokemon.EV} />
                <Typography variant="h6" sx={{ pt: 1, pb: 1 }}>
                  Abilities
                </Typography>
                <AbilitiesTable
                  pokemonAbilities={props.pokemon.abilities}
                  abilityData={props.abilityData}
                />
              </Stack>
            </Box>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum molestias ipsam
              voluptatum optio officia assumenda ratione dignissimos a dicta praesentium totam
              beatae architecto hic, ducimus autem quia iusto earum repellendus! Lorem ipsum dolor
              sit amet, consectetur adipisicing elit. Cum molestias ipsam voluptatum optio officia
              assumenda ratione dignissimos a dicta praesentium totam beatae architecto hic, ducimus
              autem quia iusto earum repellendus! Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Cum molestias ipsam voluptatum optio officia assumenda ratione
              dignissimos a dicta praesentium totam beatae architecto hic, ducimus autem quia iusto
              earum repellendus! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Backdrop>
  );
}
