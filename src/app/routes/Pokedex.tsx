import TypeChip from '@/components/TypeChip';
import PokemonEntry from '@/features/Pokemon/components/PokemonEntry';
import TypeSelector from '@/features/Types/components/TypeSelector';
import { Pokemon, SingleType } from '@/types';
import { Box, Grid2, Pagination, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const ENTRIES_PER_PAGE = 24;

export const Pokedex = () => {
  const [pokedex, setPokedex] = useState<Pokemon[]>([]);
  const [filteredDex, setFilteredDex] = useState<Pokemon[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [entryOpen, setEntryOpen] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | undefined>(undefined);

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
        pt: { xs: 7, sm: 10 },
        pb: { xs: 4, sm: 6 },
        width: '100%',
      }}
    >
      <Box
        sx={(theme) => ({
          width: '100%',
          borderRadius: `calc(${theme.shape.borderRadius}px + 2px)`,
          backgroundColor: theme.palette.primary.surface,
          outline: '4px solid rgba(255, 255, 255, 0.1)',
          p: 1,
        })}
      >
        <Stack direction="row" spacing={4} px={2}>
          <TypeSelector />
          <div>options</div>
          <div>options</div>
          <div>options</div>
          <div>options</div>
          <div>options</div>
        </Stack>
      </Box>
      <Pagination
        count={Math.round(Object.values(filteredDex).length / ENTRIES_PER_PAGE)}
        defaultPage={1}
        page={searchParams.get('page') ? Number(searchParams.get('page')) : 1}
        color="secondary"
        size="medium"
        onChange={(_: React.ChangeEvent<unknown>, value: number) =>
          updateSearchParams('page', String(value))
        }
        sx={{
          marginTop: 2,
        }}
      />
      <Grid2
        container
        spacing={{ xs: 2, md: 4 }}
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
              size={{ xs: 4, md: 2 }}
              key={pokemon.name + pokemon.id}
              onClick={() => {
                setEntryOpen(true);
                setSelectedPokemon(pokemon);
              }}
              sx={(theme) => ({
                backgroundColor: theme.palette.background.paper,
                borderRadius: 5,
                padding: '2px 3px',
                backdropFilter: 'blur(24px)',
                outline: '6px solid rgba(255, 255, 255, 0.1)',
              })}
            >
              <Stack spacing={0.5} px={0.75} pb={0.5} alignItems="stretch">
                <img src={pokemon.icon} alt={pokemon.name} />
                {pokemon.name}
                {pokemon.types[0] && <TypeChip type={pokemon.types[0]} />}
                {pokemon.types[1] ? <TypeChip type={pokemon.types[1]} /> : false}
              </Stack>
            </Grid2>
          ))}
      </Grid2>
      <Pagination
        count={Math.round(Object.values(filteredDex).length / ENTRIES_PER_PAGE)}
        defaultPage={1}
        page={searchParams.get('page') ? Number(searchParams.get('page')) : 1}
        color="secondary"
        size="medium"
        onChange={(_: React.ChangeEvent<unknown>, value: number) =>
          updateSearchParams('page', String(value))
        }
        sx={{
          marginBottom: 3,
        }}
      />
      {selectedPokemon && (
        <PokemonEntry
          pokemon={selectedPokemon}
          open={entryOpen}
          onClose={() => setEntryOpen(false)}
        />
      )}
    </Box>
  );
};
