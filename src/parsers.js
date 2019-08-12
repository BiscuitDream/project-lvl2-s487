import yaml from 'js-yaml';

// Вибирается функция-парсер в зависимости от расширения файла
const parse = (content, ext) => {
  if (ext === 'json') {
    return JSON.parse(content);
  }
  return yaml.safeLoad(content, 'utf-8');
};

export default parse;
