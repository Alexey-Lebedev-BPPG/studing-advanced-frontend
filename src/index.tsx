import App from "app/App";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "app/providers/ThemeProvider/ui/ThemeProvider";
import { ErrorBoundary } from "app/providers/ErrorBoundary";
// импортим конфиг переводов
import "shared/config/i18n/i18n";
// импорт глобальных стилей
import "app/styles/index.scss";

render(
  <BrowserRouter>
    {/* чтоб обработать ошибки */}
    <ErrorBoundary>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </BrowserRouter>,
  document.getElementById("root")
);
