import yaml from 'js-yaml';
import ini from 'ini';

const getParse = (extension) => {
  if (extension === '.json') {
    return JSON.parse;
  }
  if (extension === '.ini') {
    return ini.parse;
  }
  return yaml.safeLoad;
};

// Полиморфизм на основе объекта
// черновик
// const parsers = {
//   '.json': JSON.parse,
//   '.yaml': yaml.safeLoad,
//   '.yml': yaml.safeLoad,
//   '.ini': ini.parse,
// };

// const getParse = extension => parsers[extension];

export default getParse;
