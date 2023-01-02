import { Story } from "@storybook/react";
import "app/styles/index.scss";

// декоратор, который подключает глобальные стили
export const StyleDecorator = (story: () => Story) => story();
