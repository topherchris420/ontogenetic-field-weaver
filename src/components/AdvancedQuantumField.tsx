import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Atom, Zap, Sparkles, Activity, Orbit, Brain } from 'lucide-react';
import { toast } from 'sonner';

interface AdvancedQuantumFieldProps {
  resonanceField: number;
  quantumState: string;
  ontologicalSeeds: any[];
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
  energy: number;
  type: 'quantum' | 'photon' | 'wave' | 'neutrino' | 'entangled';
  trail: Array<{ x: number; y: number; opacity: number }>;
}

interface QuantumWave {
  centerX: number;
  centerY: number;
  radius: number;
  maxRadius: number;
  frequency: number;
  amplitude: number;
  phase: number;
  hue: number;
}

const AdvancedQuantumField: React.FC<AdvancedQuantumFieldProps> = ({
  resonanceField,
  quantumState,
  ontologicalSeeds
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fieldIntensity, setFieldIntensity] = useState([85]);
  const [particleDensity, setParticleDensity] = useState([150]);
  const [waveAmplitude, setWaveAmplitude] = useState([70]);
  const [entanglementStrength, setEntanglementStrength] = useState([60]);
  const [visualMode, setVisualMode] = useState<'quantum' | 'interference' | 'entanglement' | 'consciousness'>('quantum');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const wavesRef = useRef<QuantumWave[]>([]);
  const animationFrameRef = useRef<number>();

  // Initialize quantum particles with different types
  const initializeParticles = (canvas: HTMLCanvasElement) => {
    const count = particleDensity[0];
    particlesRef.current = [];

    for (let i = 0; i < count; i++) {
      const types: Particle['type'][] = ['quantum', 'photon', 'wave', 'neutrino', 'entangled'];
      const type = types[Math.floor(Math.random() * types.length)];
      
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        ax: 0,
        ay: 0,
        life: 0,
        maxLife: 200 + Math.random() * 300,
        size: type === 'photon' ? 1 : type === 'neutrino' ? 0.5 : 2 + Math.random() * 3,
        hue: type === 'quantum' ? 280 : type === 'photon' ? 200 : type === 'wave' ? 320 : type === 'neutrino' ? 100 : 350,
        energy: Math.random() * 100,
        type,
        trail: []
      });
    }
  };

  // Initialize quantum waves
  const initializeWaves = (canvas: HTMLCanvasElement) => {
    wavesRef.current = [];
    for (let i = 0; i < 8; i++) {
      wavesRef.current.push({
        centerX: Math.random() * canvas.width,
        centerY: Math.random() * canvas.height,
        radius: 0,
        maxRadius: 100 + Math.random() * 200,
        frequency: 0.02 + Math.random() * 0.05,
        amplitude: waveAmplitude[0] / 100,
        phase: Math.random() * Math.PI * 2,
        hue: 200 + Math.random() * 160
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * devicePixelRatio;
    canvas.height = canvas.offsetHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const actualWidth = canvas.offsetWidth;
    const actualHeight = canvas.offsetHeight;

    initializeParticles(canvas);
    initializeWaves(canvas);

    const animate = () => {
      // Clear with quantum trail effect
      ctx.fillStyle = 'rgba(5, 5, 15, 0.03)';
      ctx.fillRect(0, 0, actualWidth, actualHeight);

      const time = Date.now() * 0.001;
      const intensity = fieldIntensity[0] / 100;
      const entanglement = entanglementStrength[0] / 100;

      // Update and draw quantum waves
      if (visualMode === 'interference' || visualMode === 'consciousness') {
        wavesRef.current.forEach(wave => {
          wave.radius += wave.frequency * 30;
          if (wave.radius > wave.maxRadius) {
            wave.radius = 0;
            wave.centerX = Math.random() * actualWidth;
            wave.centerY = Math.random() * actualHeight;
          }

          // Draw wave interference patterns
          for (let r = 0; r < wave.radius; r += 10) {
            const alpha = (1 - r / wave.radius) * wave.amplitude * 0.3;
            const thickness = Math.sin(time + wave.phase + r * 0.1) * 2 + 2;
            
            ctx.beginPath();
            ctx.arc(wave.centerX, wave.centerY, r, 0, Math.PI * 2);
            ctx.strokeStyle = `hsla(${wave.hue}, 70%, 60%, ${alpha})`;
            ctx.lineWidth = thickness;
            ctx.stroke();
          }
        });
      }

      // Update and draw particles with advanced physics
      particlesRef.current.forEach((particle, index) => {
        // Advanced particle physics based on type
        switch (particle.type) {
          case 'quantum':
            // Quantum tunneling behavior
            particle.ax = Math.sin(time + index * 0.1) * intensity * 0.5;
            particle.ay = Math.cos(time + index * 0.15) * intensity * 0.5;
            if (Math.random() < 0.001) { // Quantum tunneling
              particle.x = Math.random() * actualWidth;
              particle.y = Math.random() * actualHeight;
            }
            break;
            
          case 'photon':
            // Light-speed movement
            particle.vx = Math.cos(time + index * 0.2) * 8;
            particle.vy = Math.sin(time + index * 0.2) * 8;
            break;
            
          case 'wave':
            // Wave function collapse
            const waveX = actualWidth / 2 + Math.sin(time + index * 0.3) * 100 * intensity;
            const waveY = actualHeight / 2 + Math.cos(time + index * 0.3) * 100 * intensity;
            particle.x += (waveX - particle.x) * 0.02;
            particle.y += (waveY - particle.y) * 0.02;
            break;
            
          case 'neutrino':
            // Barely interacting, straight paths
            particle.x += particle.vx * 3;
            particle.y += particle.vy * 3;
            break;
            
          case 'entangled':
            // Entanglement with other particles
            const partner = particlesRef.current.find((p, i) => 
              i !== index && p.type === 'entangled' && Math.abs(i - index) === 1
            );
            if (partner) {
              particle.vx += (partner.x - particle.x) * 0.001 * entanglement;
              particle.vy += (partner.y - particle.y) * 0.001 * entanglement;
            }
            break;
        }

        // Apply velocity and acceleration
        particle.vx += particle.ax;
        particle.vy += particle.ay;
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary wrapping with quantum behavior
        if (particle.x < 0) particle.x = actualWidth;
        if (particle.x > actualWidth) particle.x = 0;
        if (particle.y < 0) particle.y = actualHeight;
        if (particle.y > actualHeight) particle.y = 0;

        // Update trail
        particle.trail.push({ x: particle.x, y: particle.y, opacity: 1 });
        if (particle.trail.length > 20) particle.trail.shift();
        particle.trail.forEach((point, i) => {
          point.opacity *= 0.9;
        });

        // Update particle life and energy
        particle.life++;
        particle.energy = 50 + Math.sin(time + index) * 50;
        
        // Quantum state transitions
        if (quantumState === 'superposition' && Math.random() < 0.01) {
          particle.size = Math.random() * 5 + 1;
        }

        // Draw particle trail
        if (particle.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
          particle.trail.forEach((point, i) => {
            if (i > 0) {
              ctx.lineTo(point.x, point.y);
            }
          });
          ctx.strokeStyle = `hsla(${particle.hue}, 70%, 50%, 0.3)`;
          ctx.lineWidth = particle.size * 0.5;
          ctx.stroke();
        }

        // Draw particle with energy glow
        const glowSize = particle.size + (particle.energy / 50) * 3;
        const alpha = Math.min(1, particle.energy / 100);
        
        // Outer glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, glowSize * 2
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, ${alpha * 0.8})`);
        gradient.addColorStop(0.5, `hsla(${particle.hue}, 60%, 50%, ${alpha * 0.4})`);
        gradient.addColorStop(1, `hsla(${particle.hue}, 50%, 40%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowSize * 2, 0, Math.PI * 2);
        ctx.fill();

        // Core particle
        ctx.fillStyle = `hsla(${particle.hue}, 80%, 70%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Particle reset
        if (particle.life > particle.maxLife) {
          particle.life = 0;
          particle.x = Math.random() * actualWidth;
          particle.y = Math.random() * actualHeight;
          particle.vx = (Math.random() - 0.5) * 2;
          particle.vy = (Math.random() - 0.5) * 2;
        }
      });

      // Draw quantum entanglement connections
      if (visualMode === 'entanglement') {
        const entangledParticles = particlesRef.current.filter(p => p.type === 'entangled');
        for (let i = 0; i < entangledParticles.length - 1; i += 2) {
          const p1 = entangledParticles[i];
          const p2 = entangledParticles[i + 1];
          if (p1 && p2) {
            const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
            const maxDistance = 200;
            if (distance < maxDistance) {
              const alpha = (1 - distance / maxDistance) * entanglement;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `hsla(350, 70%, 60%, ${alpha * 0.6})`;
              ctx.lineWidth = 2;
              ctx.stroke();
              
              // Draw entanglement pulse
              const pulsePos = (Math.sin(time * 3) + 1) / 2;
              const pulseX = p1.x + (p2.x - p1.x) * pulsePos;
              const pulseY = p1.y + (p2.y - p1.y) * pulsePos;
              
              ctx.fillStyle = `hsla(350, 80%, 70%, ${alpha})`;
              ctx.beginPath();
              ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      // Draw consciousness field effect
      if (visualMode === 'consciousness') {
        ontologicalSeeds.forEach((seed, index) => {
          const x = (actualWidth / 2) + Math.cos(time + index * 0.5) * 100;
          const y = (actualHeight / 2) + Math.sin(time + index * 0.7) * 80;
          
          // Consciousness node
          const nodeSize = 15 + Math.sin(time * 2 + index) * 8;
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, nodeSize);
          gradient.addColorStop(0, 'hsla(60, 80%, 70%, 0.9)');
          gradient.addColorStop(0.7, 'hsla(280, 70%, 60%, 0.5)');
          gradient.addColorStop(1, 'hsla(280, 60%, 50%, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, nodeSize, 0, Math.PI * 2);
          ctx.fill();
          
          // Neural connections
          if (index < ontologicalSeeds.length - 1) {
            const nextX = (actualWidth / 2) + Math.cos(time + (index + 1) * 0.5) * 100;
            const nextY = (actualHeight / 2) + Math.sin(time + (index + 1) * 0.7) * 80;
            
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(nextX, nextY);
            ctx.strokeStyle = `hsla(280, 60%, 50%, 0.4)`;
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [fieldIntensity, particleDensity, waveAmplitude, entanglementStrength, visualMode, resonanceField, quantumState, ontologicalSeeds]);

  const handleQuantumCollapse = () => {
    setIsCollapsed(!isCollapsed);
    particlesRef.current.forEach(particle => {
      if (isCollapsed) {
        // Quantum decoherence
        particle.vx = (Math.random() - 0.5) * 10;
        particle.vy = (Math.random() - 0.5) * 10;
      } else {
        // Wave function collapse
        particle.x = canvasRef.current!.offsetWidth / 2 + (Math.random() - 0.5) * 100;
        particle.y = canvasRef.current!.offsetHeight / 2 + (Math.random() - 0.5) * 100;
      }
    });
    toast.success(isCollapsed ? "Quantum decoherence initiated" : "Wave function collapsed");
  };

  const resetQuantumField = () => {
    if (canvasRef.current) {
      initializeParticles(canvasRef.current);
      initializeWaves(canvasRef.current);
      toast.info("Quantum field reset to ground state");
    }
  };

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-primary/30 h-full">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Advanced Quantum Field Effects
          <span className="text-xs font-mono bg-primary/20 px-2 py-1 rounded">
            QFT v4.0
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={visualMode} onValueChange={setVisualMode as any} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-black/50">
            <TabsTrigger value="quantum" className="text-xs">
              <Atom className="w-3 h-3 mr-1" />
              Quantum
            </TabsTrigger>
            <TabsTrigger value="interference" className="text-xs">
              <Activity className="w-3 h-3 mr-1" />
              Waves
            </TabsTrigger>
            <TabsTrigger value="entanglement" className="text-xs">
              <Orbit className="w-3 h-3 mr-1" />
              Entangled
            </TabsTrigger>
            <TabsTrigger value="consciousness" className="text-xs">
              <Brain className="w-3 h-3 mr-1" />
              Mind
            </TabsTrigger>
          </TabsList>

          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-300 mb-1 block">Field Intensity</label>
                <Slider
                  value={fieldIntensity}
                  onValueChange={setFieldIntensity}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <span className="text-xs text-primary">{fieldIntensity[0]}%</span>
              </div>
              <div>
                <label className="text-xs text-gray-300 mb-1 block">Particle Density</label>
                <Slider
                  value={particleDensity}
                  onValueChange={setParticleDensity}
                  min={50}
                  max={300}
                  step={10}
                  className="w-full"
                />
                <span className="text-xs text-primary">{particleDensity[0]}</span>
              </div>
              <div>
                <label className="text-xs text-gray-300 mb-1 block">Wave Amplitude</label>
                <Slider
                  value={waveAmplitude}
                  onValueChange={setWaveAmplitude}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <span className="text-xs text-primary">{waveAmplitude[0]}%</span>
              </div>
              <div>
                <label className="text-xs text-gray-300 mb-1 block">Entanglement</label>
                <Slider
                  value={entanglementStrength}
                  onValueChange={setEntanglementStrength}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <span className="text-xs text-primary">{entanglementStrength[0]}%</span>
              </div>
            </div>

            <canvas
              ref={canvasRef}
              className="w-full h-80 border border-primary/20 rounded cursor-none"
              style={{ background: 'radial-gradient(circle at center, #0a0a1a, #000)' }}
            />

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleQuantumCollapse}
                className="flex-1"
              >
                <Zap className="w-3 h-3 mr-1" />
                {isCollapsed ? 'Decohere' : 'Collapse'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetQuantumField}
                className="flex-1"
              >
                <Atom className="w-3 h-3 mr-1" />
                Reset Field
              </Button>
            </div>

            <div className="text-xs text-gray-400 grid grid-cols-3 gap-2">
              <div>Particles: {particleDensity[0]}</div>
              <div>Coherence: {(resonanceField + fieldIntensity[0]) / 2}%</div>
              <div>State: {quantumState}</div>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdvancedQuantumField;