import { StoryFn, Meta } from '@storybook/react';
import { QRCode } from './QRCode';

export default {
  argTypes: { backgroundColor: { control: 'color' } },
  component: QRCode,
  title: 'shared/QRCode',
} as Meta<typeof QRCode>;

const Template: StoryFn<typeof QRCode> = args => <QRCode {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  value: 'testText',
};
