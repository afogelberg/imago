import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  addLayer,
  removeLayer,
  updateLayer,
  addSource,
} from '../../redux/actions';
import { useSelector } from 'react-redux';
import { getLayers, getSources } from '../../redux/selectors';
import useFetch from '../../hooks/useFetch';

import './App.css';
import Map from '../Map';
import Toggle from '../Toggle';

const DEMODATA_URL = '/demo-data.json';

function App() {
  const dispatch = useDispatch();
  const { data, loading, error } = useFetch(DEMODATA_URL);
  const sources = useSelector(getSources);
  const layers = useSelector(getLayers);

  useEffect(() => {
    if (data) {
      const { layers: demoLayers, sources: demoSources } = data;
      demoLayers.forEach((layer) => {
        dispatch(addLayer(layer));
      });
      demoSources.forEach((source) => {
        dispatch(addSource(source));
      });
    }
  }, [data, dispatch]);

  const updateHandler = (payload) => {
    dispatch(updateLayer(payload));
  };

  const removeHandler = (layerId) => {
    dispatch(removeLayer(layerId));
  };

  if (error) {
    return 'Something went wrong while loading demodata...';
  }

  if (loading) {
    return 'Loading...';
  }

  return (
    <div className="App h-screen w-screen bg-gray-400">
      <Toggle
        layers={layers}
        updateHandler={updateHandler}
        removeHandler={removeHandler}
      />
      <Map layers={layers} sources={sources} />
    </div>
  );
}

export default App;
