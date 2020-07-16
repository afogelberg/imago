import olVectorLayer from 'ol/layer/Vector';

const Vector = function Vector(layerOptions, source, style) {
  return new olVectorLayer({ ...layerOptions, source, style });
};

export default Vector;
