import { ComponentStory, ComponentMeta } from "@storybook/react";
import withMock from "storybook-addon-mock";
import { Theme } from "@/app/providers/ThemeProvider";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { Article } from "@/entities/Article";
import { ArticleRecommendationsList } from "./ArticleRecommendationsList";

export default {
  title: "features/ArticleRecommendationsList",
  component: ArticleRecommendationsList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  // добавляем декоратор для моканья запросов
  decorators: [withMock],
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = (arg) => (
  <ArticleRecommendationsList {...arg} />
);

// создаем моковую статью
const mockArticle: Article = {
  id: "1",
  img: "",
  createdAt: "",
  views: 234,
  user: { id: "", username: "" },
  blocks: [],
  type: [],
  title: "123",
  subtitle: "123123",
};

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
// создаем моковый запрос для получения данных (используется как пример для RTKQuery запросов)
Normal.parameters = {
  mockData: [
    {
      url: `${__API__}/articles?_limit=3`,
      method: "GET",
      status: 200,
      response: [
        { ...mockArticle, id: "1" },
        { ...mockArticle, id: "2" },
        { ...mockArticle, id: "3" },
      ],
    },
  ],
};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
