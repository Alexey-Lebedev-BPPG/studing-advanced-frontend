import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';
import AddCommentForm from './AddCommentForm';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'features/AddCommentForm',
  component: AddCommentForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof AddCommentForm>;

const Template: StoryFn<typeof AddCommentForm> = arg => (
  <AddCommentForm {...arg} />
);

export const Normal = Template.bind({});
Normal.args = {
  onSendComment: action('onSendComment'),
};
Normal.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = { onSendComment: action('onSendComment') };
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
