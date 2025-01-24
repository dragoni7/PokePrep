import { Pokemon } from '@/types';
import { Box, Grid2, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

export const Pokedex = () => {
  const [pokedex, setPokedex] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data/pokedex.json');
      const jsonData = await response.json();
      setPokedex(jsonData);
    };

    fetchData();
  }, []);

  return (
    <Box
      id="pokedex"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: { xs: 14, sm: 20 },
        pb: { xs: 4, sm: 6 },
        width: '100%',
      }}
    >
      <Grid2
        container
        spacing={{ xs: 2, md: 6 }}
        textAlign="center"
        mx={4}
        my={4}
        mb={8}
        sx={{ height: '100%' }}
      >
        {pokedex &&
          Object.values(pokedex).map((pokemon: Pokemon) => (
            <Grid2
              size={2}
              key={pokemon.name + pokemon.id}
              sx={(theme) => ({
                backgroundColor: theme.palette.background.paper,
                borderRadius: 5,
              })}
            >
              <Stack>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                {pokemon.name}
              </Stack>
            </Grid2>
          ))}
      </Grid2>
    </Box>
  );
};
