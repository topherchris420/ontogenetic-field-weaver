
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface SystemStatusBarProps {
  resonanceField: number;
  systemStatus: {
    drrEnabled: boolean;
    chronoSync: number;
    threatLevel: number;
    fieldStability: number;
  };
  quantumState: string;
  detectedThreats: any[];
}

const SystemStatusBar: React.FC<SystemStatusBarProps> = ({
  resonanceField,
  systemStatus,
  quantumState,
  detectedThreats
}) => {
  return (
    <div className="mb-6 bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-purple-500/40">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 text-sm">
        <div>
          <span className="text-gray-400">Resonance Field:</span>
          <Progress value={resonanceField} className="mt-1" />
        </div>
        <div>
          <span className="text-gray-400">Chrono-Sync:</span>
          <span className="ml-2 text-orange-400">{systemStatus.chronoSync}%</span>
        </div>
        <div>
          <span className="text-gray-400">Threat Level:</span>
          <span className={`ml-2 ${systemStatus.threatLevel > 50 ? 'text-red-400' : 'text-green-400'}`}>
            {systemStatus.threatLevel.toFixed(0)}%
          </span>
        </div>
        <div>
          <span className="text-gray-400">Field Stability:</span>
          <span className="ml-2 text-cyan-400">{systemStatus.fieldStability}%</span>
        </div>
        <div>
          <span className="text-gray-400">Quantum State:</span>
          <span className="ml-2 text-purple-400 capitalize">{quantumState}</span>
        </div>
        <div>
          <span className="text-gray-400">Active Threats:</span>
          <span className="ml-2 text-red-400">{detectedThreats.length}</span>
        </div>
      </div>
    </div>
  );
};

export default SystemStatusBar;
