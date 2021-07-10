import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {fetchPokemons, selectData} from '../../store/reducers/pokemons';

const Pokemons: React.FC = () => {
  const dispatch = useAppDispatch();
  const pokemonsState = useAppSelector(selectData);

  useEffect(() => {
    dispatch(fetchPokemons());
  }, []);

  return (
    <div>
      {pokemonsState.loading ? (
        'Loading...'
      ) : (
        <div>
          <p>Total available pokemons: {pokemonsState.count}</p>
          <p>Current page pokemons:</p>
          {pokemonsState?.results.map((pokemon) => (
            <ul>
              <li key={pokemon.name}>{pokemon.name}</li>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pokemons;
