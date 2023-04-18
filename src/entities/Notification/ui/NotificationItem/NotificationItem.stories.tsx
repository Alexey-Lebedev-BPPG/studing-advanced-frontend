import { Meta, StoryFn } from '@storybook/react';
import { NotificationItem } from './NotificationItem';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'entities/Notification/NotificationItem',
  component: NotificationItem,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof NotificationItem>;

const Template: StoryFn<typeof NotificationItem> = arg => (
  <NotificationItem {...arg} />
);

export const Normal = Template.bind({});
Normal.args = {
  item: {
    id: '1',
    title: 'test123',
    description: 'testing123',
  },
};
Normal.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {
  item: {
    id: '1',
    title: 'test123',
    description: 'testing123',
  },
};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
