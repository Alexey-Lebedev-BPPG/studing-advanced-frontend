import { CounterSchema } from "entities/Counter";
import { UserSchema } from "entities/User";

// типизация всего стейта
export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;
}
