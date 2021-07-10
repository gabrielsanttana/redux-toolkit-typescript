import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import {dogsSlice} from './services/dogsAPI';
import counterReducer from './reducers/counter';
import pokemonsReducer from './reducers/pokemons';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    pokemons: pokemonsReducer,
    [dogsSlice.reducerPath]: dogsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(dogsSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
