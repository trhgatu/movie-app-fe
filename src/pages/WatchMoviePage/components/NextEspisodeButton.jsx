import React from 'react';

const NextEpisodeButton = ({ onNext }) => {
  return (
    <button
      onClick={onNext}
      className="px-6 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
    >
      Tập tiếp theo
    </button>
  );
};

export default NextEpisodeButton;
