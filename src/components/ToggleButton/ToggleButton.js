import React from 'react';

const ToggleButton = ({ checked = false, onClick }) => {
  const btnClassNames =
    'rounded-full border-2 w-6 h-6 flex content-center justify-center focus:outline-none';

  return (
    <button
      onClick={onClick}
      className={`${btnClassNames} ${
        checked ? 'bg-black border-black' : 'border-gray-400'
      }`}
    >
      {checked ? (
        <svg
          className="w-3 h-3 fill-current text-white self-center"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
        </svg>
      ) : (
        ''
      )}
    </button>
  );
};

export default ToggleButton;
