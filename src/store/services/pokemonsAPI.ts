import axios, {AxiosResponse} from 'axios';
import {PokemonResponse} from '../reducers/pokemons';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export const fetchPokemons = (): Promise<AxiosResponse<PokemonResponse>> =>
  api.get('/pokemon');
