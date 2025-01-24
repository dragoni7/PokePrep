import TypeChip from '@/components/TypeChip';
import { RootState } from '@/store';
import { updateTypes } from '@/store/TypesReducer';
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
import { useDispatch, useSelector } from 'react-redux';

const ITEM_HEIGHT = 64;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: '8%',
    },
  },
};

export default function TypeSelector() {
  const dispatch = useDispatch();
  const selectedTypes = useSelector((state: RootState) => state.typesConfig.type);

  function handleChange(event: SelectChangeEvent<typeof selectedTypes>) {
    const {
      target: { value },
    } = event;

    if (value.length <= 2) {
      var types = typeof value === 'string' ? value.split(',') : value;
      dispatch(updateTypes(types as SingleType[]));
    }
  }
  return (
    <FormControl>
      <InputLabel id="type-selector-label">Type</InputLabel>
      <Select
        labelId="type-selector-label"
        id="type-selector"
        multiple
        value={selectedTypes}
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
