import {useState} from 'react';
import {useAppSelector, useAppDispatch} from '../../store/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from '../../store/reducers/counter';
import {
  useLazyFetchDogsQuery,
  useUpdateDogMutation,
} from '../../store/services/dogsAPI';
import styles from './Counter.module.css';

function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  const [fetchDogs, {isFetching, data: fetchDogsdata, error: fetchDogsError}] =
    useLazyFetchDogsQuery();

  const [updateDog, {error: updateDogError}] = useUpdateDogMutation();

  function handleFetch() {
    fetchDogs();
  }

  function handleUpdate() {
    updateDog({newData: ''});
  }

  return (
    <div>
      <button onClick={handleFetch}>Dispatch lazy fetch dogs</button>

      <button onClick={handleUpdate}>Dispatch lazy update dog</button>

      {isFetching ? (
        'Loading...'
      ) : (
        <div>
          <p>Message: {fetchDogsdata?.message}</p>
          <p>Status: {fetchDogsdata?.status}</p>
        </div>
      )}

      {fetchDogsError && <p>{(fetchDogsError as any).status}</p>}

      {updateDogError && <p>{(updateDogError as any).status}</p>}

      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>
      </div>
    </div>
  );
}

export default Counter;
