import {
  ADD_LAYER,
  TOGGLE_LAYER,
  REMOVE_LAYER,
  UPDATE_LAYER,
  ADD_SOURCE,
} from './actionTypes';

export const addLayer = ({ id, ...layer }) => ({
  type: ADD_LAYER,
  payload: {
    id,
    layer,
  },
});

export const removeLayer = (payload) => ({
  type: REMOVE_LAYER,
  payload,
});

export const updateLayer = (payload) => ({
  type: UPDATE_LAYER,
  payload,
});

export const toggleLayer = (id) => ({
  type: TOGGLE_LAYER,
  payload: { id },
});

export const addSource = ({ id, ...source }) => ({
  type: ADD_SOURCE,
  payload: {
    id,
    source,
  },
});
