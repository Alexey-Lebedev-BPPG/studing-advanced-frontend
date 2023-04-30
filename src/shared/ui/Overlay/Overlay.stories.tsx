import { Meta, StoryFn } from '@storybook/react';
import { Overlay } from './Overlay';
import { Theme } from '../../const/theme';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

export default {
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: Overlay,
  title: 'shared/Overlay',
} as Meta<typeof Overlay>;

const Template: StoryFn<typeof Overlay> = arg => <Overlay {...arg} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
