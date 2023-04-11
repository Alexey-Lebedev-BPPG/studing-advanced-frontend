import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Theme } from "../../const/theme";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Text } from "../Text/Text";
import Card from "./Card";

export default {
  title: "shared/Card",
  component: Card,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (arg) => <Card {...arg} />;

export const Normal = Template.bind({});
Normal.args = {
  children: <Text title="lorem" text="lorem lorem" />,
};

export const Dark = Template.bind({});
Dark.args = {
  children: <Text title="lorem" text="lorem lorem" />,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
