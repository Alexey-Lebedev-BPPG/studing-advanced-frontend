import { Story } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

// декоратор, который подключает роуты
export const RouterDecorator = (story: () => Story) => (
  <BrowserRouter>{story()}</BrowserRouter>
);
