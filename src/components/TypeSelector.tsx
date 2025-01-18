import { RootState } from '@/store';
import { updateTypes } from '@/store/TypesReducer';
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Constants } from 'pokenode-ts';
import { useDispatch, useSelector } from 'react-redux';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
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
      dispatch(updateTypes(types));
    }
  }
  return (
    <div>
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
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {Object.entries(Constants.TYPES).map(([key, value]) =>
            value !== Constants.TYPES.SHADOW && value !== Constants.TYPES.UNKNOWN ? (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            ) : (
              false
            )
          )}
        </Select>
      </FormControl>
    </div>
  );
}
