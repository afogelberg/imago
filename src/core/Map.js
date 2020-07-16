import OlMap from 'ol/Map';
import View from 'ol/View';
import Layer from './Layer';
import { reduce } from 'lodash';
import StyleGroup from './Style/StyleGroup';
import StyleFunction from './Style/StyleFunction';
import stylePackage from './Style/styles';

const Map = function Map(options) {
  const { ref } = options;

  const olMap = new OlMap({
    target: ref,
    controls: [],
    view: new View({
      center: [1800000, 5000000],
      zoom: 3,
    }),
  });

  const sources = {
    OSM: {
      id: 'OSM',
      type: 'XYZ',
      url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    },
  };

  const layers = {};

  const addSource = (options) => {
    const { id, ...sourceOptions } = options;
    sources[id] = sourceOptions;
  };

  const addLayer = (options) => {
    const {
      source,
      styles,
      styleRules: styleLayerOptions,
      rules,
      ...layerOptions
    } = options;

    const sourceOptions = sources[source];

    if (source === 'OSM') {
      const layer = Layer(layerOptions, sourceOptions);
      olMap.addLayer(layer);
      return;
    }

    const mergedStyles = {
      ...stylePackage,
      ...styles,
    };
    const styleLayers = reduce(
      styleLayerOptions,
      (layers, styleNames, key) => {
        layers[key] = StyleGroup.mapStyleNamesToStyle(styleNames, mergedStyles);
        return layers;
      },
      {}
    );

    const styleGroup = StyleGroup({ rules, styleLayers });
    const styleFunction = StyleFunction(styleGroup);

    const layer = Layer(layerOptions, sourceOptions, styleFunction);
    olMap.addLayer(layer.getOlLayer());
    layers[layerOptions.id] = layer;
  };

  const removeLayer = (layerId) => {
    const layer = layers[layerId];
    console.log(olMap.getLayers());

    if (layer) {
      olMap.removeLayer(layer.getOlLayer());
      console.log(olMap.getLayers());
      delete layers[layerId];
    }
  };

  const updateLayer = ({ id, ...changes }) => {
    const layer = layers[id];
    if (layer) {
      layer.update(changes);
    }
  };

  const toProps = (handler) => (feature) => {
    if (feature) {
      return handler(feature.getProperties());
    }
  };

  return {
    addLayer,
    removeLayer,
    addSource,
    getLayers: () => {
      const layerIds = Object.keys(layers);
      return layerIds.map((layerId) => layers[layerId]);
    },
    getMap: () => olMap,
    on: (type, handler) => {
      const clickHandler = (e) => {
        console.log('from mapKernal', e);
        olMap.forEachFeatureAtPixel(e.pixel, toProps(handler));
      };
      olMap.on(type, clickHandler);
    },
    updateLayer,
    dispatch: ({ type, payload }) => {
      if (type === 'ADD_LAYER') {
        addLayer(payload);
      }
      if (type === 'REMOVE_LAYER') {
        removeLayer(payload);
      }
      if (type === 'UPDATE_LAYER') {
        updateLayer(payload);
      }
      if (type === 'ADD_SOURCE') {
        addSource(payload);
      }
    },
  };
};

export default Map;
