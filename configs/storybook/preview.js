import { addDecorator } from "@storybook/react";
import { Theme } from "../../src/app/providers/ThemeProvider";
import { StyleDecorator } from "../../src/shared/config/storybook/StyleDecorator/StyleDecorator.ts";
import { ThemeDecorator } from "../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator.tsx";
import { RouterDecorator } from "../../src/shared/config/storybook/RouterDecorator/RouterDecorator.tsx";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

// здесь вызываются обертки для каждого сторибук компонента:
// добавляем декоратор для глобальных стилей
addDecorator(StyleDecorator);
// добавляем локально главную тему, а уже в стори компонентов будем использовать темную по необходимости
addDecorator(ThemeDecorator(Theme.LIGHT));
// добавляем общий декоратор для роутов
addDecorator(RouterDecorator);
