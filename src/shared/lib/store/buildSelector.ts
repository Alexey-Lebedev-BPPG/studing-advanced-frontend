import { useSelector } from 'react-redux';
import { StateSchema } from '@/app/providers/StoreProvider';

type Selector<T> = (state: StateSchema) => T;
type Result<T> = [() => T, Selector<T>];

// используя эту функцию в файлах серекторов, мы создаем хук (который будет использоваться вместо useSelector) и значение, которое будем вытягивать (пример в компоненте <Counter> и его селекторах)
export function buildSelector<T>(selector: Selector<T>): Result<T> {
  const useSelectorHook = () => useSelector(selector);

  return [useSelectorHook, selector];
}
