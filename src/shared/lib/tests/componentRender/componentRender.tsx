import { ReducersMapObject } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import { StateSchema, StoreProvider } from "@/app/providers/StoreProvider";
// eslint-disable-next-line path-checher-ulbi-example/layer-imports
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import i18nForTests from "@/shared/config/i18n/i18nForTests";
import { Theme } from "@/shared/const/theme";
// eslint-disable-next-line path-checher-ulbi-example/layer-imports
import "@/app/styles/index.scss";

export interface IComponentRenderOptions {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
  // добавляем этот пропс, чтоб при тестировании в компонентах, которые обернуты в DynamicModuleLoader, они могли иметь доступ к стейту
  asyncReducer?: DeepPartial<ReducersMapObject<StateSchema>>;
  theme?: Theme;
}

interface TestProviderProps {
  children: ReactNode;
  options?: IComponentRenderOptions;
}

// выносим все обертки в одну, чтоб можно было также использовать в изолированных тестах в сайпресс
export function TestProvider(props: TestProviderProps) {
  const { children, options = {} } = props;
  const {
    route = "/",
    initialState,
    asyncReducer,
    theme = Theme.LIGHT,
  } = options;
  return (
    <MemoryRouter initialEntries={[route]}>
      {/* добавляем еще сторпровайдер для тестов */}
      <StoreProvider asyncReducers={asyncReducer} initialState={initialState}>
        <I18nextProvider i18n={i18nForTests}>
          <ThemeProvider initialTheme={theme}>
            <div className={`app ${theme}`}>{children}</div>
          </ThemeProvider>
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  );
}

// обертка для тестируемого компонента с добавлением конфигурации для роутов и i18n
export const componentRender = (
  component: ReactNode,
  options: IComponentRenderOptions = {}
) => render(<TestProvider options={options}>{component}</TestProvider>);

// !!! переделать на 18 реакт (Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot)
