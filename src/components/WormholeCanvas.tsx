
import React, { useEffect, useRef } from 'react';

interface WormholeCanvasProps {
  resonanceField: number;
  stabilityIndex: number;
  fieldIntensity: number;
  throatRadius: number;
  quantumFlux: number;
  isActive: boolean;
}

const WormholeCanvas: React.FC<WormholeCanvasProps> = ({
  resonanceField,
  stabilityIndex,
  fieldIntensity,
  throatRadius,
  quantumFlux,
  isActive
}) => {
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

      // Wormhole throat visualization
      const maxRadius = Math.min(canvas.width, canvas.height) * 0.3;
      const currentRadius = maxRadius * (throatRadius / 100);
      
      // Draw wormhole rings with quantum fluctuations
      for (let i = 1; i <= 8; i++) {
        const radius = currentRadius * (i / 8);
        const opacity = (1 - i / 8) * (stabilityIndex / 100) * 0.8;
        const fluctuation = Math.sin(time * 2 + i * 0.5) * (quantumFlux / 100) * 5;
        
        // Ring gradient
        const gradient = ctx.createRadialGradient(
          centerX, centerY, radius - 5,
          centerX, centerY, radius + 5 + fluctuation
        );
        gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity})`);
        gradient.addColorStop(0.5, `rgba(147, 51, 234, ${opacity * 0.8})`);
        gradient.addColorStop(1, `rgba(236, 72, 153, ${opacity * 0.6})`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2 + (fieldIntensity / 100) * 3;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + fluctuation, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Central singularity
      const singularityGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, 15
      );
      singularityGradient.addColorStop(0, isActive ? '#ffffff' : '#6b7280');
      singularityGradient.addColorStop(0.7, isActive ? '#8b5cf6' : '#374151');
      singularityGradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = singularityGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 15 + Math.sin(time * 3) * 3, 0, Math.PI * 2);
      ctx.fill();

      // Spacetime distortion field
      if (isActive) {
        for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 12) {
          const distortionRadius = currentRadius * 1.5;
          const x = centerX + Math.cos(angle + time * 0.5) * distortionRadius;
          const y = centerY + Math.sin(angle + time * 0.5) * distortionRadius;
          
          const distortionGradient = ctx.createRadialGradient(x, y, 0, x, y, 20);
          distortionGradient.addColorStop(0, `rgba(34, 197, 94, ${resonanceField / 500})`);
          distortionGradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = distortionGradient;
          ctx.beginPath();
          ctx.arc(x, y, 10 + Math.sin(time * 2 + angle) * 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Quantum particles
      for (let i = 0; i < 20; i++) {
        const particleAngle = (i / 20) * Math.PI * 2 + time * 0.3;
        const particleRadius = currentRadius * 0.7 + Math.sin(time * 2 + i) * 20;
        const x = centerX + Math.cos(particleAngle) * particleRadius;
        const y = centerY + Math.sin(particleAngle) * particleRadius;
        
        ctx.fillStyle = `rgba(${100 + i * 8}, ${200 - i * 5}, 255, ${0.3 + Math.sin(time + i) * 0.2})`;
        ctx.beginPath();
        ctx.arc(x, y, 2 + Math.sin(time * 3 + i) * 1, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, [resonanceField, stabilityIndex, fieldIntensity, throatRadius, quantumFlux, isActive]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-[400px] border-t border-cyan-500/20 bg-black/20"
    />
  );
};

export default WormholeCanvas;
