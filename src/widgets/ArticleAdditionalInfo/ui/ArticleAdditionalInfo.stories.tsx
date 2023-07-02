import { StoryFn, Meta } from '@storybook/react';
import { ArticleAdditionalInfo } from './ArticleAdditionalInfo';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: ArticleAdditionalInfo,
  title: '***/ArticleAdditionalInfo',
} as Meta<typeof ArticleAdditionalInfo>;

const Template: StoryFn<typeof ArticleAdditionalInfo> = arg => (
  <ArticleAdditionalInfo {...arg} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
