
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Grid3X3, Atom } from 'lucide-react';

interface TensorLatticeProps {
  seeds: any[];
  temporalGeometry: { x: number; y: number; z: number; t: number };
  resonanceField: number;
}

const TensorLattice: React.FC<TensorLatticeProps> = ({ seeds, temporalGeometry, resonanceField }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw 4D tensor lattice projection
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const time = Date.now() * 0.001;
      
      // Draw grid lines with quantum fluctuations
      ctx.strokeStyle = `rgba(139, 92, 246, ${0.3 + Math.sin(time) * 0.1})`;
      ctx.lineWidth = 1;
      
      for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
          const x = (i - 10) * 20 + centerX + Math.sin(time + i * 0.1) * 5;
          const y = (j - 10) * 20 + centerY + Math.cos(time + j * 0.1) * 5;
          
          ctx.beginPath();
          ctx.arc(x, y, 2 + Math.sin(time + i + j) * 1, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Draw ontological seeds as quantum nodes
      seeds.forEach((seed, index) => {
        const angle = (index / seeds.length) * Math.PI * 2 + time * 0.5;
        const radius = 80 + Math.sin(time + index) * 20;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        // Seed glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 15);
        gradient.addColorStop(0, `rgba(${100 + index * 20}, ${150 + index * 10}, 255, 0.8)`);
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.fill();

        // Seed core
        ctx.fillStyle = '#60a5fa';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Connections between seeds
        if (index > 0) {
          const prevAngle = ((index - 1) / seeds.length) * Math.PI * 2 + time * 0.5;
          const prevX = centerX + Math.cos(prevAngle) * (80 + Math.sin(time + index - 1) * 20);
          const prevY = centerY + Math.sin(prevAngle) * (80 + Math.sin(time + index - 1) * 20);
          
          ctx.strokeStyle = `rgba(147, 51, 234, ${0.4 + Math.sin(time + index) * 0.2})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      });

      // Draw temporal geometry indicator
      ctx.fillStyle = 'rgba(236, 72, 153, 0.6)';
      ctx.beginPath();
      ctx.arc(
        centerX + temporalGeometry.x * 100,
        centerY + temporalGeometry.y * 100,
        5 + Math.sin(temporalGeometry.t) * 3,
        0,
        Math.PI * 2
      );
      ctx.fill();

      requestAnimationFrame(animate);
    };

    animate();
  }, [seeds, temporalGeometry, resonanceField]);

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-blue-500/30 h-full">
      <CardHeader>
        <CardTitle className="text-blue-400 flex items-center gap-2">
          <Grid3X3 className="w-5 h-5" />
          4D Tensor Lattice
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <canvas
          ref={canvasRef}
          className="w-full h-[300px] border-t border-blue-500/20"
        />
        <div className="p-4 text-xs text-gray-400">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-blue-400">DRR Framework:</span> Active
            </div>
            <div>
              <span className="text-purple-400">Topology:</span> Non-Euclidean
            </div>
            <div>
              <span className="text-cyan-400">Resonance Roots:</span> {seeds.length}
            </div>
            <div>
              <span className="text-pink-400">Field Intensity:</span> {resonanceField.toFixed(1)}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TensorLattice;
