import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Atom, Settings, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';
import WormholeCanvas from './WormholeCanvas';
import WormholeControls from './WormholeControls';
import WormholeMetrics from './WormholeMetrics';

interface WormholePhysicsSimulatorProps {
  resonanceField: number;
  onStabilityChange: (stability: number) => void;
}

const WormholePhysicsSimulator: React.FC<WormholePhysicsSimulatorProps> = ({
  resonanceField,
  onStabilityChange
}) => {
  const [isActive, setIsActive] = useState(false);
  const [stabilityIndex, setStabilityIndex] = useState(45);
  const [fieldIntensity, setFieldIntensity] = useState(30);
  const [throatRadius, setThroatRadius] = useState(50);
  const [quantumFlux, setQuantumFlux] = useState(25);
  const [energyConsumption, setEnergyConsumption] = useState(20);
  const [spatialCurvature, setSpatialCurvature] = useState(-2.4);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive) {
        const baseStability = 45 + (resonanceField * 0.3);
        const fluctuation = (Math.random() - 0.5) * 20;
        const intensityFactor = fieldIntensity / 100;
        const radiusFactor = (100 - throatRadius) / 100;
        const fluxFactor = (100 - quantumFlux) / 100;
        
        const newStability = Math.max(10, Math.min(95, 
          baseStability + fluctuation * intensityFactor + radiusFactor * 10 + fluxFactor * 15
        ));
        
        setStabilityIndex(newStability);
        onStabilityChange(newStability);
        
        setEnergyConsumption(prev => {
          const target = fieldIntensity * 0.8 + throatRadius * 0.4 + quantumFlux * 0.6;
          return Math.max(10, Math.min(100, prev + (target - prev) * 0.1));
        });
        
        setSpatialCurvature(prev => {
          const target = -5 + (throatRadius / 20) + Math.sin(Date.now() * 0.001) * 2;
          return prev + (target - prev) * 0.05;
        });
        
        if (newStability < 30) {
          toast.error("Wormhole stability critical!");
        } else if (newStability > 90) {
          toast.success("Wormhole fully stabilized!");
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, fieldIntensity, throatRadius, quantumFlux, resonanceField, onStabilityChange]);

  const handleToggleActive = () => {
    setIsActive(!isActive);
    if (!isActive) {
      toast.info("Wormhole activation sequence initiated");
    } else {
      toast.info("Wormhole deactivation sequence started");
      setStabilityIndex(0);
    }
  };

  const handleStabilize = () => {
    setFieldIntensity(70);
    setThroatRadius(60);
    setQuantumFlux(40);
    toast.success("Stabilization protocol engaged");
  };

  const handleEmergencyShutdown = () => {
    setIsActive(false);
    setFieldIntensity(0);
    setThroatRadius(100);
    setQuantumFlux(0);
    setStabilityIndex(0);
    toast.warning("Emergency shutdown activated");
  };

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-cyan-500/30 h-full">
      <CardHeader>
        <CardTitle className="text-cyan-400 flex items-center gap-2">
          <Atom className="w-5 h-5" />
          Wormhole Physics Simulator
          <span className="text-xs font-mono bg-cyan-500/20 px-2 py-1 rounded">
            DRR v3.2
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="visualization" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black/50">
            <TabsTrigger value="visualization" className="text-xs">
              <Atom className="w-3 h-3 mr-1" />
              Visualization
            </TabsTrigger>
            <TabsTrigger value="controls" className="text-xs">
              <Settings className="w-3 h-3 mr-1" />
              Controls
            </TabsTrigger>
            <TabsTrigger value="metrics" className="text-xs">
              <BarChart3 className="w-3 h-3 mr-1" />
              Metrics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="visualization" className="m-0">
            <WormholeCanvas
              resonanceField={resonanceField}
              stabilityIndex={stabilityIndex}
              fieldIntensity={fieldIntensity}
              throatRadius={throatRadius}
              quantumFlux={quantumFlux}
              isActive={isActive}
            />
          </TabsContent>

          <TabsContent value="controls" className="m-0">
            <WormholeControls
              isActive={isActive}
              fieldIntensity={fieldIntensity}
              throatRadius={throatRadius}
              quantumFlux={quantumFlux}
              onToggleActive={handleToggleActive}
              onFieldIntensityChange={(value) => setFieldIntensity(value[0])}
              onThroatRadiusChange={(value) => setThroatRadius(value[0])}
              onQuantumFluxChange={(value) => setQuantumFlux(value[0])}
              onStabilize={handleStabilize}
              onEmergencyShutdown={handleEmergencyShutdown}
            />
          </TabsContent>

          <TabsContent value="metrics" className="m-0">
            <WormholeMetrics
              stabilityIndex={stabilityIndex}
              energyConsumption={energyConsumption}
              spatialCurvature={spatialCurvature}
              resonanceField={resonanceField}
              isActive={isActive}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WormholePhysicsSimulator;
