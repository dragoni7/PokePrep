import { configureStore } from '@reduxjs/toolkit';
import SinglesReducer from './TypesReducer';
import ViewReducer from './ViewReducer';

export const store = configureStore({
  reducer: {
    typesConfig: SinglesReducer,
    viewConfig: ViewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
