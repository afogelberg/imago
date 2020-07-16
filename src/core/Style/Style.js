import hexToRgba from 'hex-to-rgba';
import {
  Circle as olCircle,
  Fill as olFill,
  Icon as olIcon,
  Stroke as olStroke,
  Style as olStyle,
  Text as olText,
} from 'ol/style';

const colorToRgba = ({ color, opacity }) => {
  if (!opacity || !color) return color;

  if (color.startsWith('#')) {
    return hexToRgba(color, opacity);
  }

  return color;
};

const Fill = (options) => {
  let { color, opacity, ...fillOptions } = options;
  fillOptions.color = colorToRgba({ color, opacity });
  return new olFill(fillOptions);
};

const Stroke = (options) => {
  let { color, opacity, ...strokeOptions } = options;
  strokeOptions.color = colorToRgba({ color, opacity });
  return new olStroke(strokeOptions);
};

const Shape = (options) => {
  const { shape, ...shapeOptions } = options;
  let style;
  if (shape.shape === 'circle') {
    style = new olCircle({ ...shape, ...shapeOptions });
  }

  return style;
};

const Style = (styleOptions) => {
  const { fill, stroke, shape, text, ...otherOptions } = styleOptions;
  const olStyles = {};
  if (fill) {
    olStyles.fill = Fill(styleOptions.fill);
  }
  if (stroke) {
    olStyles.stroke = Stroke(styleOptions.stroke);
  }
  if (text) {
    const { fill: textFill, stroke: textStroke, ...otherTextOptions } = text;
    const textStyle = {};
    if (textFill) textStyle.fill = Fill(textFill);
    if (textStroke) textStyle.stroke = Stroke(textStroke);
    olStyles.text = new olText({ ...textStyle, ...otherTextOptions });
  }
  if (shape) {
    olStyles.image = Shape({ ...styleOptions, ...olStyles });
  }

  return new olStyle({ ...otherOptions, ...olStyles });
};

export default Style;
