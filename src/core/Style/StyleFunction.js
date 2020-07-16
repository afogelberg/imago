const StyleFunction = function StyleFunction(styleGroup) {
  const styleFunction = function (feature, scale) {
    let styleRule;

    styleRule = styleGroup.findStyleRule(feature, scale);
    return styleRule.getStyles(feature);
  };

  return styleFunction;
};

export default StyleFunction;
