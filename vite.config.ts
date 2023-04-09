import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// обязательное условие - вынести index.html в корень проекта (поэтому мы просто скопируем этот файл в корень)
export default defineConfig({
  plugins: [
    // позволяет работать с svg (указываем exportAsDefault, т.к. все svg мы импортили по дефолту)
    svgr({ exportAsDefault: true }),
    // react - сразу позволяет работать с реактом и тайпскриптом
    react(),
  ],
  // указываем алиасы для путей
  resolve: { alias: [{ find: "@", replacement: "/src" }] },
  // прокидываем глобальные переменные
  define: {
    __IS_DEV__: JSON.stringify(true),
    __IS_DEV_DEBUG__: JSON.stringify(false),
    __API__: JSON.stringify("http://localhost:8000"),
    __PROJECT__: JSON.stringify("frontend"),
  },
});
