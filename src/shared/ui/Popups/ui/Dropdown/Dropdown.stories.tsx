import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Theme } from "@/app/providers/ThemeProvider";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Button } from "../../../Button/Button";
import { Dropdown } from "./Dropdown";

export default {
  title: "shared/Dropdown",
  component: Dropdown,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (arg) => (
  <Dropdown {...arg} />
);

export const Normal = Template.bind({});
Normal.args = {
  trigger: <Button>Open</Button>,
  items: [{ content: "first" }, { content: "second" }, { content: "third" }],
};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
