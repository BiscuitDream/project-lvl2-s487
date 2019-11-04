import nested from './nestedRender';
import plain from './plainRender';
import json from './jsonRender';

const renders = {
  nested,
  plain,
  json,
};

const getRender = (format = 'nested') => renders[format];

export default getRender;
