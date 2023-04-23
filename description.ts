// проект в режиме дев

'start: ./node_modules/.bin/webpack serve --env port=3000 --env mode=development';

// проект в режиме дев + включается анализатор размеров пакетов и тулзы переводов
'start:debug: ./node_modules/.bin/webpack serve --env port=3000 --env mode=development --env modeDebug=true';

// запускаем одновременно проект и бэк
'start:dev: concurrently "npm start" "npm run start:dev:server"';

// бэкенд часть
'start:dev:server: node ./json-server/index.js';

// билд в прод режиме
('build:prod: ./node_modules/.bin/webpack --env mode=production');

// билд в дев режиме
('build:dev: ./node_modules/.bin/webpack --env mode=development');

// проверка линтером
("lint:ts: eslint 'src/**/*.{js,jsx,ts,tsx}'");

// фикс ошибок линтера
("lint:ts:fix: eslint 'src/**/*.{js,jsx,ts,tsx}' --fix");

// проверка линтером CSS
('lint:scss: npx stylelint "**/*.scss"');

// фикс ошибок линтера в CSS
('lint:scss:fix: npx stylelint "**/*.scss" --fix');

// юнит тесты
('test:unit: jest --config ./configs/jest/jest.config.ts');

// скриншотные тесты
('test:ui: npx loki test');

// принятие изменений в скриншотных тестах
('test:ui:ok: npx loki approve');

// "test:ui:ci": "loki update --requireReference --reactUri file:./storybook-static",
// "test:ui:report": "npm run test:ui:json && npm run test:ui:html",
// "test:ui:json": "node scripts/generate-visual-json-report.js",
// "test:ui:html": "npx reg-cli --from .loki/report.json --report .loki/report.html",

// запуск сторибука
('storybook: start-storybook -p 6006 -c ./configs/storybook');

// билд сторибука
('storybook:build: npx build-storybook -c ./configs/storybook');

// установка хаски для пайплайнов
('prepare: husky install');

// генерация шаблонов папок и файлов
('generate:slices: node ./scripts/createSlice/index.js');

// выполняется всегда после установки какой-либо зависимости (для виндовс: rmdir /s /q .\\node_modules\\.cache, для линукс: rm -rf ./node_modules/.cache)
// альтернативный вариант: установить библиотеку rimraf
// лучший вариант: использовать скрипт
('postinstall: rm -rf ./node_modules/.cache');

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
// 9. чтоб не возникало конфликтов при использовании устаревших библиотек, добавляем переменную окружения NPM_FLAGS: --force

// чтоб создать свой плагин:
// 1. создаем новую папку, которая должна начинаться с eslint-plugin
// 2. устанавливаем  npm install --global yo
// 3. устанавливаем npm install --global generator-eslint
// 3. запускаем команду yo eslint:plugin
// 4. заполняем все по инструкции
// 5. в папке lib=> index.js есть список правил
// 6. чтоб сгенерировать новое правило - yo eslint:rule
// 7. заполняем все по инструкции (
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
// делаем npm publish и проверяем на сайте публикование пакета
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

// в скриптах есть updateImports, который позволяет быстро добавить алиасы в абсолютные пути в проекте. запускается командой npx ts-node ./scripts/refactoring/updateImports.ts

// в скриптах есть updateImports, который позволяет быстро добавить паблик апи в директориях (в нашем случае в shared слой), а также заменить по всему проекту путь из publicApi. запускается командой npx ts-node ./scripts/refactoring/updateImports.ts

// в скриптах есть createReadmeFile, который позволяет быстро добавить файл README.md во всех  директориях. запускается командой npx ts-node ./scripts/refactoring/createReadmeFile.ts

// в скриптах есть remove-cache, который позволяет удалить кеш бэбила из проекта. запускается командой node ./scripts/remove-cache.js. Должен удалять после установки библиотек в package.json.

// в файле .browserslistrc указываем, какие браузеры поддерживаем. Это уменьшит размер бандла в продакшене, т.к. babel не добавляет лишние полифилы

// !!!разобраться с ворнингом в тестах 107 урок + настройки расширения jest

// когда настроили main.yml нужно в настройках репозитория включить Pages (Pages => in select githubActions). Там же можно эти страницы настроить. Далее в экшенах при проходе пайплайнов в Deploy to GitHub Pages в логах можно увидеть ссылки на страницы. Однако при переходе на нее будет 404. Нужно в конце заменить на название наших репортов. Пример: вместо ...test/index.html => ...test/report.html

// !!! при генерации отчетов на githubPages разобраться со сторибуком (не подгружаются свг. как вариант решения импортить по прямой ссылке из инета) + разобраться с путем, на который указывает ссылка в гитхабЭкшенс (можно в файле main.yml получать название веток и добавлять в ссылки)

// !!!просмотреть все правила своего плагина линта

// !!!дополнительно разобраться с фикстурами сайпресса (попробовать подключить правильно)

// для размещения на свой удаленный сервер своего проекта:
// - выбираем любой сервис по аренде серверов (в России можно использовать selectel) и создаем сервер по предпочтениям (минимум 2 оперативы и 20 памяти)
// - через терминал запускаем его, обновляем пакеты и устанавливаем гит как на линуксе
// - если проект приватный, создаем SSH
// - и загружаем его в гит на сервере
// - добавляем его в гитхабе
// - устанавливаем nvm и все зависимости
// - и запускаем сервер
// - устанавливаем ngix на сервер
// - переходим в папку с конфигом и настраиваем его (обязательно вместо страницы 404 указываем редирект на index.html, чтоб при перезагрузке страницы не падало приложение)
// - делаем билд проекта на сервере (только указываем в переменной окружения уже айпи адрес сервера)
// - в главном конфиге ngix настраиваем сжатие файлов
// - заходим на любой сайт регистратора доменов (например reg.ru) и покупаем домен
// - на этом же сайте указываем днс (порт нашего сервера)
// - на сайте сервера добавляем домен
// - на сайте регистратора указываем делегированные сервера из сайта сервера
// - на сайте сервера добавляем днс записи, как указывали на сайте регистратора
// - в терминале на сервере устанавливаем pm2, чтоб держать запущенный сервер в фоновом режиме всегда (чтоб при закрытии терминала не останавливался)
// - заходим на letsencrypt, переходим на certbot и получаем https сертификат
// - ввиду того, что сервер у нас на http, внутри проекта выполняем действия по настройки https через node.js
// - у нас добавятся 2 новых файла (key.pem и cert.pem)
// - после настройки бека, перезапускаем pm2
// - сейчас пока будет со стороны бэка говорить, что сертификат протухший
// - настраиваем проксирование (редирект запроса с одного адреса на другой) в ngix (https://www.dmosk.ru/miniinstruktions.php?mini=nginx-redirects)
// - также создадим скрипт на автоматический деплой сборки на нашем сервере (альтернативным вариантом будет использовать веб хуки или докер(https://dev-gang.ru/article/kak-obsluzhivat-prilozhenija-react-s-pomosczu-nginx-i-docker-mf53hirfey/, https://github.com/marketplace/actions/ssh-remote-commands))
