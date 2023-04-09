import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";
import AvatarImg from "@/shared/assets/tests/AvatarImg.jpg";
import { ProfileCard } from "./ProfileCard";

export default {
  title: "entities/CountrySelect",
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
  <ProfileCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  data: {
    username: "admin",
    age: 22,
    country: Country.Ukraine,
    lastname: "test",
    first: "asd",
    city: "asd",
    currency: Currency.USD,
    avatar: AvatarImg,
  },
};

export const WithError = Template.bind({});
WithError.args = {
  error: "true",
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
