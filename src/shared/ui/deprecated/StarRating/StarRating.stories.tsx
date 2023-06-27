import { Meta, StoryFn } from '@storybook/react';
import { StarRating } from './StarRating';
import { Theme } from '../../../const/theme';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

export default {
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: StarRating,
  title: 'shared/StarRating',
} as Meta<typeof StarRating>;

const Template: StoryFn<typeof StarRating> = arg => <StarRating {...arg} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
