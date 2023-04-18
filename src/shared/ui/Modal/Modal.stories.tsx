import { Meta, StoryFn } from '@storybook/react';
import { Theme } from '../../const/theme';
import { Modal } from './Modal';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

export default {
  title: 'shared/Modal',
  component: Modal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Modal>;

const Template: StoryFn<typeof Modal> = args => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  children:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus minima iusto commodi quia, id odio dolorem minus quisquam temporibus aliquam pariatur accusantium voluptate repudiandae! Iusto et, ipsum optio nisi veritatis sint aspernatur quo ea possimus autem? Ipsam minus aspernatur quos ab voluptatibus sunt aliquam minima officiis, consectetur vero illo consequatur corporis maxime animi voluptatem quaerat nam qui magnam. Ad, voluptatum harum voluptas eum expedita culpa in. Est architecto alias dolorem nostrum voluptatum numquam exercitationem minus non omnis amet, maiores culpa eveniet voluptates molestias? Ad laudantium beatae voluptates aperiam sunt. Quaerat laborum aspernatur blanditiis natus earum explicabo a perferendis ducimus quibusdam?',
};

export const Dark = Template.bind({});
Dark.args = {
  isOpen: true,
  children:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus minima iusto commodi quia, id odio dolorem minus quisquam temporibus aliquam pariatur accusantium voluptate repudiandae! Iusto et, ipsum optio nisi veritatis sint aspernatur quo ea possimus autem? Ipsam minus aspernatur quos ab voluptatibus sunt aliquam minima officiis, consectetur vero illo consequatur corporis maxime animi voluptatem quaerat nam qui magnam. Ad, voluptatum harum voluptas eum expedita culpa in. Est architecto alias dolorem nostrum voluptatum numquam exercitationem minus non omnis amet, maiores culpa eveniet voluptates molestias? Ad laudantium beatae voluptates aperiam sunt. Quaerat laborum aspernatur blanditiis natus earum explicabo a perferendis ducimus quibusdam?',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
