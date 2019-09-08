const partialApply = (fn, arg2, arg3) => arg1 => fn(arg1, arg2, arg3);

const fn = JSON.stringify;
const replacer = null;
const spaces = 2;

const jsonFormatter = partialApply(fn, replacer, spaces);

export default jsonFormatter;
