import { AsyncThunkAction } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import axios, { AxiosStatic } from "axios";

// создаем универсальный тип для функции, которая принимает аргумент и возращает любой экшен
type ActionCreatorType<Return, Arg, RejectedValue> = (
  arg: Arg
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

// мокаем аксиос, чтоб исп. в тестировании
jest.mock("axios");

// чтоб использовать не только модуль, но и все внутренности, мокаем глубоким способом (добавляем флаг true вторым аргументом в функцию mocked)
const mockedAxios = jest.mocked(axios, true);

// создаем класс, внутри которого мы изорируем логику по тестированию асинхронных thuk-ов
// в дженерике: первый тип - то, что возвращает thunk; второй - аргумент; третий - то, что возвращает thunk при ошибке
export class TestAsyncThunk<Return, Arg, RejectedValue> {
  // добавляем типы для диспатча, получения стейта и thunk-а
  dispatch: jest.MockedFn<any>;

  getState: () => StateSchema;

  actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;

  // мокаем инстанс аксиоса
  api: jest.MockedFunctionDeep<AxiosStatic>;

  // мокаем функцию навигации
  navigate: jest.MockedFn<any>;

  // принимает аргументом сам thunk (например loginByUsername) из вне и остальные аргументы
  constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn();
    this.getState = jest.fn();
    this.api = mockedAxios;
    this.navigate = jest.fn();
  }

  // функция, с помощью которой будем вызывать thunk
  async callThunk(arg: Arg) {
    // вызов thunk-а, который мы сохранили в классе, который создает экшен и возвращает его
    const action = this.actionCreator(arg);

    // вызываем экшен, который принимает 3 аргумента: диспатч, getState и extra (которые нужно замокать)
    const result = await action(this.dispatch, this.getState, {
      api: this.api,
      navigate: this.navigate,
    });
    // возвращаем результат
    return result;
  }
}
