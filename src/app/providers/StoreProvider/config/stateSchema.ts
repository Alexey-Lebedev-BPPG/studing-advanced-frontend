import { CounterSchema } from "entities/Counter";

// типизация всего стейта
export interface StateSchema {
  counter: CounterSchema;
}
