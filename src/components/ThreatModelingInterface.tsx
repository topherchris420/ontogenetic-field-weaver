
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, AlertCircle, Radio, Brain, Atom } from 'lucide-react';

interface ThreatModelingInterfaceProps {
  threats: any[];
  fieldDeformations: any[];
  onThreatMitigation: (mitigation: any) => void;
}

const ThreatModelingInterface: React.FC<ThreatModelingInterfaceProps> = ({
  threats,
  fieldDeformations,
  onThreatMitigation
}) => {
  const [activeSubstrate, setActiveSubstrate] = useState<'kinetic' | 'informational' | 'cognitive' | 'quantum'>('kinetic');
  const [threatMatrix, setThreatMatrix] = useState({
    kinetic: { level: 15, active: 2, contained: 5 },
    informational: { level: 67, active: 8, contained: 12 },
    cognitive: { level: 82, active: 15, contained: 3 },
    quantum: { level: 34, active: 4, contained: 7 }
  });
  const [perturbationMap, setPerturbationMap] = useState<any[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simulate real-time threat evolution
  useEffect(() => {
    const interval = setInterval(() => {
      setThreatMatrix(prev => ({
        kinetic: {
          ...prev.kinetic,
          level: Math.max(0, Math.min(100, prev.kinetic.level + (Math.random() - 0.5) * 5))
        },
        informational: {
          ...prev.informational,
          level: Math.max(0, Math.min(100, prev.informational.level + (Math.random() - 0.5) * 8))
        },
        cognitive: {
          ...prev.cognitive,
          level: Math.max(0, Math.min(100, prev.cognitive.level + (Math.random() - 0.5) * 6))
        },
        quantum: {
          ...prev.quantum,
          level: Math.max(0, Math.min(100, prev.quantum.level + (Math.random() - 0.5) * 4))
        }
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Generate perturbation map from field deformations
  useEffect(() => {
    const newPerturbations = fieldDeformations.map((deformation, index) => ({
      id: index,
      substrate: ['kinetic', 'informational', 'cognitive', 'quantum'][index % 4],
      intensity: deformation.threatLevel || Math.random() * 100,
      vector: deformation.vectors[0],
      timestamp: deformation.timestamp,
      cascading: Math.random() > 0.7
    }));
    
    setPerturbationMap(newPerturbations.slice(-20)); // Keep recent perturbations
  }, [fieldDeformations]);

  // Visualization of threat substrates
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const time = Date.now() * 0.001;

      // Draw substrate layers
      const substrates = [
        { name: 'kinetic', radius: 40, color: '#ff4444', level: threatMatrix.kinetic.level },
        { name: 'informational', radius: 65, color: '#4444ff', level: threatMatrix.informational.level },
        { name: 'cognitive', radius: 90, color: '#44ff44', level: threatMatrix.cognitive.level },
        { name: 'quantum', radius: 115, color: '#ff44ff', level: threatMatrix.quantum.level }
      ];

      substrates.forEach((substrate, index) => {
        const opacity = 0.1 + (substrate.level / 100) * 0.4;
        const pulseIntensity = Math.sin(time * (1 + index * 0.3)) * 0.1;
        
        // Substrate ring
        ctx.strokeStyle = substrate.color + Math.floor((opacity + pulseIntensity) * 255).toString(16).padStart(2, '0');
        ctx.lineWidth = 2 + (substrate.level / 100) * 3;
        ctx.beginPath();
        ctx.arc(centerX, centerY, substrate.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Threat indicators
        const threatCount = Math.floor(substrate.level / 20);
        for (let i = 0; i < threatCount; i++) {
          const angle = (i / threatCount) * Math.PI * 2 + time * 0.5;
          const x = centerX + Math.cos(angle) * substrate.radius;
          const y = centerY + Math.sin(angle) * substrate.radius;
          
          ctx.fillStyle = substrate.color;
          ctx.beginPath();
          ctx.arc(x, y, 2 + Math.sin(time + i) * 1, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw perturbation events
      perturbationMap.forEach((perturbation, index) => {
        const age = (Date.now() - perturbation.timestamp) / 1000;
        if (age > 15) return;
        
        const intensity = Math.max(0, 1 - age / 15);
        const x = centerX + perturbation.vector.x * 60;
        const y = centerY + perturbation.vector.y * 60;
        
        // Perturbation epicenter
        const size = 3 + (perturbation.intensity / 100) * 5;
        ctx.fillStyle = perturbation.cascading ? '#ff0000' : '#ffaa00';
        ctx.globalAlpha = intensity;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        
        // Cascading effects
        if (perturbation.cascading) {
          for (let r = 1; r <= 3; r++) {
            const rippleRadius = r * 8 + age * 3;
            ctx.strokeStyle = `rgba(255, 0, 0, ${intensity * 0.3 / r})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(x, y, rippleRadius, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [threatMatrix, perturbationMap]);

  const getSubstrateIcon = (substrate: string) => {
    switch (substrate) {
      case 'kinetic': return Shield;
      case 'informational': return Radio;
      case 'cognitive': return Brain;
      case 'quantum': return Atom;
      default: return AlertCircle;
    }
  };

  const getSubstrateColor = (substrate: string) => {
    switch (substrate) {
      case 'kinetic': return 'text-red-400';
      case 'informational': return 'text-blue-400';
      case 'cognitive': return 'text-green-400';
      case 'quantum': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const initiateMitigation = (substrate: string) => {
    const mitigation = {
      substrate,
      type: 'containment_protocol',
      timestamp: Date.now(),
      effectiveness: 70 + Math.random() * 25
    };
    
    onThreatMitigation(mitigation);
    
    // Reduce threat level for this substrate
    setThreatMatrix(prev => ({
      ...prev,
      [substrate]: {
        ...prev[substrate as keyof typeof prev],
        level: Math.max(0, prev[substrate as keyof typeof prev].level - 20)
      }
    }));
  };

  return (
    <Card className="bg-black/50 backdrop-blur-sm border-red-500/40 h-full">
      <CardHeader>
        <CardTitle className="text-red-300 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Multilayer Threat Modeling
          <Badge variant="outline" className="ml-auto text-xs border-red-500/50 text-red-400">
            CLASSIFIED
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <canvas
          ref={canvasRef}
          className="w-full h-[200px] border border-red-500/30 rounded bg-black/20"
        />
        
        <Tabs value={activeSubstrate} onValueChange={(value: any) => setActiveSubstrate(value)}>
          <TabsList className="grid w-full grid-cols-4 bg-black/30">
            {['kinetic', 'informational', 'cognitive', 'quantum'].map((substrate) => {
              const Icon = getSubstrateIcon(substrate);
              return (
                <TabsTrigger key={substrate} value={substrate} className="text-xs">
                  <Icon className="w-3 h-3 mr-1" />
                  {substrate.slice(0, 4).toUpperCase()}
                </TabsTrigger>
              );
            })}
          </TabsList>
          
          {['kinetic', 'informational', 'cognitive', 'quantum'].map((substrate) => (
            <TabsContent key={substrate} value={substrate} className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300 capitalize">{substrate} Threat Level</span>
                  <span className={`text-sm font-mono ${getSubstrateColor(substrate)}`}>
                    {threatMatrix[substrate as keyof typeof threatMatrix].level.toFixed(1)}%
                  </span>
                </div>
                <Progress 
                  value={threatMatrix[substrate as keyof typeof threatMatrix].level} 
                  className="h-2"
                />
              </div>
              
              <div className="bg-black/30 rounded-lg p-3 border border-gray-600">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-400">Active Threats:</span>
                    <span className="text-red-400 ml-2">
                      {threatMatrix[substrate as keyof typeof threatMatrix].active}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Contained:</span>
                    <span className="text-green-400 ml-2">
                      {threatMatrix[substrate as keyof typeof threatMatrix].contained}
                    </span>
                  </div>
                </div>
              </div>
              
              <Button
                size="sm"
                onClick={() => initiateMitigation(substrate)}
                className="w-full bg-red-600 hover:bg-red-700 text-xs"
              >
                <Shield className="w-3 h-3 mr-1" />
                Initiate Containment Protocol
              </Button>
            </TabsContent>
          ))}
        </Tabs>

        <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-lg p-3 border border-red-500/20">
          <div className="text-xs text-red-300 mb-2">Ontological Perturbation Alert</div>
          <div className="text-xs text-gray-400">
            {perturbationMap.filter(p => p.cascading).length} cascading events detected across multiple substrates
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreatModelingInterface;
