import { StoryFn, Meta } from '@storybook/react';
import { Tooltip } from './Tooltip';
// import { IconButton } from '../../../Buttons';
// import { CloseWhiteSVG } from '@/shared/assets/svg/buttons';

export default {
  argTypes: { backgroundColor: { control: 'color' } },
  component: Tooltip,
  title: 'shared/Popovers/Tooltip',
} as Meta<typeof Tooltip>;

const Template: StoryFn<typeof Tooltip> = args => <Tooltip {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: (
    // <IconButton>
    //   <CloseWhiteSVG />
    // </IconButton>
    <div />
  ),
  placement: 'bottom',
  titleText: 'testing',
};
