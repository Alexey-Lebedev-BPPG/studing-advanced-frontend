import { Story } from "@storybook/react";
import { StateSchema, StoreProvider } from "@/app/providers/StoreProvider";
import { articleDetailsReducer } from "@/entities/Article";
import { addCommentFormReducer } from "@/features/AddCommentForm";
import { loginReducer } from "@/features/AuthByUsername";
import { profileReducer } from "@/features/EditableProfileCard";
import { articleDetailsPageReducer } from "@/pages/ArticleDetailsPage";
import { ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

// создаем стор для тестирования сторибука
const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addCommentForm: addCommentFormReducer,
  articleDetailsPage: articleDetailsPageReducer,
};

// декоратор, который подключает state. Используем замыкание, чтоб обернуть наш декоратор стейтом по ум. Также исп. DeepPartial, чтоб брать только нужные поля стейта
// добавляем аргумент приема редьюсеров, чтоб была возможность прокидывать сюда другие редьюсеры
export const StoreDecorator =
  (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) =>
    (StoryComponent: Story) =>
      (
        <StoreProvider
          initialState={state}
          asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
        >
          <StoryComponent />
        </StoreProvider>
      );
