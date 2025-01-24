import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialState {
  view: number;
}

const initialState: InitialState = {
  view: 0,
};

export const viewSlice = createSlice({
  name: 'viewConfig',
  initialState,
  reducers: {
    updateView: (state, action: PayloadAction<number>) => {
      state.view = action.payload;
    },
  },
});

export const { updateView } = viewSlice.actions;
export default viewSlice.reducer;
