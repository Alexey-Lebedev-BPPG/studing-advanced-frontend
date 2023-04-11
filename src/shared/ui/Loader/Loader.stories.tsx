import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { Theme } from "../../const/theme";
import { Loader } from "./Loader";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";

export default {
  title: "shared/Loader",
  component: Loader,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
