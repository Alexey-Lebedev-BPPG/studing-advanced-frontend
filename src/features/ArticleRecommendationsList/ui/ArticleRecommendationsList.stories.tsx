import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ArticleRecommendationsList } from "./ArticleRecommendationsList";
import { Article } from "@/entities/Article";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/shared/const/theme";

export default {
  title: "features/ArticleRecommendationsList",
  component: ArticleRecommendationsList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
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
