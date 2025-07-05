
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GitBranch, Zap, AlertTriangle } from 'lucide-react';

interface RealityDivergenceMapProps {
  seeds: any[];
  temporalGeometry: { x: number; y: number; z: number; t: number };
}

const RealityDivergenceMap: React.FC<RealityDivergenceMapProps> = ({ seeds, temporalGeometry }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

      // Draw reality branches
      const branches = [
        { angle: 0, probability: 0.8, type: 'possible', color: '#10b981' },
        { angle: Math.PI / 3, probability: 0.6, type: 'probable', color: '#3b82f6' },
        { angle: 2 * Math.PI / 3, probability: 0.3, type: 'paradoxical', color: '#ef4444' },
        { angle: Math.PI, probability: 0.7, type: 'possible', color: '#10b981' },
        { angle: 4 * Math.PI / 3, probability: 0.4, type: 'probable', color: '#3b82f6' },
        { angle: 5 * Math.PI / 3, probability: 0.2, type: 'paradoxical', color: '#ef4444' }
      ];

      branches.forEach((branch, index) => {
        const startX = centerX;
        const startY = centerY;
        const length = 100 + branch.probability * 50;
        const endX = startX + Math.cos(branch.angle + time * 0.2) * length;
        const endY = startY + Math.sin(branch.angle + time * 0.2) * length;

        // Draw branch line with probability-based opacity
        ctx.strokeStyle = branch.color + Math.floor(branch.probability * 255).toString(16).padStart(2, '0');
        ctx.lineWidth = 2 + branch.probability * 2;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Draw probability nodes
        for (let i = 1; i <= 3; i++) {
          const nodeX = startX + (endX - startX) * (i / 3);
          const nodeY = startY + (endY - startY) * (i / 3);
          const nodeSize = 3 + Math.sin(time + index + i) * 2;

          ctx.fillStyle = branch.color;
          ctx.beginPath();
          ctx.arc(nodeX, nodeY, nodeSize, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw end node with pulsing effect
        const pulseSize = 5 + Math.sin(time * 2 + index) * 3;
        ctx.fillStyle = branch.color;
        ctx.beginPath();
        ctx.arc(endX, endY, pulseSize, 0, Math.PI * 2);
        ctx.fill();

        // Add glow effect
        const gradient = ctx.createRadialGradient(endX, endY, 0, endX, endY, pulseSize * 2);
        gradient.addColorStop(0, branch.color + '80');
        gradient.addColorStop(1, branch.color + '00');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(endX, endY, pulseSize * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw central reality core
      const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 20);
      coreGradient.addColorStop(0, '#ffffff');
      coreGradient.addColorStop(0.5, '#8b5cf6');
      coreGradient.addColorStop(1, '#1e1b4b');
      
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 15 + Math.sin(time) * 3, 0, Math.PI * 2);
      ctx.fill();

      // Draw quantum interference patterns
      seeds.forEach((seed, index) => {
        const waveLength = 40;
        const amplitude = 10;
        const frequency = time + index * 0.5;
        
        ctx.strokeStyle = `rgba(${100 + index * 30}, ${150 + index * 20}, 255, 0.3)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        
        for (let x = 0; x < canvas.width; x += 5) {
          const y = centerY + Math.sin((x / waveLength) + frequency) * amplitude * Math.sin(time * 0.5);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [seeds, temporalGeometry]);

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-green-500/30 h-full">
      <CardHeader>
        <CardTitle className="text-green-400 flex items-center gap-2">
          <GitBranch className="w-5 h-5" />
          Reality Divergence Map
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <canvas
          ref={canvasRef}
          className="w-full h-[250px] border-t border-green-500/20"
        />
        <div className="p-4">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
              <div className="text-xs text-green-400">Possible</div>
              <div className="text-xs text-gray-400">67%</div>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-1"></div>
              <div className="text-xs text-blue-400">Probable</div>
              <div className="text-xs text-gray-400">23%</div>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-1"></div>
              <div className="text-xs text-red-400">Paradoxical</div>
              <div className="text-xs text-gray-400">10%</div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1 text-xs border-green-500/30 hover:bg-green-500/10">
              <Zap className="w-3 h-3 mr-1" />
              Collapse Wave
            </Button>
            <Button size="sm" variant="outline" className="flex-1 text-xs border-red-500/30 hover:bg-red-500/10">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Stabilize Paradox
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealityDivergenceMap;
