import { Preview } from '@storybook/react';
import { Theme } from '../../src/shared/const/theme';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';
// import { TranslationDecorator } from '../../src/shared/config/storybook/TranslationDecorator/TranslationDecorator';

const parameters: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    // добавляем, чтоб компоненты сторибука открывались на весь экран без паддингов
    layout: 'fullscreen',
    // настройки аддона storybook-addon-themes под темы
    themes: {
      // указываем дефолтную тему
      default: 'dark',
      // перечисляем все доступные темы (название, навешиваемый класс css, цвет рядом с названием в селекте выбора)
      list: [
        { name: 'light', class: Theme.LIGHT, color: '#ffffff' },
        { name: 'dark', class: Theme.DARK, color: '#000000' },
        { name: 'orange', class: Theme.ORANGE, color: '#ffb005' },
      ],
    },
  },
};
// // здесь вызываются обертки для каждого сторибук компонента:
export const decorators = [
  // добавляем декоратор для глобальных стилей
  StyleDecorator,
  // добавляем локально главную тему, а уже в стори компонентов будем использовать темную по необходимости
  ThemeDecorator(Theme.LIGHT),
  // добавляем общий декоратор для роутов
  RouterDecorator,
  // добавляем декоратор для переводов
  // TranslationDecorator,
  // добавляем декоратор для обертывания саспенсом компонентов, которые вложены глубоко в дерево (в сторибуке возможен такой сценарий, когда компонент подгружается асинхронно(через lazy) и поэтому его необходимо обернуть в саспенс, чтоб дождаться загрузки)
  SuspenseDecorator,
];

export default parameters;
