const fs = require('fs');
const { join: joinPath } = require('path');

// нужно править, чтоб точно работал
const cacheDir = joinPath(__dirname, '.', 'node_modules/.cache');

fs.rmSync(cacheDir, { recursive: true, force: true });
console.log('Выполнено успешно');