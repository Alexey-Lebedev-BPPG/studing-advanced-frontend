import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CommentList } from "./CommentList";

export default {
  title: "entities/Comment/CommentList",
  component: CommentList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (arg) => (
  <CommentList {...arg} />
);

export const Normal = Template.bind({});
Normal.args = {
  comments: [
    {
      id: "1",
      text: "lorem1",
      user: {
        id: "1",
        username: "lorem1",
      },
    },
    {
      id: "2",
      text: "lorem2",
      user: {
        id: "2",
        username: "lorem2",
      },
    },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  comments: [],
  isLoading: true,
};