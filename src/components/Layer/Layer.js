import { useEffect, useRef } from 'react';
import { useUpdateLayer, useAddLayer } from '../../hooks/useLayer';

const Layer = ({ layer, dispatch }) => {
  const layerId = useRef(layer.id);

  useAddLayer(layer, dispatch);

  useUpdateLayer(layerId.current, 'opacity', layer.opacity, dispatch);
  useUpdateLayer(layerId.current, 'visible', layer.visible, dispatch);

  useEffect(() => {
    const id = layerId.current;

    return function clearLayer() {
      dispatch({ type: 'REMOVE_LAYER', payload: id });
    };
  }, [dispatch]);

  return null;
};

export default Layer;
