import yaml from 'js-yaml';

const getParse = (extension) => {
  if (extension === 'json') {
    return JSON.parse;
  }
  return yaml.safeLoad;
};

export default getParse;


// Полиморфизм на основе объекта
