import { Article } from "@/entities/Article";

const defaultArticle = {
  title: "Научная статья - Биология",
  subtitle: "БиологиЯ",
  img: "https://avatars.mds.yandex.net/get-zen_doc/2746556/pub_5f50dd7e1a1ddf4776aa5569_5f50decd2506f211d1de6284/scale_1200",
  views: 1022,
  createdAt: "26.02.2022",
  userId: "1",
  type: ["SCIENCE"],
  blocks: [],
};

// делаем запрос на создание статьи
export const createArticle = (article?: Article) =>
  cy
    .request({
      method: "POST",
      url: "http://localhost:8000/articles",
      headers: { Authorization: "test" },
      body: article || defaultArticle,
    })
    .then((res) => res.body);

// делаем запрос на удаление статьи
export const removeArticle = (articleId: string) =>
  cy.request({
    method: "DELETE",
    url: `http://localhost:8000/articles${"/" + articleId}`,
    headers: { Authorization: "test" },
  });

declare global {
  namespace Cypress {
    interface Chainable {
      // здесь определяем все команды, чтоб срабатывал автокомплит
      createArticle(article?: Article): Chainable<Article>;
      removeArticle(articleId: string): Chainable<void>;
    }
  }
}
