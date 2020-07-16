import Source from '../Source';
import Tile from './Tile';
import Vector from './Vector';

const layerDefaultTypes = {
  XYZ: 'Tile',
  Geojson: 'Vector',
};

const getLayerDefaultTypeForSource = (type) => {
  if (type in layerDefaultTypes) {
    return layerDefaultTypes[type];
  }
};

const Layer = function Layer(layerOptions, sourceOptions, styleFunction) {
  const source = Source(sourceOptions);
  let olLayer;

  const type =
    layerOptions.type || getLayerDefaultTypeForSource(sourceOptions.type);

  if (type === 'Tile') {
    olLayer = Tile(layerOptions, source);
  }

  if (type === 'Vector') {
    olLayer = Vector(layerOptions, source, styleFunction);
  }

  return {
    getOlLayer: () => olLayer,
    update: ({ opacity, visible }) => {
      if (opacity) {
        olLayer.setOpacity(opacity);
      }
      if (visible !== undefined) {
        olLayer.setVisible(visible);
      }
    },
  };
};

export default Layer;
