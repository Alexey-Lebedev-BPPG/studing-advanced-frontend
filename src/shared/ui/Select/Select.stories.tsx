import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Select } from './Select';

export default {
  title: 'shared/Select',
  component: Select,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = args => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Укажите значение',
  options: [
    { valueOpt: '1', content: 'Первый пункт' },
    { valueOpt: '2', content: 'Второй пункт' },
    { valueOpt: '3', content: 'Третий пункт' },
  ],
};
