import { Meta, StoryFn } from '@storybook/react';
import { Button } from '../../../Button/Button';
import { Dropdown } from './Dropdown';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'shared/Dropdown',
  component: Dropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Dropdown>;

const Template: StoryFn<typeof Dropdown> = arg => <Dropdown {...arg} />;

export const Normal = Template.bind({});
Normal.args = {
  trigger: <Button>Open</Button>,
  items: [{ content: 'first' }, { content: 'second' }, { content: 'third' }],
};

export const Dark = Template.bind({});
Dark.args = {
  trigger: <Button>Open</Button>,
  items: [{ content: 'first' }, { content: 'second' }, { content: 'third' }],
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
