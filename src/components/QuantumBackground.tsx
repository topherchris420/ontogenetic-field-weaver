
import React from 'react';

const QuantumBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 opacity-15 overflow-hidden">
      {/* Enhanced quantum field effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_hsl(var(--primary)/0.08)_0%,_transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,_transparent_0deg,_hsl(var(--primary)/0.03)_90deg,_transparent_180deg,_hsl(var(--accent)/0.03)_270deg,_transparent_360deg)]"></div>
      
      {/* Floating quantum particles */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-primary/30 rounded-full animate-quantum-float shadow-primary-glow"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-accent/40 rounded-full animate-quantum-float shadow-accent-glow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-60 left-1/4 w-1 h-1 bg-primary/50 rounded-full animate-quantum-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-accent/30 rounded-full animate-quantum-float" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-60 left-1/2 w-1 h-1 bg-primary/40 rounded-full animate-quantum-float" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-accent/35 rounded-full animate-quantum-float" style={{ animationDelay: '2.5s' }}></div>
      
      {/* Quantum field lines */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse"></div>
      <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      {/* Vertical field lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/15 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-accent/10 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      
      {/* Enhanced radial gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-primary/5 via-primary/2 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-accent/4 via-accent/1 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-radial from-primary/3 to-transparent rounded-full blur-3xl animate-pulse"></div>
    </div>
  );
};

export default QuantumBackground;
