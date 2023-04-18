import { Meta, StoryFn } from '@storybook/react';
import { ArticlePageFilters } from './ArticlePageFilters';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'pages/ArticlesPage/ArticlePageFilters',
  component: ArticlePageFilters,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ArticlePageFilters>;

const Template: StoryFn<typeof ArticlePageFilters> = arg => (
  <ArticlePageFilters {...arg} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
