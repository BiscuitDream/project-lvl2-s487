import common from './commonFormatter';
import plain from './plainFormatter';

const formatters = {
  common,
  plain,
};

const getFormatter = (format = 'common') => formatters[format];

export default getFormatter;
