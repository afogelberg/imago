import React from 'react';
import ToggleButton from '../ToggleButton';

const Toggle = ({ layers, updateHandler }) => {
  const toggleVisible = (layer) =>
    updateHandler({ id: layer.id, visible: !layer.visible });

  return (
    <div
      className="absolute transparent flex-column top-0 left-0 z-10"
      style={{ width: '320px' }}
    >
      <div className="relative shadow-md rounded-lg transparent flex-column bg-white m-5 p-5">
        {layers.map((layer) => (
          <div className="grid grid-cols-6 gap-3 p-2" key={layer.id}>
            <div className="col-span-5">{layer.title}</div>
            <div className="col-span-1">
              <ToggleButton
                checked={layer.visible}
                onClick={() => toggleVisible(layer)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toggle;
