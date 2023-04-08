import { addDecorator } from "@storybook/react";
import { Theme } from "../../src/app/providers/ThemeProvider";
import { StyleDecorator } from "../../src/shared/config/storybook/StyleDecorator/StyleDecorator.ts";
import { ThemeDecorator } from "../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator.tsx";
import { RouterDecorator } from "../../src/shared/config/storybook/RouterDecorator/RouterDecorator.tsx";
import { SuspenseDecorator } from "../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator.tsx";
import { TranslationDecorator } from "../../src/shared/config/storybook/TranslationDecorator/TranslationDecorator.tsx";

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
// добавляем декоратор для переводов
addDecorator(TranslationDecorator);
// добавляем декоратор для обертывания саспенсом компонентов, которые вложены глубоко в дерево (в сторибуке возможен такой сценарий, когда компонент подгружается асинхронно(через lazy) и поэтому его необходимо обернуть в саспенс, чтоб дождаться загрузки)
addDecorator(SuspenseDecorator);
