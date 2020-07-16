import { ADD_SOURCE } from '../actionTypes';

const initialState = {
  allIds: [],
  byIds: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_SOURCE: {
      const { id, source } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            id,
            ...source,
          },
        },
      };
    }
    default:
      return state;
  }
}
