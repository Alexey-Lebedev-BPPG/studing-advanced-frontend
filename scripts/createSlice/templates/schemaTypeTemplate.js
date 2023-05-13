// шаблон создания файла схемы
const firstCharUpperCase = require('../firstCharUpperCase');

module.exports = sliceName => `export interface ${firstCharUpperCase(
  sliceName,
)}Schema {
    
}`;
