import { FC } from "react";
// import { useDispatch } from "react-redux";
import { useCounterValue } from "../model/selectors/getCounterValue/getCounterValue";
import { useCounterActions } from "../model/slice/counterSlice";
import { Button } from "@/shared/ui/Button";

export const Counter: FC = () => {
  // const dispatch = useDispatch();
  // берем хук, который мы создали из функции buildSelector и достаем оттуда значение (аналог useSelector)
  const counterValue = useCounterValue();
  // применяем экшены по ум
  // const handleIncrement = () => dispatch(CounterActions.increment());
  // const handleDecrement = () => dispatch(CounterActions.decrement());

  // либо делаем то же самое, только уже с новыми кастомными экшенами и сами экшены вызывать без диспача
  const { increment, decrement } = useCounterActions();
  const handleIncrement = () => increment();
  const handleDecrement = () => decrement();

  return (
    <div>
      <h1 data-testid="value-title">{counterValue}</h1>
      <Button onClick={handleIncrement} data-testid="increment-btn">
        increment
      </Button>
      <Button onClick={handleDecrement} data-testid="decrement-btn">
        decrement
      </Button>
    </div>
  );
};
