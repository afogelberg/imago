import { template } from 'lodash';

const replace = (str, obj) => {
  const compiled = template(str);
  const result = compiled(obj);
  return result;
};

export default replace;
