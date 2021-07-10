import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../..';
import {fetchPokemons as fetchPokemonsService} from '../../services/pokemonsAPI';

export interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export interface PokemonsState extends PokemonResponse {
  loading: boolean;
  error: boolean;
}

const initialState: PokemonsState = {
  count: 0,
  next: null,
  previous: null,
  results: [],
  loading: false,
  error: false,
};

export const fetchPokemons = createAsyncThunk('pokemons/fetchAll', async () => {
  const response = await fetchPokemonsService();

  return response.data;
});

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.count = action.payload.count;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
        state.results = action.payload.results;
      })
      .addCase(fetchPokemons.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const selectData = (state: RootState) => state.pokemons;

export default pokemonsSlice.reducer;
