describe("Пользователь заходит на страницу списка статей", () => {
  // авторизовываемся перед каждым тестом и переходим на страницу статей
  beforeEach(() => {
    cy.login().then((data) => {
      cy.visit("articles");
    });
  });
  it("Статьи успешно подгружаются", () => {
    // проверяем, что отрисовался
    cy.getByTestId("ArticleList").should("exist");
    // проверяем, что у нас хотя бы 3 статьи подгрузились
    cy.getByTestId("ArticleListItem").should("have.length.greaterThan", 3);
  });
});
