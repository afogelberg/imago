import React, { useRef, useEffect, useState } from 'react';
import MapCore from '../../core';
import Layer from '../Layer';
import Source from '../Source';

const Map = ({ layers = [], sources = [], options }) => {
  const mapRef = useRef();
  const [map, setMap] = useState();

  useEffect(() => {
    if (!map && mapRef.current) {
      setMap(MapCore({ ref: mapRef.current }));
    }
  }, [map]);

  return (
    <div className="h-screen w-screen" ref={(el) => (mapRef.current = el)}>
      {map
        ? sources.map((source) => (
            <Source key={source.id} source={source} dispatch={map.dispatch} />
          ))
        : ''}
      {map
        ? layers.map((layer) => (
            <Layer key={layer.id} layer={layer} dispatch={map.dispatch} />
          ))
        : ''}
    </div>
  );
};

export default Map;
