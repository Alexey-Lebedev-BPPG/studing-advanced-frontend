import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';
import { Theme } from '../../const/theme';
import { Tabs } from './Tabs';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

export default {
  title: 'shared/Tabs',
  component: Tabs,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Tabs>;

const Template: StoryFn<typeof Tabs> = arg => <Tabs {...arg} />;

export const Normal = Template.bind({});
Normal.args = {
  tabs: [
    { value: 'tab1', content: 'tab1' },
    { value: 'tab2', content: 'tab2' },
    { value: 'tab3', content: 'tab3' },
  ],
  selectedValue: 'tab2',
  onTabClick: action('onTabClick'),
};

export const Dark = Template.bind({});
Dark.args = {
  tabs: [
    { value: 'tab1', content: 'tab1' },
    { value: 'tab2', content: 'tab2' },
    { value: 'tab3', content: 'tab3' },
  ],
  selectedValue: 'tab2',
  onTabClick: action('onTabClick'),
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
