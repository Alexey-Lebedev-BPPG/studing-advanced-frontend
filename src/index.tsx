import App from "app/App";
// импортим конфиг переводов
import "shared/config/i18n/i18n";
// импорт глобальных стилей
import "app/styles/index.scss";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
// для темы
import ThemeProvider from "app/providers/ThemeProvider/ui/ThemeProvider";
// для отлова ошибок
import { ErrorBoundary } from "app/providers/ErrorBoundary";
// для редакса
import { StoreProvider } from "app/providers/StoreProvider";

render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </StoreProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
