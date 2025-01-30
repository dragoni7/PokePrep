import { MoveDef } from '@/types';
import { Autocomplete, TextField } from '@mui/material';
import usePersistantSearchParams from '../hooks/usePersistantSearchParams';

interface MoveFilterProps {
  moveData: MoveDef[];
}

export default function MoveFilter(props: MoveFilterProps) {
  const { updateSearchParams } = usePersistantSearchParams();

  return (
    <Autocomplete
      freeSolo
      disablePortal
      options={props.moveData.map((a: MoveDef) => a.name)}
      renderOption={(props, option) => (
        <li {...props}>
          <div style={{ textTransform: 'capitalize' }}>{option.replace('-', ' ')}</div>
        </li>
      )}
      onInputChange={(_, newInputValue) => {
        updateSearchParams('move', newInputValue);
        updateSearchParams('page', 1);
      }}
      renderInput={(params) => <TextField {...params} label="Move" sx={{ zIndex: 0 }} />}
      sx={{ width: '20%' }}
    />
  );
}
