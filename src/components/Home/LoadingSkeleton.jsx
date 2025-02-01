import React from 'react';

const LoadingSkeleton = ({ height = "300px" }) => (
  <div 
    className="w-full bg-gray-100 animate-pulse"
    style={{ 
      height,
      background: 'linear-gradient(90deg, #f0f0f0 25%, #f7f7f7 50%, #f0f0f0 75%)',
      backgroundSize: '200% 100%',
      animation: 'pulse 1.5s ease-in-out infinite'
    }}
  >
    <style jsx>{`
      @keyframes pulse {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>
  </div>
);

export default LoadingSkeleton;
