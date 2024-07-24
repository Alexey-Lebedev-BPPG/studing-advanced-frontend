import { StoryFn, Meta } from '@storybook/react';
import { Pagination } from './Pagination';

export default {
  argTypes: { backgroundColor: { control: 'color' } },
  component: Pagination,
  title: 'shared/Pagination',
} as Meta<typeof Pagination>;

const Template: StoryFn<typeof Pagination> = args => <Pagination {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  findTotal: 67,
  page: 1,
  rowsPerPage: 20,
};
