import XYZ from './XYZ';
import Geojson from './Geojson';

const Source = function Source(options) {
  const { type, ...sourceOptions } = options;

  if (type === 'XYZ') {
    return XYZ(sourceOptions);
  }

  if (type === 'Geojson') {
    return Geojson(sourceOptions);
  }
};

export default Source;
