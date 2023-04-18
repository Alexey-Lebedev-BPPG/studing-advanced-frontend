import { Meta, StoryFn } from '@storybook/react';
import AboutPage from './AboutPage';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'pages/AboutPage',
  component: AboutPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof AboutPage>;

const Template: StoryFn<typeof AboutPage> = arg => <AboutPage {...arg} />;

export const Light = Template.bind({});
Light.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
