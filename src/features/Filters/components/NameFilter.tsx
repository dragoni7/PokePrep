import { Autocomplete, TextField } from '@mui/material';
import { Pokemon } from '@/types';
import usePersistantSearchParams from '../hooks/usePersistantSearchParams';

interface NameFilterProps {
  pokedex: Pokemon[];
}

export default function NameFilter(props: NameFilterProps) {
  const { searchParams, updateSearchParams } = usePersistantSearchParams();

  return (
    <Autocomplete
      freeSolo
      disablePortal
      options={props.pokedex.map((pokemon) => pokemon.name)}
      renderOption={(props, option, state, ownerState) => (
        <li {...props}>
          <div style={{ textTransform: 'capitalize' }}>{option.replace('-', ' ')}</div>
        </li>
      )}
      onInputChange={(_, newInputValue) => {
        updateSearchParams('name', newInputValue);
        updateSearchParams('page', 1);
      }}
      renderInput={(params) => <TextField {...params} label="Name" sx={{ zIndex: 0 }} />}
      sx={{ width: '20%' }}
    />
  );
}
