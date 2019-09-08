import common from './commonFormatter';
import plain from './plainFormatter';
import json from './jsonFormatter';


const formatters = {
  common,
  plain,
  json,
};

const getFormatter = (format = 'common') => formatters[format];

export default getFormatter;
