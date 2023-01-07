import { DeepPartial } from "@reduxjs/toolkit";
import { Story } from "@storybook/react";
import { StateSchema, StoreProvider } from "app/providers/StoreProvider";

// декоратор, который подключает state. Используем замыкание, чтоб обернуть наш декоратор стейтом по ум. Также исп. DeepPartial, чтоб брать только нужные поля стейта
export const StoreDecorator =
  (state: DeepPartial<StateSchema>) => (StoryComponent: Story) =>
    (
      <StoreProvider initialState={state}>
        <StoryComponent />
      </StoreProvider>
    );
