import { Story } from "@storybook/react";
import { Theme } from "app/providers/ThemeProvider";

// декоратор, который подключает темы. Используем замыкание, чтоб обернуть наш декоратор темой, которую выбрал пользователь
export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) =>
  (
    <div className={`app ${theme}`}>
      <StoryComponent />
    </div>
  );
