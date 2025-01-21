import { SingleType } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialState {
  type: SingleType[];
}

const initialState: InitialState = {
  type: ['NORMAL'],
};

export const typesSlice = createSlice({
  name: 'typesConfig',
  initialState,
  reducers: {
    updateTypes: (state, action: PayloadAction<SingleType[]>) => {
      state.type = action.payload;
    },
  },
});

export const { updateTypes } = typesSlice.actions;
export default typesSlice.reducer;
