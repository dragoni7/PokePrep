import { Autocomplete, TextField } from '@mui/material';
import usePersistantSearchParams from '../hooks/usePersistantSearchParams';
import { AbilityDef } from '@/types';

interface AbilityFilterProps {
  abilityData: AbilityDef[];
}
export default function AbilityFilter(props: AbilityFilterProps) {
  const { searchParams, updateSearchParams } = usePersistantSearchParams();

  return (
    <Autocomplete
      freeSolo
      disablePortal
      options={props.abilityData.map((a: AbilityDef) => a.name)}
      renderOption={(props, option, state, ownerState) => (
        <li {...props}>
          <div style={{ textTransform: 'capitalize' }}>{option.replace('-', ' ')}</div>
        </li>
      )}
      onInputChange={(_, newInputValue) => {
        updateSearchParams('ability', newInputValue);
        updateSearchParams('page', 1);
      }}
      renderInput={(params) => <TextField {...params} label="Ability" sx={{ zIndex: 0 }} />}
      sx={{ width: '20%' }}
    />
  );
}
