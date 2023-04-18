import { Meta, StoryFn } from '@storybook/react';
import { ArticleViewSelector } from './ArticleViewSelector';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'entities/Article/ArticleViewSelector',
  component: ArticleViewSelector,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ArticleViewSelector>;

const Template: StoryFn<typeof ArticleViewSelector> = arg => (
  <ArticleViewSelector {...arg} />
);

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
