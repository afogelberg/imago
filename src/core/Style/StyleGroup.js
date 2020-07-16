import StyleRule from './StyleRule';
import mapStyleNamesToStyle from './mapStyleNamesToStyle';
import defaultStyle from './defaultStyle';
import { reduce } from 'lodash';

const createStyleRules = ({ rules, styleLayers }) => {
  const { '*...': beforeAll, '...*': afterAll, ...otherLayers } = styleLayers;

  const styleRules = reduce(
    otherLayers,
    (styleRules, styleLayer, key) => {
      const rule = rules[key];

      if (beforeAll) {
        styleLayer = [...beforeAll, ...styleLayer];
      }
      if (afterAll) {
        styleLayer = [...styleLayer, ...afterAll];
      }

      styleLayer.reverse();

      const styleRule = StyleRule({ styleLayer, rule });
      if (rule) {
        styleRules.unshift(styleRule);
      }
      if (!rule) {
        styleRules.push(styleRule);
      }
      return styleRules;
    },
    []
  );
  styleRules.push(StyleRule({ styleLayer: [defaultStyle()] }));
  return styleRules;
};

const StyleGroup = function StyleGroup({ rules, styleLayers }) {
  const styleRules = createStyleRules({ rules, styleLayers });

  return {
    findStyleRule: (feature, scale) =>
      styleRules.find((styleRule) => styleRule.find(feature, scale)),
  };
};

StyleGroup.mapStyleNamesToStyle = mapStyleNamesToStyle;

export default StyleGroup;
