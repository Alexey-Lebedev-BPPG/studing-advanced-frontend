import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Theme } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { action } from "@storybook/addon-actions";
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator";
import AddCommentForm from "./AddCommentForm";

export default {
  title: "feature/AddCommentForm",
  component: AddCommentForm,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof AddCommentForm>;

const Template: ComponentStory<typeof AddCommentForm> = (arg) => (
  <AddCommentForm {...arg} />
);

export const Normal = Template.bind({});
Normal.args = {
  onSendComment: action("onSendComment"),
};
Normal.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
