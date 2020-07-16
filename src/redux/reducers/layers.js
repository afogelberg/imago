import { ADD_LAYER, REMOVE_LAYER, UPDATE_LAYER } from '../actionTypes';

const initialState = {
  allIds: [],
  byIds: {},
};

const layerDefaults = {
  opacity: 1,
  visible: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_LAYER: {
      const { id, layer } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            id,
            ...layerDefaults,
            ...layer,
          },
        },
      };
    }
    case UPDATE_LAYER: {
      const { id, ...layer } = action.payload;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            ...layer,
          },
        },
      };
    }
    case REMOVE_LAYER: {
      const id = action.payload;
      const { [id]: value, ...remainingLayers } = state.byIds;

      return {
        ...state,
        allIds: state.allIds.filter((_id) => _id !== id),
        byIds: {
          ...state.byIds,
          [id]: {
            ...remainingLayers,
          },
        },
      };
    }
    default:
      return state;
  }
}
