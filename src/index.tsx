import App from "app/App";
// импортим конфиг переводов
import "shared/config/i18n/i18n";
// импорт глобальных стилей
import "app/styles/index.scss";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// для темы
import ThemeProvider from "app/providers/ThemeProvider/ui/ThemeProvider";
// для отлова ошибок
import { ErrorBoundary } from "app/providers/ErrorBoundary";
// для редакса
import { StoreProvider } from "app/providers/StoreProvider";

const container = document.getElementById("root");

if (!container) throw new Error("Error load app");

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </StoreProvider>
  </BrowserRouter>
);
