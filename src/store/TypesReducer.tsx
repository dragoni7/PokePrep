import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Constants } from 'pokenode-ts';

export interface InitialState {
  type: string[];
}

const initialState: InitialState = {
  type: [Object.entries(Constants.TYPES).find(([_, value]) => value == Constants.TYPES.NORMAL)![0]],
};

export const typesSlice = createSlice({
  name: 'typesConfig',
  initialState,
  reducers: {
    updateTypes: (state, action: PayloadAction<string[]>) => {
      state.type = action.payload;
    },
  },
});

export const { updateTypes } = typesSlice.actions;
export default typesSlice.reducer;
