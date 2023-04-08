import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Theme } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import AdminPanelPage from "./AdminPanelPage";

export default {
  title: "***/AdminPanelPage",
  component: AdminPanelPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof AdminPanelPage>;

const Template: ComponentStory<typeof AdminPanelPage> = (arg) => (
  <AdminPanelPage {...arg} />
);

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
