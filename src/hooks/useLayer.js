import { useEffect, useRef } from 'react';

export const useUpdateLayer = (id, property, value, dispatch) => {
  const isAdded = useRef(false);

  useEffect(() => {
    if (isAdded.current) {
      dispatch({ type: 'UPDATE_LAYER', payload: { id, [property]: value } });
    } else {
      isAdded.current = true;
    }
  }, [id, property, value, dispatch]);

  return;
};

export const useAddLayer = (layer, dispatch) => {
  const isAdded = useRef(false);

  useEffect(() => {
    if (!isAdded.current) {
      dispatch({ type: 'ADD_LAYER', payload: { ...layer } });
      isAdded.current = true;
    }
  }, [layer, dispatch]);

  return;
};
