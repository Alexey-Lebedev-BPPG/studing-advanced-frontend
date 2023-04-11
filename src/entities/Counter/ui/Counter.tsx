import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCounterValue } from "../model/selectors/getCounterValue/getCounterValue";
import { CounterActions } from "../model/slice/counterSlice";
import { Button } from "@/shared/ui/Button";

export const Counter: FC = () => {
  const dispatch = useDispatch();
  // берем селектор, который мы создали
  const counterValue = useSelector(getCounterValue);
  // применяем экшены по ум
  const increment = () => dispatch(CounterActions.increment());
  const decrement = () => dispatch(CounterActions.decrement());

  return (
    <div>
      <h1 data-testid="value-title">{counterValue}</h1>
      <Button onClick={increment} data-testid="increment-btn">
        increment
      </Button>
      <Button onClick={decrement} data-testid="decrement-btn">
        decrement
      </Button>
    </div>
  );
};
