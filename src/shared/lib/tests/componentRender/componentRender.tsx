import { ReducersMapObject } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import { StateSchema, StoreProvider } from "@/app/providers/StoreProvider";
import i18nForTests from "@/shared/config/i18n/i18nForTests";

export interface IComponentRenderOptions {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
  // добавляем этот пропс, чтоб при тестировании в компонентах, которые обернуты в DynamicModuleLoader, они могли иметь доступ к стейту
  asyncReducer?: DeepPartial<ReducersMapObject<StateSchema>>;
}
// обертка для тестируемого компонента с добавлением конфигурации для роутов и i18n
export const componentRender = (
  component: ReactNode,
  options: IComponentRenderOptions = {}
) => {
  const { route = "/", initialState, asyncReducer } = options;

  return render(
    <MemoryRouter initialEntries={[route]}>
      {/* добавляем еще сторпровайдер для тестов */}
      <StoreProvider asyncReducers={asyncReducer} initialState={initialState}>
        <I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  );
};

// !!! переделать на 18 реакт (Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot)
