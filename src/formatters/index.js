import nested from './nestedFormatter';
import plain from './plainFormatter';
import json from './jsonFormatter';


const formatters = {
  nested,
  plain,
  json,
};

const getFormatter = (format = 'nested') => formatters[format];

export default getFormatter;
