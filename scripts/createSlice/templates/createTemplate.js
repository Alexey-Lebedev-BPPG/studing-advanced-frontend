const fs = require('fs/promises');
const createModel = require('./createModel');
const createPublicApi = require('./createPublicApi');
const createUI = require('./createUI');
const resolveRoot = require('../resolveRoot');

module.exports = async (layer, sliceName) => {
  try {
    // создаем папку для слоя и слайса
    await fs.mkdir(resolveRoot('src', layer, sliceName));
  } catch (e) {
    console.log(`не удалось создать директорию для слайса${sliceName}`);
  }

  // последовательно создаем папки с файлами (model, ui, api)
  await createModel(layer, sliceName);
  await createUI(layer, sliceName);
  await createPublicApi(layer, sliceName);
};
