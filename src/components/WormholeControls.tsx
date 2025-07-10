
import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Power, Zap, Shield, AlertTriangle } from 'lucide-react';

interface WormholeControlsProps {
  isActive: boolean;
  fieldIntensity: number;
  throatRadius: number;
  quantumFlux: number;
  onToggleActive: () => void;
  onFieldIntensityChange: (value: number[]) => void;
  onThroatRadiusChange: (value: number[]) => void;
  onQuantumFluxChange: (value: number[]) => void;
  onStabilize: () => void;
  onEmergencyShutdown: () => void;
}

const WormholeControls: React.FC<WormholeControlsProps> = ({
  isActive,
  fieldIntensity,
  throatRadius,
  quantumFlux,
  onToggleActive,
  onFieldIntensityChange,
  onThroatRadiusChange,
  onQuantumFluxChange,
  onStabilize,
  onEmergencyShutdown
}) => {
  return (
    <div className="p-4 bg-black/30 border border-cyan-500/20 space-y-4">
      <div className="flex gap-2">
        <Button
          onClick={onToggleActive}
          className={`flex-1 ${isActive ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'}`}
        >
          <Power className="w-4 h-4 mr-2" />
          {isActive ? 'Deactivate' : 'Activate'}
        </Button>
        
        <Button
          onClick={onStabilize}
          variant="outline"
          className="flex-1 border-blue-500/30 hover:bg-blue-500/10"
          disabled={!isActive}
        >
          <Shield className="w-4 h-4 mr-2" />
          Stabilize
        </Button>
        
        <Button
          onClick={onEmergencyShutdown}
          variant="destructive"
          className="flex-1"
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          Emergency
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-cyan-300">Field Intensity</span>
            <span className="text-xs text-gray-400">{fieldIntensity}%</span>
          </div>
          <Slider
            value={[fieldIntensity]}
            onValueChange={onFieldIntensityChange}
            max={100}
            step={1}
            className="w-full"
            disabled={!isActive}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-purple-300">Throat Radius</span>
            <span className="text-xs text-gray-400">{throatRadius}%</span>
          </div>
          <Slider
            value={[throatRadius]}
            onValueChange={onThroatRadiusChange}
            max={100}
            step={1}
            className="w-full"
            disabled={!isActive}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-pink-300">Quantum Flux</span>
            <span className="text-xs text-gray-400">{quantumFlux}%</span>
          </div>
          <Slider
            value={[quantumFlux]}
            onValueChange={onQuantumFluxChange}
            max={100}
            step={1}
            className="w-full"
            disabled={!isActive}
          />
        </div>
      </div>
    </div>
  );
};

export default WormholeControls;
