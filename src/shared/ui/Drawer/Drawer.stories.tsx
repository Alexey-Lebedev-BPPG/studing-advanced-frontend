import { Meta, StoryFn } from '@storybook/react';
import { Drawer } from './Drawer';
import { Theme } from '../../const/theme';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

export default {
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: Drawer,
  title: 'shared/Drawer',
} as Meta<typeof Drawer>;

const Template: StoryFn<typeof Drawer> = arg => <Drawer {...arg} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
