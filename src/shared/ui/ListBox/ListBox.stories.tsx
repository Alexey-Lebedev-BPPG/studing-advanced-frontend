import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Theme } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { ListBox } from "./ListBox";

export default {
  title: "shared/ListBox",
  component: ListBox,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  // добавляем декоратор, чтоб сделать отступы в 100px
  decorators: [
    (Story) => (
      <div style={{ padding: "100px" }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (arg) => <ListBox {...arg} />;

export const TopLeftLight = Template.bind({});
TopLeftLight.args = {
  direction: "top left",
  value: "top left",
  items: [
    { content: "123123123123123123123123123", value: "123" },
    { content: "234234234234234234234234234", value: "234" },
    { content: "345345345345345345345345345", value: "345" },
  ],
};

export const TopLeftDark = Template.bind({});
TopLeftDark.args = {
  direction: "top left",
  value: "top left",
  items: [
    { content: "123123123123123123123123123", value: "123" },
    { content: "234234234234234234234234234", value: "234" },
    { content: "345345345345345345345345345", value: "345" },
  ],
};
TopLeftDark.decorators = [ThemeDecorator(Theme.DARK)];

export const TopRightLight = Template.bind({});
TopRightLight.args = {
  direction: "top right",
  value: "top right",
  items: [
    { content: "123123123123123123123123123", value: "123" },
    { content: "234234234234234234234234234", value: "234" },
    { content: "345345345345345345345345345", value: "345" },
  ],
};

export const TopRightDark = Template.bind({});
TopRightDark.args = {
  direction: "top right",
  value: "top right",
  items: [
    { content: "123123123123123123123123123", value: "123" },
    { content: "234234234234234234234234234", value: "234" },
    { content: "345345345345345345345345345", value: "345" },
  ],
};
TopRightDark.decorators = [ThemeDecorator(Theme.DARK)];

export const BottomLeftLight = Template.bind({});
BottomLeftLight.args = {
  direction: "bottom left",
  value: "bottom left",
  items: [
    { content: "123123123123123123123123123", value: "123" },
    { content: "234234234234234234234234234", value: "234" },
    { content: "345345345345345345345345345", value: "345" },
  ],
};

export const BottomLeftDark = Template.bind({});
BottomLeftDark.args = {
  direction: "bottom left",
  value: "bottom left",
  items: [
    { content: "123123123123123123123123123", value: "123" },
    { content: "234234234234234234234234234", value: "234" },
    { content: "345345345345345345345345345", value: "345" },
  ],
};
BottomLeftDark.decorators = [ThemeDecorator(Theme.DARK)];

export const BottomRightLight = Template.bind({});
BottomRightLight.args = {
  direction: "bottom right",
  value: "bottom right",
  items: [
    { content: "123123123123123123123123123", value: "123" },
    { content: "234234234234234234234234234", value: "234" },
    { content: "345345345345345345345345345", value: "345" },
  ],
};

export const BottomRightDark = Template.bind({});
BottomRightDark.args = {
  direction: "bottom right",
  value: "bottom right",
  items: [
    { content: "123123123123123123123123123", value: "123" },
    { content: "234234234234234234234234234", value: "234" },
    { content: "345345345345345345345345345", value: "345" },
  ],
};
BottomRightDark.decorators = [ThemeDecorator(Theme.DARK)];
