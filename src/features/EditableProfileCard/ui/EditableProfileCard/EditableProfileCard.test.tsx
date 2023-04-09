import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { componentRender } from "@/shared/lib/tests/componentRender/componentRender";
import { Profile } from "@/entities/Profile";
import { Currency } from "@/entities/Currency";
import { Country } from "@/entities/Country";
import { $api } from "@/shared/api/api";
import { profileReducer } from "../../model/slice/profileSlice";
import { EditableProfileCard } from "./EditableProfileCard";

const profile: Profile = {
  id: "1",
  first: "admin",
  lastname: "admin",
  age: 456,
  currency: Currency.USD,
  country: Country.Kazakhstan,
  city: "Moscow",
  username: "admin213",
};

describe("features/EditableProfileCard", () => {
  //  используем beforeEach, чтоб componentRender выполнялась перед каждым тестом и не дублировать ее там
  beforeEach(() => {
    componentRender(<EditableProfileCard id="1" />, {
      initialState: {
        profile: {
          readonly: true,
          data: profile,
          form: profile,
        },
        // ввиду того, что в компоненте используются проверки на отображение кнопок (проверяет, что кнопки доступны для тех пользователей, id которых есть в профиле. поэтому также изменяем стейт, чтоб дать разрешение на отображение кнопок)
        user: { authData: { id: "1", username: "admin" } },
      },
      // позволяет вмонтировать редьюсер в компонент (см. функцию componentRender)
      asyncReducer: { profile: profileReducer },
    });
  });

  // добавляем async для всех тестов, где используется userEvent
  test("readonly should will change", async () => {
    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.EditButton")
    );
    expect(
      screen.getByTestId("EditableProfileCardHeader.CancelButton")
    ).toBeInTheDocument();
  });

  test("then click cancel value will initial", async () => {
    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.EditButton")
    );
    // очищаем пару инпутов
    await userEvent.clear(screen.getByTestId("ProfileCard.firstname"));
    await userEvent.clear(screen.getByTestId("ProfileCard.lastname"));
    // добавляем новые значения в инпуты
    await userEvent.type(screen.getByTestId("ProfileCard.firstname"), "user");
    await userEvent.type(screen.getByTestId("ProfileCard.lastname"), "user");
    // проверяем, что значения попали в инпуты
    expect(screen.getByTestId("ProfileCard.firstname")).toHaveValue("user");
    expect(screen.getByTestId("ProfileCard.lastname")).toHaveValue("user");

    // нажимаем на кнопку отмены
    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.CancelButton")
    );

    // проверяем, что значения в инпутах остались как и сначала
    expect(screen.getByTestId("ProfileCard.firstname")).toHaveValue("admin");
    expect(screen.getByTestId("ProfileCard.lastname")).toHaveValue("admin");
  });

  test("then write incorrect values to be errors", async () => {
    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.EditButton")
    );
    // очищаем инпут
    await userEvent.clear(screen.getByTestId("ProfileCard.firstname"));
    // нажимаем на кнопку сохранения
    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.SaveButton")
    );

    // проверяем, что появилась надпись с ошибкой
    expect(
      screen.getByTestId("EditableProfileCard.Error.Paragraph")
    ).toBeInTheDocument();
  });

  test("then none errors PUT-request going on the server", async () => {
    // мокаем запрос на изменение инпутов, используя spyOn(первым аргументом передаем инстанс аксиуса, а вторым аргументом название метода)
    const mockPutReq = jest.spyOn($api, "put");
    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.EditButton")
    );
    // вводим новые значения в инпут
    await userEvent.type(screen.getByTestId("ProfileCard.firstname"), "user");
    // нажимаем на кнопку сохранения
    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.SaveButton")
    );

    // проверяем, что запрос на обновление был вызван
    expect(mockPutReq).toHaveBeenCalled();
  });
});
