
import { useEffect } from 'react';

interface SystemStatus {
  drrEnabled: boolean;
  chronoSync: number;
  threatLevel: number;
  fieldStability: number;
}

export const useSystemStatusUpdater = (
  setSystemStatus: React.Dispatch<React.SetStateAction<SystemStatus>>
) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        chronoSync: Math.max(60, Math.min(100, prev.chronoSync + (Math.random() - 0.5) * 3)),
        threatLevel: Math.max(0, Math.min(100, prev.threatLevel + (Math.random() - 0.5) * 2)),
        fieldStability: Math.max(70, Math.min(100, prev.fieldStability + (Math.random() - 0.5) * 1))
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [setSystemStatus]);
};
