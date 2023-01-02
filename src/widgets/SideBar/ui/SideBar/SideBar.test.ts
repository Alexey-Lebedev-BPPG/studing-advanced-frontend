import { fireEvent, render, screen } from "@testing-library/react";
import { withTranslation } from "react-i18next";
import { renderWithTranslation } from "shared/lib/tests/renderWithTranslation/renderWithTranslation";
import { SideBar } from "./SideBar";

describe("SideBar", () => {
  test("Test render", () => {
    // чтоб можно было тестить с i18next
    // const SidebarWithTranslation = withTranslation()(SideBar);
    // render(<SidebarWithTranslation />);
    // после добавления обертки для тестирования с переводами, получаем такой синтаксис
    renderWithTranslation(<Sidebar />);
    expect(screen.getByTestId("sidebar").toBeInTheDocument());
  });

  test("test toggle", () => {
    renderWithTranslation(<Sidebar />);
    const toggleButton = screen.getByTestId("sidebar-toggle");
    expect(screen.getByTestId("sidebar").toBeInTheDocument());
    fireEvent.click(toggleButton);
    expect(screen.getByTestId("sidebar").toHaveClass("collapsed"));
  });
});
