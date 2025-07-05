
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Clock, Layers, Zap, AlertTriangle } from 'lucide-react';

interface ChronoTopologicalCoreProps {
  fieldDeformations: any[];
  temporalGeometry: { x: number; y: number; z: number; t: number };
  onCausalDisruption: (disruption: any) => void;
}

const ChronoTopologicalCore: React.FC<ChronoTopologicalCoreProps> = ({
  fieldDeformations,
  temporalGeometry,
  onCausalDisruption
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensionWeights, setDimensionWeights] = useState([25, 25, 25, 25]);
  const [torsionField, setTorsionField] = useState(0);
  const [latticeStability, setLatticeStability] = useState(85);
  const [activeRoots, setActiveRoots] = useState<any[]>([]);

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

      // Draw 4D lattice projection
      const gridSize = 8;
      const spacing = 30;

      // X-Y plane (base reality)
      ctx.strokeStyle = `rgba(0, 255, 200, ${0.3 + Math.sin(time) * 0.1})`;
      ctx.lineWidth = 1;
      
      for (let i = -gridSize; i <= gridSize; i++) {
        for (let j = -gridSize; j <= gridSize; j++) {
          const x = centerX + i * spacing + Math.sin(time + i * 0.1) * (dimensionWeights[0] / 10);
          const y = centerY + j * spacing + Math.cos(time + j * 0.1) * (dimensionWeights[1] / 10);
          const z_offset = Math.sin(time + i + j) * (dimensionWeights[2] / 15);
          const t_offset = Math.cos(time * 0.5 + i - j) * (dimensionWeights[3] / 20);
          
          // Node with Z and T influence
          const nodeSize = 2 + z_offset + t_offset;
          const alpha = 0.5 + (z_offset + t_offset) * 0.1;
          
          ctx.fillStyle = `rgba(${100 + i * 10}, ${150 + j * 8}, ${200 + z_offset * 20}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, Math.abs(nodeSize), 0, Math.PI * 2);
          ctx.fill();

          // Connections showing torsion
          if (i < gridSize && j < gridSize) {
            const nextX = centerX + (i + 1) * spacing + Math.sin(time + (i + 1) * 0.1) * (dimensionWeights[0] / 10);
            const nextY = centerY + (j + 1) * spacing + Math.cos(time + (j + 1) * 0.1) * (dimensionWeights[1] / 10);
            
            ctx.strokeStyle = `rgba(100, 200, 255, ${0.2 + torsionField * 0.01})`;
            ctx.lineWidth = 0.5 + torsionField * 0.02;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(nextX, nextY);
            ctx.stroke();
          }
        }
      }

      // Draw temporal event structures
      fieldDeformations.forEach((deformation, index) => {
        if (index >= 10) return; // Limit to recent deformations
        
        const age = (Date.now() - deformation.timestamp) / 1000;
        if (age > 30) return; // Fade after 30 seconds
        
        const eventX = centerX + deformation.vectors[0].x * 100;
        const eventY = centerY + deformation.vectors[0].y * 100;
        const intensity = Math.max(0, 1 - age / 30);
        
        // Event epicenter
        const gradient = ctx.createRadialGradient(eventX, eventY, 0, eventX, eventY, 25);
        gradient.addColorStop(0, `rgba(255, 100, 100, ${intensity * 0.8})`);
        gradient.addColorStop(1, `rgba(255, 0, 100, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(eventX, eventY, 25, 0, Math.PI * 2);
        ctx.fill();

        // Causal ripples
        for (let r = 1; r <= 3; r++) {
          const rippleRadius = r * 15 + age * 5;
          ctx.strokeStyle = `rgba(255, 150, 0, ${intensity * 0.3 / r})`;
          ctx.lineWidth = 2 / r;
          ctx.beginPath();
          ctx.arc(eventX, eventY, rippleRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // Draw DRR phase roots
      activeRoots.forEach((root, index) => {
        const rootAngle = (index / activeRoots.length) * Math.PI * 2 + time * 0.3;
        const rootRadius = 60 + Math.sin(time + index) * 15;
        const rootX = centerX + Math.cos(rootAngle) * rootRadius;
        const rootY = centerY + Math.sin(rootAngle) * rootRadius;
        
        // Root anchor
        ctx.fillStyle = '#ff6b35';
        ctx.beginPath();
        ctx.arc(rootX, rootY, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Root field
        const rootGradient = ctx.createRadialGradient(rootX, rootY, 0, rootX, rootY, 12);
        rootGradient.addColorStop(0, 'rgba(255, 107, 53, 0.6)');
        rootGradient.addColorStop(1, 'rgba(255, 107, 53, 0)');
        
        ctx.fillStyle = rootGradient;
        ctx.beginPath();
        ctx.arc(rootX, rootY, 12, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [fieldDeformations, dimensionWeights, torsionField, activeRoots]);

  const generatePhaseRoot = () => {
    const newRoot = {
      id: Date.now(),
      phase: Math.random() * Math.PI * 2,
      stability: Math.random() * 100,
      timestamp: Date.now()
    };
    
    setActiveRoots(prev => [...prev.slice(-4), newRoot]); // Keep max 5 roots
    setLatticeStability(prev => Math.max(60, prev + Math.random() * 20 - 10));
  };

  const triggerCausalDisruption = () => {
    const disruption = {
      type: 'temporal_cascade',
      magnitude: Math.random() * 100,
      targetVector: {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
        z: (Math.random() - 0.5) * 2,
        t: Date.now()
      },
      timestamp: Date.now()
    };
    
    onCausalDisruption(disruption);
    setTorsionField(prev => Math.min(100, prev + 15));
    
    // Torsion field decay
    setTimeout(() => {
      setTorsionField(prev => Math.max(0, prev - 10));
    }, 3000);
  };

  return (
    <Card className="bg-black/50 backdrop-blur-sm border-orange-500/40 h-full">
      <CardHeader>
        <CardTitle className="text-orange-300 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Chrono-Topological Core
          <Badge variant="outline" className="ml-auto text-xs border-orange-500/50 text-orange-400">
            4D-LATTICE
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <canvas
          ref={canvasRef}
          className="w-full h-[250px] border border-orange-500/30 rounded bg-black/20"
        />
        
        {/* Dimension Controls */}
        <div className="space-y-3">
          <h4 className="text-sm text-gray-300 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Dimensional Weights
          </h4>
          {['X-Space', 'Y-Space', 'Z-Space', 'T-Time'].map((dim, index) => (
            <div key={dim} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">{dim}</span>
                <span className="text-orange-400">{dimensionWeights[index]}%</span>
              </div>
              <Slider
                value={[dimensionWeights[index]]}
                onValueChange={(value) => {
                  const newWeights = [...dimensionWeights];
                  newWeights[index] = value[0];
                  setDimensionWeights(newWeights);
                }}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
          ))}
        </div>

        {/* Control Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            size="sm"
            onClick={generatePhaseRoot}
            className="bg-orange-600 hover:bg-orange-700 text-xs"
          >
            <Zap className="w-3 h-3 mr-1" />
            Root Phase
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={triggerCausalDisruption}
            className="border-red-500/50 text-red-400 hover:bg-red-500/10 text-xs"
          >
            <AlertTriangle className="w-3 h-3 mr-1" />
            Disrupt
          </Button>
        </div>

        {/* Status Display */}
        <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-lg p-3 border border-orange-500/20">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-gray-400">Lattice Stability:</span>
              <span className="text-orange-400 ml-2">{latticeStability.toFixed(1)}%</span>
            </div>
            <div>
              <span className="text-gray-400">Torsion Field:</span>
              <span className="text-red-400 ml-2">{torsionField.toFixed(1)}%</span>
            </div>
            <div>
              <span className="text-gray-400">Active Roots:</span>
              <span className="text-yellow-400 ml-2">{activeRoots.length}</span>
            </div>
            <div>
              <span className="text-gray-400">Event Density:</span>
              <span className="text-cyan-400 ml-2">{fieldDeformations.length}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChronoTopologicalCore;
