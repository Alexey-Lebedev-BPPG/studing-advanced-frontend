import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';
import { Tabs } from './Tabs';
import { Theme } from '../../const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

export default {
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: Tabs,
  title: 'shared/Tabs',
} as Meta<typeof Tabs>;

const Template: StoryFn<typeof Tabs> = arg => <Tabs {...arg} />;

export const Normal = Template.bind({});
Normal.args = {
  onTabClick: action('onTabClick'),
  selectedValue: 'tab2',
  tabs: [
    { content: 'tab1', value: 'tab1' },
    { content: 'tab2', value: 'tab2' },
    { content: 'tab3', value: 'tab3' },
  ],
};

export const Dark = Template.bind({});
Dark.args = {
  onTabClick: action('onTabClick'),
  selectedValue: 'tab2',
  tabs: [
    { content: 'tab1', value: 'tab1' },
    { content: 'tab2', value: 'tab2' },
    { content: 'tab3', value: 'tab3' },
  ],
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
