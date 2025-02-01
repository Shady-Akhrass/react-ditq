import React from 'react';

const SectionBoundary = ({ children, minHeight = "300px" }) => (
  <div
    className="w-full relative"
    style={{
      minHeight,
      contain: 'content layout size style'
    }}
  >
    {children}
  </div>
);

export default SectionBoundary;