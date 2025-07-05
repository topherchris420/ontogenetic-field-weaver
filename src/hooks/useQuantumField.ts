
import { useState, useEffect } from 'react';

export const useQuantumField = (onResonanceChange?: (resonance: number) => void) => {
  const [resonanceField, setResonanceField] = useState(0);
  const [temporalGeometry, setTemporalGeometry] = useState({ x: 0, y: 0, z: 0, t: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const newResonance = (resonanceField + Math.random() * 0.1) % 100;
      setResonanceField(newResonance);
      
      setTemporalGeometry(prev => ({
        x: prev.x + Math.sin(Date.now() * 0.001) * 0.01,
        y: prev.y + Math.cos(Date.now() * 0.001) * 0.01,
        z: prev.z + Math.sin(Date.now() * 0.002) * 0.01,
        t: Date.now() * 0.001
      }));

      if (onResonanceChange) {
        onResonanceChange(newResonance);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [resonanceField, onResonanceChange]);

  return {
    resonanceField,
    temporalGeometry,
    setResonanceField
  };
};
