import { filter, merge } from 'lodash';

const mergeStyles = (styles) => {
  return styles.reduce((merged, style) => merge(merged, style), {});
};

const getStyleOptionsByNames = (styles, names) => {
  const styleNames = names.split(' ');
  const includedStyles = filter(styles, (style, key) =>
    styleNames.includes(key)
  );
  const mergedStyles = mergeStyles(includedStyles);
  return mergedStyles;
};

export const mapStyleNamesToStyle = (styleNamesList, styles) => {
  const list = styleNamesList.map((styleNames) =>
    getStyleOptionsByNames(styles, styleNames)
  );
  return list;
};

export default mapStyleNamesToStyle;
