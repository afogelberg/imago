// store
//   - layers
//       allIds
//         - id1
//         - id2
//         - id3
//       byIds
//         id1
//           source
//           rules
//         id2
//         id3

export const getLayersState = (store) => store.layers;

export const getLayerList = (store) =>
  getLayersState(store) ? getLayersState(store).allIds : [];

export const getLayerById = (store, id) =>
  getLayersState(store) ? { ...getLayersState(store).byIds[id], id } : {};

export const getLayers = (store) =>
  getLayerList(store).map((id) => getLayerById(store, id));

export const getVisibleLayers = (store) =>
  getLayers(store).filter((layer) => layer.visible);

export const getSourcesState = (store) => store.sources;

export const getSourceList = (store) =>
  getSourcesState(store) ? getSourcesState(store).allIds : [];

export const getSourceById = (store, id) =>
  getSourcesState(store) ? { ...getSourcesState(store).byIds[id], id } : {};

export const getSources = (store) =>
  getSourceList(store).map((id) => getSourceById(store, id));
