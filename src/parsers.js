import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

const getParse = type => parsers[type];

export default getParse;
