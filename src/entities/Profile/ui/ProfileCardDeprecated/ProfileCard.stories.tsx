import { Meta, StoryFn } from '@storybook/react';
import { ProfileCard } from '../ProfileCard/ProfileCard';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import AvatarImg from '@/shared/assets/tests/AvatarImg.jpg';

export default {
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: ProfileCard,
  title: 'entities/CountrySelect',
} as Meta<typeof ProfileCard>;

const Template: StoryFn<typeof ProfileCard> = args => <ProfileCard {...args} />;

export const Primary1 = Template.bind({});
Primary1.args = {
  data: {
    age: 22,
    avatar: AvatarImg,
    city: 'asd',
    country: Country.Ukraine,
    currency: Currency.USD,
    first: 'asd',
    lastname: 'test',
    username: 'admin',
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
