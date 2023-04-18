import { Meta, StoryFn } from '@storybook/react';
import { Select } from './Select';

export default {
  title: 'shared/Select',
  component: Select,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Select>;

const Template: StoryFn<typeof Select> = args => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Укажите значение',
  options: [
    { valueOpt: '1', content: 'Первый пункт' },
    { valueOpt: '2', content: 'Второй пункт' },
    { valueOpt: '3', content: 'Третий пункт' },
  ],
};
