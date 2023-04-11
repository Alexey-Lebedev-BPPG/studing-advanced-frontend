import { ComponentStory, ComponentMeta } from "@storybook/react";
import withMock from "storybook-addon-mock";
import ArticleRating from "./ArticleRating";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/shared/const/theme";

export default {
  title: "features/ArticleRating",
  component: ArticleRating,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  // добавляем декоратор для моканья запросов
  decorators: [withMock],
} as ComponentMeta<typeof ArticleRating>;

const Template: ComponentStory<typeof ArticleRating> = (arg) => (
  <ArticleRating {...arg} />
);

export const Normal = Template.bind({});
Normal.args = { articleId: "1" };
Normal.decorators = [StoreDecorator({ user: { authData: { id: "1" } } })];
// создаем моковый запрос для получения данных (используется как пример для RTKQuery запросов)
Normal.parameters = {
  mockData: [
    {
      url: `${__API__}/article-ratings?userId=1&articleId=1`,
      method: "GET",
      status: 200,
      response: [{ rate: 4 }],
    },
  ],
};

export const Dark = Template.bind({});
Dark.args = { articleId: "1" };
Dark.decorators = [
  StoreDecorator({ user: { authData: { id: "1" } } }),
  ThemeDecorator(Theme.DARK),
];
// создаем моковый запрос для получения данных (используется как пример для RTKQuery запросов)
Dark.parameters = {
  mockData: [
    {
      url: `${__API__}/article-ratings?userId=1&articleId=1`,
      method: "GET",
      status: 200,
      response: [{ rate: 3 }],
    },
  ],
};
