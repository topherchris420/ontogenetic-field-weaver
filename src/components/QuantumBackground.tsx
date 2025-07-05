
import React from 'react';

const QuantumBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 opacity-20 overflow-hidden">
      {/* Geometric shapes inspired by the reference images */}
      <div className="absolute top-20 left-10 w-8 h-8 rotate-45 bg-gradient-to-br from-pink-400 to-magenta-500 animate-float"></div>
      <div className="absolute top-40 right-20 w-12 h-12 rotate-12 bg-gradient-to-br from-magenta-400 to-pink-500 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-60 left-1/4 w-6 h-6 rotate-45 bg-gradient-to-br from-pink-300 to-magenta-400 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 right-1/3 w-10 h-10 rotate-12 bg-gradient-to-br from-magenta-300 to-pink-400 animate-float" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-60 left-1/2 w-4 h-4 rotate-45 bg-gradient-to-br from-pink-400 to-magenta-300 animate-float" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-7 h-7 rotate-12 bg-gradient-to-br from-magenta-400 to-pink-500 animate-float" style={{ animationDelay: '2.5s' }}></div>
      
      {/* Additional subtle background elements */}
      <div className="absolute inset-0 bg-gradient-radial from-pink-500/5 via-transparent to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-magenta-400/8 to-transparent rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-radial from-pink-400/8 to-transparent rounded-full"></div>
    </div>
  );
};

export default QuantumBackground;
