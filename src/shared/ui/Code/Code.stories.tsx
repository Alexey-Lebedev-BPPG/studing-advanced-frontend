import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Theme } from "../../const/theme";
import { Code } from "./Code";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";

export default {
  title: "shared/Code",
  component: Code,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (arg) => <Code {...arg} />;

export const Dark = Template.bind({});
Dark.args = {
  text:
    "export default {\n" +
    "    title: 'shared/Code',\n" +
    "    component: Code,\n" +
    "    argTypes: {\n" +
    "        backgroundColor: { control: 'color' },\n" +
    "    },\n" +
    "} as ComponentMeta<typeof Code>;\n" +
    "\n" +
    "const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;\n" +
    "\n" +
    "export const Normal = Template.bind({});",
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
