// проект в режиме дев

"start: ./node_modules/.bin/webpack serve --env port=3000 --env mode=development";

// проект в режиме дев + включается анализатор размеров пакетов и тулзы переводов
"start:debug: ./node_modules/.bin/webpack serve --env port=3000 --env mode=development --env modeDebug=true";

// запускаем одновременно проект и бэк
'start:dev: concurrently "npm start" "npm run start:dev:server"';

// бэкенд часть
"start:dev:server: node ./json-server/index.js";

// билд в прод режиме
("build:prod: ./node_modules/.bin/webpack --env mode=production");

// билд в дев режиме
("build:dev: ./node_modules/.bin/webpack --env mode=development");

// проверка линтером
("lint:ts: eslint 'src/**/*.{js,jsx,ts,tsx}'");

// фикс ошибок линтера
("lint:ts:fix: eslint 'src/**/*.{js,jsx,ts,tsx}' --fix");

// проверка линтером CSS
('lint:scss: npx stylelint "**/*.scss"');

// фикс ошибок линтера в CSS
('lint:scss:fix: npx stylelint "**/*.scss" --fix');

// юнит тесты
("test:unit: jest --config ./configs/jest/jest.config.ts");

// скриншотные тесты
("test:ui: npx loki test");

// принятие изменений в скриншотных тестах
("test:ui:ok: npx loki approve");

// "test:ui:ci": "loki update --requireReference --reactUri file:./storybook-static",
// "test:ui:report": "npm run test:ui:json && npm run test:ui:html",
// "test:ui:json": "node scripts/generate-visual-json-report.js",
// "test:ui:html": "npx reg-cli --from .loki/report.json --report .loki/report.html",

// запуск сторибука
("storybook: start-storybook -p 6006 -c ./configs/storybook");

// билд строибука
("storybook:build: npx build-storybook -c ./configs/storybook");

// установка хаски для пайплайнов
("prepare: husky install");
