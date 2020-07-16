import { Fill, Stroke, Style as olStyle, Text } from 'ol/style';

const Style = function Style(styleOptions) {
  const style = new olStyle({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.6)',
    }),
    stroke: new Stroke({
      color: '#319FD3',
      width: 1,
    }),
    text: new Text({
      font: '12px Calibri,sans-serif',
      fill: new Fill({
        color: '#000',
      }),
      stroke: new Stroke({
        color: '#fff',
        width: 3,
      }),
    }),
  });

  return function (feature) {
    style.getText().setText(feature.get('name'));
    return style;
  };
};

export default Style;
