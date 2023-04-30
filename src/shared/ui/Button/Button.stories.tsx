import { Meta, StoryFn } from '@storybook/react';
import { Button, ButtonSize, ButtonTheme } from './Button';
import { Theme } from '../../const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

export default {
  argTypes: {
    backgroundColor: { control: 'color' },
  },

  component: Button,
  // меняем название сториса
  title: 'shared/Button',
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = args => <Button {...args} />;

// создаем виды нашей кнопки в зависимости от пропсов
export const Primary = Template.bind({});
Primary.args = {
  children: 'Text',
};

export const Clear = Template.bind({});
Clear.args = {
  children: 'Text',
  theme: ButtonTheme.CLEAR,
};

export const ClearInverted = Template.bind({});
ClearInverted.args = {
  children: 'Text',
  theme: ButtonTheme.CLEAR_INVERTED,
};

export const Outline = Template.bind({});
Outline.args = {
  children: 'Text',
  theme: ButtonTheme.OUTLINE,
};

export const OutlineL = Template.bind({});
OutlineL.args = {
  children: 'Text',
  size: ButtonSize.L,
  theme: ButtonTheme.OUTLINE,
};

export const OutlineXL = Template.bind({});
OutlineXL.args = {
  children: 'Text',
  size: ButtonSize.XL,
  theme: ButtonTheme.OUTLINE,
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
  children: 'Text',
  theme: ButtonTheme.OUTLINE,
};
// можно декораторы применять не только глобально в файле configs/storybook/preview.js, но и непосредственно в самих компонентах
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const BackgroundTheme = Template.bind({});
BackgroundTheme.args = {
  children: 'Text',
  theme: ButtonTheme.BACKGROUND,
};

export const BackgroundInverted = Template.bind({});
BackgroundInverted.args = {
  children: 'Text',
  theme: ButtonTheme.BACKGROUND_INVERTED,
};

export const Square = Template.bind({});
Square.args = {
  children: '>',
  square: true,
  theme: ButtonTheme.BACKGROUND_INVERTED,
};

export const SquareL = Template.bind({});
SquareL.args = {
  children: '>',
  size: ButtonSize.L,
  square: true,
  theme: ButtonTheme.BACKGROUND_INVERTED,
};

export const SquareXL = Template.bind({});
SquareXL.args = {
  children: '>',
  size: ButtonSize.XL,
  square: true,
  theme: ButtonTheme.BACKGROUND_INVERTED,
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: '>',
  disabled: true,
  theme: ButtonTheme.OUTLINE,
};
