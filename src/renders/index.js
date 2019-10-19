import nested from './nestedFormatter';
import plain from './plainFormatter';
import json from './jsonFormatter';


const renders = {
  nested,
  plain,
  json,
};

const getRender = (format = 'nested') => renders[format];

export default getRender;
