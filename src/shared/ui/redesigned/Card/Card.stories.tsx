import { Meta, StoryFn } from '@storybook/react';
import { Card } from './Card';
import { Theme } from '../../../const/theme';
import { Text } from '../Text/Text';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

export default {
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: Card,
  title: 'shared/redesigned/Card',
} as Meta<typeof Card>;

const Template: StoryFn<typeof Card> = arg => <Card {...arg} />;

export const Normal = Template.bind({});
Normal.args = {
  children: <Text title='lorem' text='lorem lorem' />,
};

export const Dark = Template.bind({});
Dark.args = {
  children: <Text title='lorem' text='lorem lorem' />,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
