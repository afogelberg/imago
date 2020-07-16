import olGeoJSON from 'ol/format/GeoJSON';
import olVectorSource from 'ol/source/Vector';

const Geojson = function Geojson(sourceOptions) {
  return new olVectorSource({
    ...sourceOptions,
    format: new olGeoJSON(),
  });
};

export default Geojson;
