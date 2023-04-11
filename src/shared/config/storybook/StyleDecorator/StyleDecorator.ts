import { Story } from "@storybook/react";
// eslint-disable-next-line path-checher-ulbi-example/layer-imports
import "@/app/styles/index.scss";

// декоратор, который подключает глобальные стили
export const StyleDecorator = (story: () => Story) => story();
