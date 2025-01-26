import {
  Avatar,
  Backdrop,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  IconButton,
  Typography,
} from '@mui/material';
import { HighlightOff } from '@mui/icons-material';
import { Pokemon } from '@/types';

interface PokemonEntryProps {
  pokemon: Pokemon;
  open: boolean;
  onClose: () => void;
}

export default function PokemonEntry(props: PokemonEntryProps) {
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
            title={<Typography variant="h6">{props.pokemon.name}</Typography>}
          />

          <CardContent>
            <img src={props.pokemon.icon} />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum molestias ipsam
              voluptatum optio officia assumenda ratione dignissimos a dicta praesentium totam
              beatae architecto hic, ducimus autem quia iusto earum repellendus!
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Backdrop>
  );
}
