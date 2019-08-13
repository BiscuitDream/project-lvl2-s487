import yaml from 'js-yaml';

const getParse = (extension) => {
  if (extension === '.json') {
    return JSON.parse;
  }
  return yaml.safeLoad;
};

// Полиморфизм на основе объекта
// черновик
// const parsers = {
//   '.json': JSON.parse,
//   '.yaml': yaml.safeLoad,
//   '.yml': yaml.safeLoad,
// };

// const getParse = extension => parsers[extension];

export default getParse;
