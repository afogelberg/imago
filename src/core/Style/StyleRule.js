import Style from './Style';
import Rule from './Rule';
import replace from './replace';
import { memoize } from 'lodash';

const StyleRule = function StyleRule({ styleLayer, rule }) {
  let olStyles = styleLayer.map((options) => Style(options));
  const rules = rule ? rule.map((options) => Rule(options)) : [Rule()];

  const hasText = memoize((styles) => {
    return styles.some((style) => style.getText());
  });

  return {
    find: (feature, resolution) => {
      const hasRule = rules.every((rule) => rule(feature, resolution));
      return hasRule;
    },
    getStyles(feature) {
      if (!this.hasText()) {
        return olStyles;
      }
      return olStyles.map((olStyle) => {
        if (!olStyle.getText()) return olStyle;

        const clonedStyle = olStyle.clone();
        const textStyle = clonedStyle.getText();
        const text = replace(textStyle.getText(), feature.getProperties());
        textStyle.setText(text);
        return clonedStyle;
      });
    },
    hasText: () => {
      return hasText(olStyles);
    },
    setStyles: (styles) => {
      olStyles = styles;
    },
  };
};

export default StyleRule;
