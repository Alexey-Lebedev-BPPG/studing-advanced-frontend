// делаем команду на редактирование профиля
export const updateProfile = (firstname = 'new', lastname = 'lastname') => {
  // получаем кнопку редактирования
  cy.getByTestId('EditableProfileCardHeader.EditButton').click();
  // получаем необходимые инпутники, очищаем их и вводим новые значения
  cy.getByTestId('ProfileCard.firstname').clear().type(firstname);
  cy.getByTestId('ProfileCard.lastname').clear().type(lastname);
  // получаем кнопку сохранения и нажимаем на нее
  cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

// делаем запрос на сброс данных
export const resetProfile = (profileId: string) =>
  cy.request({
    method: 'PUT',
    url: `http://localhost:8000/profile/${profileId}`,
    headers: { Authorization: 'test' },
    body: {
      id: '4',
      first: 'test',
      lastname: 'user',
      age: 465,
      currency: 'EUR',
      country: 'Ukraine',
      city: 'Moscow',
      username: 'testuser',
      avatar:
        'https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg',
    },
  });

declare global {
  namespace Cypress {
    interface Chainable {
      // здесь определяем все команды, чтоб срабатывал автокомплит
      updateProfile(firstname?: string, lastname?: string): Chainable<void>;
      resetProfile(profileId: string): Chainable<void>;
    }
  }
}
