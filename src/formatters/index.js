import common from './commonFormatter';

const formatters = {
  common,
};

const getFormatter = (format = 'common') => formatters[format];

export default getFormatter;
