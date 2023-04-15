import { CounterSchema } from '../types/counterSchema';
import { CounterReducer, CounterActions } from './counterSlice';

describe('counterSlice', () => {
  test('decrement', () => {
    // используем не глобальный стейт, а определенное его значение
    const state: CounterSchema = { value: 10 };

    expect(CounterReducer(state, CounterActions.decrement())).toEqual({
      value: 9,
    });
  });

  test('increment', () => {
    // используем не глобальный стейт, а определенное его значение
    const state: CounterSchema = { value: 10 };

    expect(CounterReducer(state, CounterActions.increment())).toEqual({
      value: 11,
    });
  });

  test('should work with empty state', () => {
    // проверяем с путым стейтом
    expect(CounterReducer(undefined, CounterActions.increment())).toEqual({
      value: 1,
    });
  });
});
