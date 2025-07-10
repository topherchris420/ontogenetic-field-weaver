
import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Zap, Activity, AlertTriangle, Eye } from 'lucide-react';

interface WormholePhysicsSimulatorProps {
  resonanceField: number;
  onStabilityChange?: (stability: number) => void;
}

interface WormholeMetrics {
  throatDiameter: number;
  energyUsage: number;
  collapseRisk: number;
  drrResonanceDepth: number;
  spacetimeCurvature: number;
}

const WormholePhysicsSimulator: React.FC<WormholePhysicsSimulatorProps> = ({ 
  resonanceField, 
  onStabilityChange 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  // Gravitational wave parameters
  const [frequency, setFrequency] = useState([2.5]);
  const [amplitude, setAmplitude] = useState([0.7]);
  const [phase, setPhase] = useState([0]);
  const [isSimulating, setIsSimulating] = useState(true);
  
  // Wormhole metrics
  const [metrics, setMetrics] = useState<WormholeMetrics>({
    throatDiameter: 1.0,
    energyUsage: 45.2,
    collapseRisk: 12.8,
    drrResonanceDepth: 3.2,
    spacetimeCurvature: 0.85
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size for mobile responsiveness
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const animate = (time: number) => {
      if (!isSimulating) return;

      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      const centerX = width / 2;
      const centerY = height / 2;

      // Clear canvas with gradient background
      const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, height) / 2);
      bgGradient.addColorStop(0, 'rgba(15, 15, 35, 1)');
      bgGradient.addColorStop(1, 'rgba(5, 5, 15, 1)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Calculate gravitational wave effect
      const t = time * 0.001;
      const waveEffect = amplitude[0] * Math.sin(frequency[0] * t + phase[0]);
      
      // Update metrics based on wave parameters
      const newMetrics: WormholeMetrics = {
        throatDiameter: 1.0 + waveEffect * 0.3,
        energyUsage: 45 + Math.abs(waveEffect) * 25 + frequency[0] * 10,
        collapseRisk: Math.max(0, 15 - resonanceField * 0.2 + Math.abs(waveEffect) * 10),
        drrResonanceDepth: 3.2 + resonanceField * 0.05 - Math.abs(waveEffect) * 0.5,
        spacetimeCurvature: 0.85 + waveEffect * 0.15
      };
      setMetrics(newMetrics);

      // Draw spacetime grid with curvature
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
      ctx.lineWidth = 1;
      
      for (let i = -10; i <= 10; i++) {
        for (let j = -10; j <= 10; j++) {
          const gridX = centerX + i * 30;
          const gridY = centerY + j * 30;
          
          // Apply spacetime curvature distortion
          const distFromCenter = Math.sqrt((gridX - centerX) ** 2 + (gridY - centerY) ** 2);
          const curvatureEffect = newMetrics.spacetimeCurvature * Math.exp(-distFromCenter / 100);
          const distortedX = gridX + curvatureEffect * Math.sin(t + i) * 10;
          const distortedY = gridY + curvatureEffect * Math.cos(t + j) * 10;
          
          ctx.beginPath();
          ctx.arc(distortedX, distortedY, 1, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Draw wormhole throat
      const throatRadius = 40 * newMetrics.throatDiameter;
      
      // Outer event horizon
      const outerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, throatRadius * 1.5);
      outerGradient.addColorStop(0, 'rgba(147, 51, 234, 0.8)');
      outerGradient.addColorStop(0.7, 'rgba(147, 51, 234, 0.3)');
      outerGradient.addColorStop(1, 'rgba(147, 51, 234, 0)');
      
      ctx.fillStyle = outerGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, throatRadius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Inner throat
      const innerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, throatRadius);
      innerGradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
      innerGradient.addColorStop(0.8, 'rgba(59, 130, 246, 0.6)');
      innerGradient.addColorStop(1, 'rgba(147, 51, 234, 0.8)');
      
      ctx.fillStyle = innerGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, throatRadius, 0, Math.PI * 2);
      ctx.fill();

      // Draw gravitational waves
      ctx.strokeStyle = 'rgba(236, 72, 153, 0.8)';
      ctx.lineWidth = 2;
      
      for (let ring = 1; ring <= 5; ring++) {
        const radius = throatRadius * 1.5 + ring * 30 + waveEffect * 20;
        const opacity = Math.max(0, 0.8 - ring * 0.15);
        
        ctx.strokeStyle = `rgba(236, 72, 153, ${opacity})`;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw DRR resonance indicators
      const resonancePoints = 8;
      for (let i = 0; i < resonancePoints; i++) {
        const angle = (i / resonancePoints) * Math.PI * 2 + t * 0.5;
        const resonanceRadius = throatRadius * 2 + Math.sin(t * 2 + i) * 10;
        const x = centerX + Math.cos(angle) * resonanceRadius;
        const y = centerY + Math.sin(angle) * resonanceRadius;
        
        ctx.fillStyle = `rgba(34, 197, 94, ${0.6 + Math.sin(t * 3 + i) * 0.3})`;
        ctx.beginPath();
        ctx.arc(x, y, 3 + newMetrics.drrResonanceDepth, 0, Math.PI * 2);
        ctx.fill();
      }

      if (isSimulating) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [frequency, amplitude, phase, resonanceField, isSimulating]);

  const getStabilityLevel = () => {
    const stability = 100 - metrics.collapseRisk * 2;
    if (stability > 80) return { level: 'Stable', color: 'bg-green-500/20 text-green-400 border-green-500/30' };
    if (stability > 50) return { level: 'Unstable', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' };
    return { level: 'Critical', color: 'bg-red-500/20 text-red-400 border-red-500/30' };
  };

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-purple-400 flex items-center gap-2 text-sm md:text-base">
          <Zap className="w-4 h-4 md:w-5 md:h-5" />
          DRR Wormhole Stabilizer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mobile-optimized controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-300">Frequency</span>
              <span className="text-xs text-purple-400">{frequency[0].toFixed(1)} Hz</span>
            </div>
            <Slider
              value={frequency}
              onValueChange={setFrequency}
              min={0.1}
              max={5}
              step={0.1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-300">Amplitude</span>
              <span className="text-xs text-purple-400">{amplitude[0].toFixed(2)}</span>
            </div>
            <Slider
              value={amplitude}
              onValueChange={setAmplitude}
              min={0.1}
              max={2}
              step={0.1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-300">Phase</span>
              <span className="text-xs text-purple-400">{phase[0].toFixed(1)}°</span>
            </div>
            <Slider
              value={phase}
              onValueChange={setPhase}
              min={0}
              max={360}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* Physics simulation canvas */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-full h-48 sm:h-64 md:h-80 border border-purple-500/20 rounded bg-gradient-to-br from-slate-900 to-purple-900/20"
          />
          
          {/* Simulation controls overlay */}
          <div className="absolute top-2 right-2 flex gap-1">
            <Button
              size="sm"
              variant={isSimulating ? "default" : "outline"}
              onClick={() => setIsSimulating(!isSimulating)}
              className="h-6 px-2 text-xs"
            >
              {isSimulating ? 'Pause' : 'Start'}
            </Button>
          </div>
        </div>

        {/* System metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="bg-gray-900/50 rounded-lg p-2">
            <div className="text-gray-400">Throat Ø</div>
            <div className="text-cyan-400 font-mono">{metrics.throatDiameter.toFixed(2)}m</div>
          </div>
          
          <div className="bg-gray-900/50 rounded-lg p-2">
            <div className="text-gray-400">Energy</div>
            <div className="text-orange-400 font-mono">{metrics.energyUsage.toFixed(1)}TW</div>
          </div>
          
          <div className="bg-gray-900/50 rounded-lg p-2">
            <div className="text-gray-400">DRR Depth</div>
            <div className="text-green-400 font-mono">{metrics.drrResonanceDepth.toFixed(1)}</div>
          </div>
          
          <div className="bg-gray-900/50 rounded-lg p-2">
            <div className="text-gray-400">Curvature</div>
            <div className="text-blue-400 font-mono">{metrics.spacetimeCurvature.toFixed(2)}</div>
          </div>
        </div>

        {/* Status indicators */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="outline" className={getStabilityLevel().color}>
            <Activity className="w-3 h-3 mr-1" />
            {getStabilityLevel().level}
          </Badge>
          
          {metrics.collapseRisk > 30 && (
            <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Collapse Risk: {metrics.collapseRisk.toFixed(1)}%
            </Badge>
          )}
          
          <div className="text-xs text-gray-400">
            Resonance Field: {resonanceField.toFixed(1)}%
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WormholePhysicsSimulator;
