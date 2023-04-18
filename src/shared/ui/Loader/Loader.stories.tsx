import { Meta, StoryFn } from '@storybook/react';
import { Theme } from '../../const/theme';
import { Loader } from './Loader';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

export default {
  title: 'shared/Loader',
  component: Loader,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Loader>;

const Template: StoryFn<typeof Loader> = args => <Loader {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
