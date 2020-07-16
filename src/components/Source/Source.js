import { useEffect, useRef } from 'react';

const useAddSource = (source, dispatch) => {
  const isAdded = useRef(false);

  useEffect(() => {
    if (!isAdded.current) {
      dispatch({ type: 'ADD_SOURCE', payload: { ...source } });
      isAdded.current = true;
    }
  }, [source, dispatch]);

  return;
};

const Source = ({ source, dispatch }) => {
  const sourceId = useRef(source.id);

  useAddSource(source, dispatch);

  useEffect(() => {
    const id = sourceId.current;

    return function clearSource() {
      dispatch({ type: 'REMOVE_SOURCE', payload: id });
    };
  }, [dispatch]);

  return null;
};

export default Source;
