
import React from 'react';

const QuantumBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 opacity-15">
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 via-purple-500/10 to-transparent animate-pulse"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_#8b5cf6_0%,_transparent_50%)] opacity-30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,_#3b82f6_0%,_transparent_50%)] opacity-30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#ff0080_0%,_transparent_60%)] opacity-20"></div>
    </div>
  );
};

export default QuantumBackground;
