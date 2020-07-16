const funcs = {
  '@resolution': ({ resolution }) => resolution,
};

const getInputValue = (feature, resolution, prop) => {
  if (prop.startsWith('@')) {
    return funcs[prop]({ feature, resolution });
  }
  return feature.get(prop);
};

const predicates = {
  '=': (prop, value) => (feature, resolution) =>
    getInputValue(feature, resolution, prop) === value,
  '!=': (prop, value) => (feature, resolution) =>
    getInputValue(feature, resolution, prop) !== value,
  '>': (prop, value) => (feature, resolution) =>
    getInputValue(feature, resolution, prop) > value,
  '<': (prop, value) => (feature, resolution) =>
    getInputValue(feature, resolution, prop) < value,
  '>=': (prop, value) => (feature, resolution) =>
    getInputValue(feature, resolution, prop) >= value,
  '<=': (prop, value) => (feature, resolution) =>
    getInputValue(feature, resolution, prop) <= value,
};

const defaultRule = () => true;

const Rule = (rule) => {
  if (!rule) {
    return defaultRule;
  }

  const [prop, predicate, value] = rule;

  if (predicate in predicates) {
    return predicates[predicate](prop, value);
  }
};

export default Rule;
