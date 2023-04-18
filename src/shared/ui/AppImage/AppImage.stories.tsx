import { Meta, StoryFn } from '@storybook/react';
import { AppImage } from './AppImage';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'shared/AppImage',
  component: AppImage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof AppImage>;

const Template: StoryFn<typeof AppImage> = arg => <AppImage {...arg} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
