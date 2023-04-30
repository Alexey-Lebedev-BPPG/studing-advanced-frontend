import { Meta, StoryFn } from '@storybook/react';
import { CommentCard } from './CommentCard';

export default {
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: CommentCard,
  title: 'entities/Comment/CommentCard',
} as Meta<typeof CommentCard>;

const Template: StoryFn<typeof CommentCard> = arg => <CommentCard {...arg} />;

export const Normal = Template.bind({});
Normal.args = {
  comment: {
    id: '1',
    text: 'lorem1',
    user: {
      id: '1',
      username: 'lorem1',
    },
  },
};

export const Loading = Template.bind({});
Loading.args = {
  comment: {
    id: '1',
    text: 'lorem1',
    user: {
      id: '1',
      username: 'lorem1',
    },
  },
  isLoading: true,
};
