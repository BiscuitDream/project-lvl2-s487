import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const getParse = extension => parsers[extension];

export default getParse;

// Диспетчеризацию можно по разному строить.
// В данном случае достаточно ее строить на основе ключей объекта как было в уроке по полиморфизму.


// кинуть ошибку
// export default (type) => {
//   if (!parserSource[type]) {
//     throw new DataErrors(type);
//   }
//   return parserSource[type];
// };


// Звездочки * в шаблонном проекте!!!
