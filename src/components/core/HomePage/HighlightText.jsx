import React from 'react';

const HighlightText = ({ text, color }) => {
  return (
    <span className="font-bold " style={{ color }}>
      {text}
    </span>
  );
};

export default HighlightText;
