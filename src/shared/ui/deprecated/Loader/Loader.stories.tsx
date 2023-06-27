import { Meta, StoryFn } from '@storybook/react';
import { Loader } from './Loader';
import { Theme } from '../../../const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

export default {
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: Loader,
  title: 'shared/Loader',
} as Meta<typeof Loader>;

const Template: StoryFn<typeof Loader> = args => <Loader {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
