import TypeChip from '@/components/TypeChip';
import { SingleType } from '@/types';
import { TYPES } from '@/util/types';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';

const ITEM_HEIGHT = 64;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: '200px',
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
    },
  },
};

export default function TypeSelector() {
  const [searchParams, setSearchParams] = useSearchParams();

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

  function handleChange(event: SelectChangeEvent<SingleType[]>) {
    const {
      target: { value },
    } = event;

    if (value.length <= 2) {
      var types = typeof value === 'string' ? value.split(',') : value;

      updateSearchParams('type1', types[0] as SingleType);
      updateSearchParams('type2', types[1] as SingleType);

      if (searchParams.has('page')) updateSearchParams('page', 1);
    }
  }
  return (
    <FormControl>
      <InputLabel id="type-selector-label">Type</InputLabel>
      <Select
        labelId="type-selector-label"
        id="type-selector"
        multiple
        value={
          searchParams.has('type1')
            ? searchParams.has('type2')
              ? [searchParams.get('type1') as SingleType, searchParams.get('type2') as SingleType]
              : [searchParams.get('type1') as SingleType]
            : []
        }
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Type" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', gap: 0.2 }}>
            {selected.map((value) => (
              <TypeChip type={value} key={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
        sx={{ width: '260px', height: '50px' }}
      >
        {TYPES.map((type) => (
          <MenuItem key={type} value={type}>
            <img
              src={`/assets/icons/${type.toLocaleLowerCase()}.svg`}
              width="20px"
              height="20px"
              alt={type}
            />
            &nbsp;
            {type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
