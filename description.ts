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

// генерация шаблонов папок и файлов
("generate:slices: node ./scripts/createSlice/index.js");

// деплоим на netlify
// 1. логинимся
// 2. выбираем вкладку Site
// 3. import from git
// 4. выбираем свой проект
// 5. нажимаем на него и выбираем дефолт ветку - мастер;
// Build command - в нашем случае npm run build:prod;
// Publish directory - в нашем случае - build
// 6. при необходимости задаем переменные окружения
// 7. нажимаем деплой. ждем когда задеплоится и можно использовать
// 8. создаем в корне файл netlify.toml, который заполняем
// 9. чтоб не возникало конфликтов при использовании устаревших библиотек, добавлем переменную окружения NPM_FLAGS: --force

// чтоб создать свой плагин:
// 1. создаем новую папку, которая должна начинаться с eslint-plugin
// 2. устанвливаем  npm i -g yo
// 3. устанавливаем npm i -g generator-eslint
// 3. запускаем команду yo eslint:plugin
// 4. заполняем все по инструкции
// 5. в папке lib=> index.js есть список правил
// 6. чтоб сгенерировать новое правило - yo eslint:rule
// 7. заполняем все по иструкции (
// ? What is your name? alexey
// ? Where will this rule be published? ESLint
// Plugin
// ? What is the rule ID? path-checker
// ? Type a short description of this rule:
// feature sliced relative path checker
// ? Type a short example of the code that will
// fail: test error)
// AST - абстрактное синтаксическое дерево (https://astexplorer.net)
// подробный гайд по созданию плагина (https://eslint.org/docs/latest/extend/custom-rules)
// внеся изменения в плагин, запускаем npm login и указываем свои данные
// делаем npm publish и проверям на сайте публикование пакета
// можно устанавливать в свой проект данные пакет
// добавляем название плагина в поле plugins в файле .eslintrc.js
// чтоб пакет отображал в виде предупреждений, в поле rules в файле .eslintrc.js указываем  "path-checher-ulbi-example/path-checker": "warn",
// если хотим внести какие-то изменения, то вносим их, меняем версию в файле package.json и снова вызываем npm publish

// устанавливаем npm i -D @testing-library/user-event, чтоб в тестах userEvent импортился из testing-library

// чтоб обновить версию реакта:
// npm i react@latest @types/react@latest react-dom@latest @types/react-dom@latest
// обновляем подход в главном index.ts

// пакет dependency-cruiser используется для поиска круговых зависимостей и неиспользуемого кода (разобраться дополнительно)

// один из вариантов вычисления, когда сайт открыт на мобильной версии, можно использовать библу react-device-detect. Но лучше использовать функцию detectDevice как в проекте

// @use-gesture/react - библиотека для dnd, @react-spring/web - библиотека для анимаций
