import { Meta, StoryFn } from '@storybook/react';
import { ProfileCard } from './ProfileCard';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import AvatarImg from '@/shared/assets/tests/AvatarImg.jpg';

export default {
  title: 'entities/CountrySelect',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ProfileCard>;

const Template: StoryFn<typeof ProfileCard> = args => <ProfileCard {...args} />;

export const Primary1 = Template.bind({});
Primary1.args = {
  data: {
    username: 'admin',
    age: 22,
    country: Country.Ukraine,
    lastname: 'test',
    first: 'asd',
    city: 'asd',
    currency: Currency.USD,
    avatar: AvatarImg,
  },
};

export const WithError = Template.bind({});
WithError.args = {
  error: 'true',
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
