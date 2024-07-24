import { StoryFn, Meta } from '@storybook/react';
import { ViewCountPagination } from './ViewCountPagination';

export default {
  argTypes: { backgroundColor: { control: 'color' } },
  component: ViewCountPagination,
  title: 'shared/ViewCountPagination',
} as Meta<typeof ViewCountPagination>;

const Template: StoryFn<typeof ViewCountPagination> = args => (
  <ViewCountPagination {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  currentPage: 1,
  findTotal: 44,
  firstIndex: 1,
};
