import TileLayer from 'ol/layer/Tile';

const Tile = function Tile(layerOptions, source) {
  return new TileLayer({ ...layerOptions, source });
};

export default Tile;
