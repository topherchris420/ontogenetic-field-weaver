
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Atom, Zap, Eye } from 'lucide-react';

interface QuantumFieldVisualizerProps {
  resonanceField: number;
  ontologicalSeeds: any[];
}

const QuantumFieldVisualizer: React.FC<QuantumFieldVisualizerProps> = ({ resonanceField, ontologicalSeeds }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fieldIntensity, setFieldIntensity] = useState([75]);
  const [visualMode, setVisualMode] = useState<'particles' | 'waves' | 'neural'>('particles');
  const [isInteracting, setIsInteracting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      hue: number;
    }> = [];

    // Initialize particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: Math.random() * 100,
        maxLife: 100 + Math.random() * 100,
        hue: Math.random() * 360
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;
      const intensity = fieldIntensity[0] / 100;

      particles.forEach((particle, index) => {
        // Update particle based on visualization mode
        if (visualMode === 'particles') {
          // Quantum particle behavior
          particle.x += particle.vx + Math.sin(time + index * 0.1) * intensity;
          particle.y += particle.vy + Math.cos(time + index * 0.1) * intensity;
          
          // Mouse interaction
          if (isInteracting) {
            const dx = mousePos.x - particle.x;
            const dy = mousePos.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
              particle.vx += dx * 0.0001;
              particle.vy += dy * 0.0001;
            }
          }
        } else if (visualMode === 'waves') {
          // Wave interference patterns
          particle.x = (index % 10) * (canvas.width / 10) + Math.sin(time + index * 0.2) * 20 * intensity;
          particle.y = Math.floor(index / 10) * (canvas.height / 10) + Math.cos(time + index * 0.3) * 30 * intensity;
        } else if (visualMode === 'neural') {
          // Neural network visualization
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const angle = (index / particles.length) * Math.PI * 2;
          const radius = 100 + Math.sin(time + index * 0.1) * 50 * intensity;
          particle.x = centerX + Math.cos(angle) * radius;
          particle.y = centerY + Math.sin(angle) * radius;
        }

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Update life
        particle.life++;
        if (particle.life > particle.maxLife) {
          particle.life = 0;
          particle.hue = Math.random() * 360;
        }

        // Draw particle
        const alpha = 1 - (particle.life / particle.maxLife);
        const size = 2 + Math.sin(time + index) * intensity;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue + time * 10}, 70%, 60%, ${alpha * 0.8})`;
        ctx.fill();

        // Draw connections in neural mode
        if (visualMode === 'neural' && index < particles.length - 1) {
          const nextParticle = particles[index + 1];
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(nextParticle.x, nextParticle.y);
          ctx.strokeStyle = `hsla(280, 50%, 50%, ${alpha * 0.3})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Draw ontological seeds as energy nodes
      ontologicalSeeds.forEach((seed, index) => {
        const x = (index * 80 + time * 20) % canvas.width;
        const y = canvas.height / 2 + Math.sin(time + index) * 50;
        
        // Energy pulse
        const pulseSize = 10 + Math.sin(time * 2 + index) * 5;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, pulseSize);
        gradient.addColorStop(0, 'rgba(236, 72, 153, 0.8)');
        gradient.addColorStop(1, 'rgba(236, 72, 153, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', () => setIsInteracting(true));
    canvas.addEventListener('mouseleave', () => setIsInteracting(false));

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [fieldIntensity, visualMode, resonanceField, ontologicalSeeds, isInteracting, mousePos]);

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-cyan-500/30">
      <CardHeader>
        <CardTitle className="text-cyan-400 flex items-center gap-2">
          <Atom className="w-5 h-5" />
          Quantum Field Visualizer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {[
            { mode: 'particles', icon: Zap, label: 'Particles' },
            { mode: 'waves', icon: Eye, label: 'Waves' },
            { mode: 'neural', icon: Atom, label: 'Neural' }
          ].map(({ mode, icon: Icon, label }) => (
            <Button
              key={mode}
              variant={visualMode === mode ? 'default' : 'outline'}
              size="sm"
              onClick={() => setVisualMode(mode as any)}
              className="flex items-center gap-1"
            >
              <Icon className="w-3 h-3" />
              {label}
            </Button>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300">Field Intensity</span>
            <span className="text-sm text-cyan-400">{fieldIntensity[0]}%</span>
          </div>
          <Slider
            value={fieldIntensity}
            onValueChange={setFieldIntensity}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        <canvas
          ref={canvasRef}
          className="w-full h-[250px] border border-cyan-500/20 rounded cursor-crosshair"
          style={{ background: 'linear-gradient(45deg, #0f0f23, #1a1a2e)' }}
        />

        <div className="text-xs text-gray-400 grid grid-cols-2 gap-4">
          <div>Active Particles: {100}</div>
          <div>Field Resonance: {resonanceField.toFixed(1)}%</div>
          <div>Quantum Coherence: {(85 + Math.sin(Date.now() * 0.001) * 10).toFixed(1)}%</div>
          <div>Entanglement Depth: {ontologicalSeeds.length}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuantumFieldVisualizer;
