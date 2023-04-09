import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Theme } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator";
import { Popover } from "./Popover";

export default {
  title: "shared/Popover",
  component: Popover,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (arg) => <Popover {...arg} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
