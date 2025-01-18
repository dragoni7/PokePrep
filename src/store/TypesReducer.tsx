import { PokeType } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialState {
  type: PokeType[];
}

const initialState: InitialState = {
  type: ['NORMAL'],
};

export const typesSlice = createSlice({
  name: 'typesConfig',
  initialState,
  reducers: {
    updateTypes: (state, action: PayloadAction<PokeType[]>) => {
      state.type = action.payload;
    },
  },
});

export const { updateTypes } = typesSlice.actions;
export default typesSlice.reducer;
