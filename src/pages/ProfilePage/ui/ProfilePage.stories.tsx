import { Meta, StoryFn } from '@storybook/react';
import ProfilePage from './ProfilePage';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ProfilePage>;

const Template: StoryFn<typeof ProfilePage> = args => <ProfilePage {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [
  StoreDecorator({
    profile: {
      form: {
        username: 'admin',
        age: 22,
        country: Country.Ukraine,
        lastname: 'test',
        first: 'asd',
        city: 'asd',
        currency: Currency.USD,
      },
    },
  }),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    profile: {
      form: {
        username: 'admin',
        age: 22,
        country: Country.Ukraine,
        lastname: 'test',
        first: 'asd',
        city: 'asd',
        currency: Currency.USD,
      },
    },
  }),
];
