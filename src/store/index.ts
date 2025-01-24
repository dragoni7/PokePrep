import { configureStore } from '@reduxjs/toolkit';
import SinglesReducer from './TypesReducer';

export const store = configureStore({
  reducer: {
    typesConfig: SinglesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
