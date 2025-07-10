
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface WormholeMetricsProps {
  stabilityIndex: number;
  energyConsumption: number;
  spatialCurvature: number;
  resonanceField: number;
  isActive: boolean;
}

const WormholeMetrics: React.FC<WormholeMetricsProps> = ({
  stabilityIndex,
  energyConsumption,
  spatialCurvature,
  resonanceField,
  isActive
}) => {
  const getStabilityColor = () => {
    if (stabilityIndex > 80) return 'text-green-400';
    if (stabilityIndex > 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getEnergyColor = () => {
    if (energyConsumption > 80) return 'text-red-400';
    if (energyConsumption > 50) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-cyan-400">Stability Index</span>
            <span className={`text-sm font-mono ${getStabilityColor()}`}>
              {stabilityIndex.toFixed(1)}%
            </span>
          </div>
          <Progress 
            value={stabilityIndex} 
            className="h-2"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-orange-400">Energy Draw</span>
            <span className={`text-sm font-mono ${getEnergyColor()}`}>
              {energyConsumption.toFixed(1)}%
            </span>
          </div>
          <Progress 
            value={energyConsumption} 
            className="h-2"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-purple-400">Spatial Curvature</span>
            <span className="text-sm font-mono text-purple-300">
              {spatialCurvature.toFixed(2)}κ
            </span>
          </div>
          <Progress 
            value={Math.abs(spatialCurvature) * 10} 
            className="h-2"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-pink-400">DRR Resonance</span>
            <span className="text-sm font-mono text-pink-300">
              {resonanceField.toFixed(1)}%
            </span>
          </div>
          <Progress 
            value={resonanceField} 
            className="h-2"
          />
        </div>
      </div>

      <div className="text-center">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          isActive 
            ? stabilityIndex > 70 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
            : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
        }`}>
          <div className={`w-2 h-2 rounded-full mr-2 ${
            isActive 
              ? stabilityIndex > 70 
                ? 'bg-green-400 animate-pulse' 
                : 'bg-yellow-400 animate-pulse'
              : 'bg-gray-400'
          }`} />
          {isActive ? (stabilityIndex > 70 ? 'STABLE' : 'FLUCTUATING') : 'OFFLINE'}
        </div>
      </div>
    </div>
  );
};

export default WormholeMetrics;
