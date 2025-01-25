import TypeSelector from '@/features/TypeCalculator/components/TypeSelector';
import { Pokemon, SingleType } from '@/types';
import { Box, Grid2, Pagination, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const ENTRIES_PER_PAGE = 24;

export const Pokedex = () => {
  const [pokedex, setPokedex] = useState<Pokemon[]>([]);
  const [filteredDex, setFilteredDex] = useState<Pokemon[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/pokedex.json');
      const jsonData = await response.json();
      setPokedex(Object.values<Pokemon>(jsonData));

      if (searchParams.has('type1') && searchParams.has('type2')) {
        setFilteredDex(
          Object.values<Pokemon>(jsonData).filter(
            (p) =>
              p.types.includes(searchParams.get('type1') as SingleType) &&
              p.types.includes(searchParams.get('type2') as SingleType)
          )
        );
      } else if (searchParams.has('type1')) {
        setFilteredDex(
          Object.values<Pokemon>(jsonData).filter((p: any) =>
            p.types.includes(searchParams.get('type1') as SingleType)
          )
        );
      } else {
        setFilteredDex(Object.values<Pokemon>(jsonData));
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchParams.has('type1') && searchParams.has('type2')) {
      setFilteredDex(
        Object.values(pokedex).filter(
          (p) =>
            p.types.includes(searchParams.get('type1') as SingleType) &&
            p.types.includes(searchParams.get('type2') as SingleType)
        )
      );
    } else if (searchParams.has('type1')) {
      setFilteredDex(
        Object.values(pokedex).filter((p) =>
          p.types.includes(searchParams.get('type1') as SingleType)
        )
      );
    } else {
      setFilteredDex(pokedex);
    }
  }, [searchParams]);

  function updateSearchParams(key: string, value: any) {
    setSearchParams(() => {
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }

      return searchParams;
    });
  }

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
      <TypeSelector />
      <Pagination
        count={Math.round(Object.values(filteredDex).length / ENTRIES_PER_PAGE)}
        defaultPage={1}
        page={searchParams.get('page') ? Number(searchParams.get('page')) : 1}
        color="secondary"
        onChange={(_: React.ChangeEvent<unknown>, value: number) =>
          updateSearchParams('page', String(value))
        }
      />
      <Grid2
        container
        spacing={{ xs: 2, md: 6 }}
        textAlign="center"
        mx={4}
        my={4}
        mb={8}
        sx={{ height: '100%', width: '100%' }}
      >
        {filteredDex
          .slice(
            searchParams.get('page')
              ? (Number(searchParams.get('page')) - 1) * ENTRIES_PER_PAGE
              : 0,
            searchParams.get('page')
              ? Number(searchParams.get('page')) * ENTRIES_PER_PAGE
              : ENTRIES_PER_PAGE
          )
          .map((pokemon: Pokemon) => (
            <Grid2
              size={2}
              key={pokemon.name + pokemon.id}
              sx={(theme) => ({
                backgroundColor: theme.palette.background.paper,
                borderRadius: 5,
                padding: '2px 3px',
                backdropFilter: 'blur(24px)',
                outline: '6px solid rgba(255, 255, 255, 0.1)',
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
