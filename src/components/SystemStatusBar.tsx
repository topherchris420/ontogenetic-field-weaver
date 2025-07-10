
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
    <div className="mb-6 glass-morphism rounded-xl p-4 border glow-effect">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 text-sm">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground font-medium">Resonance Field</span>
            <span className="text-primary font-mono text-xs">{resonanceField.toFixed(1)}%</span>
          </div>
          <Progress value={resonanceField} className="h-2" />
        </div>
        
        <div className="space-y-1">
          <span className="text-muted-foreground font-medium block">Chrono-Sync</span>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${systemStatus.chronoSync > 80 ? 'bg-green-400 animate-glow' : 'bg-yellow-400'}`}></div>
            <span className="text-orange-400 font-mono">{systemStatus.chronoSync}%</span>
          </div>
        </div>
        
        <div className="space-y-1">
          <span className="text-muted-foreground font-medium block">Threat Level</span>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${systemStatus.threatLevel > 50 ? 'bg-red-400 animate-glow' : 'bg-green-400'}`}></div>
            <span className={`font-mono ${systemStatus.threatLevel > 50 ? 'text-red-400' : 'text-green-400'}`}>
              {systemStatus.threatLevel.toFixed(0)}%
            </span>
          </div>
        </div>
        
        <div className="space-y-1">
          <span className="text-muted-foreground font-medium block">Field Stability</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-glow"></div>
            <span className="text-cyan-400 font-mono">{systemStatus.fieldStability}%</span>
          </div>
        </div>
        
        <div className="space-y-1">
          <span className="text-muted-foreground font-medium block">Quantum State</span>
          <span className="text-purple-400 capitalize font-mono shimmer-effect">{quantumState}</span>
        </div>
        
        <div className="space-y-1">
          <span className="text-muted-foreground font-medium block">Active Threats</span>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${detectedThreats.length > 0 ? 'bg-red-400 animate-glow' : 'bg-green-400'}`}></div>
            <span className="text-red-400 font-mono font-bold">{detectedThreats.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatusBar;
