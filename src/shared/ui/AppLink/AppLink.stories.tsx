import { Meta, StoryFn } from '@storybook/react';
import { AppLink, AppLinkTheme } from './AppLink';
import { Theme } from '../../const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

export default {
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // добавляем аргумент в каждую сторис
  args: {
    to: '/',
  },

  component: AppLink,

  title: 'shared/AppLink',
} as Meta<typeof AppLink>;

const Template: StoryFn<typeof AppLink> = args => <AppLink {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Text',
  theme: AppLinkTheme.PRIMARY,
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Text',
  theme: AppLinkTheme.SECONDARY,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  children: 'Text',
  theme: AppLinkTheme.PRIMARY,
};
PrimaryDark.decorators = [ThemeDecorator(Theme.LIGHT)];

export const SecondaryDark = Template.bind({});
SecondaryDark.args = {
  children: 'Text',
  theme: AppLinkTheme.PRIMARY,
};
SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
