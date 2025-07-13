import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Torus } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Atom, Zap, Orbit } from 'lucide-react';
import * as THREE from 'three';

interface Quantum3DVisualizationProps {
  resonanceField: number;
  quantumState: string;
}

const QuantumParticles = ({ count, resonance }: { count: number; resonance: number }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        speed: Math.random() * 0.02 + 0.01
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    particles.forEach((particle, i) => {
      const time = state.clock.elapsedTime;
      const resonanceMultiplier = resonance / 100;
      
      dummy.position.set(
        particle.position[0] + Math.sin(time * particle.speed + i) * resonanceMultiplier,
        particle.position[1] + Math.cos(time * particle.speed + i) * resonanceMultiplier,
        particle.position[2] + Math.sin(time * particle.speed * 0.5 + i) * resonanceMultiplier
      );
      
      dummy.rotation.set(
        particle.rotation[0] + time * particle.speed,
        particle.rotation[1] + time * particle.speed * 0.5,
        particle.rotation[2] + time * particle.speed * 0.3
      );
      
      dummy.scale.setScalar(0.1 + resonanceMultiplier * 0.05);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshStandardMaterial 
        color={new THREE.Color().setHSL((330 + resonance) / 360, 0.81, 0.6)}
        emissive={new THREE.Color().setHSL((330 + resonance) / 360, 0.81, 0.2)}
        transparent
        opacity={0.8}
      />
    </instancedMesh>
  );
};

const QuantumField = ({ resonance }: { resonance: number }) => {
  const fieldRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!fieldRef.current) return;
    
    const time = state.clock.elapsedTime;
    fieldRef.current.rotation.y = time * 0.1;
    fieldRef.current.rotation.x = Math.sin(time * 0.05) * 0.2;
  });

  return (
    <group ref={fieldRef}>
      <Torus args={[3, 0.1, 16, 100]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color={new THREE.Color().setHSL(280 / 360, 1.0, Math.min(1, (50 + resonance * 0.3) / 100))}
          emissive={new THREE.Color().setHSL(280 / 360, 1.0, Math.min(1, (20 + resonance * 0.1) / 100))}
          transparent
          opacity={0.6}
        />
      </Torus>
      
      <Torus args={[2, 0.08, 16, 100]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial 
          color={new THREE.Color().setHSL(200 / 360, 1.0, Math.min(1, (50 + resonance * 0.3) / 100))}
          emissive={new THREE.Color().setHSL(200 / 360, 1.0, Math.min(1, (20 + resonance * 0.1) / 100))}
          transparent
          opacity={0.6}
        />
      </Torus>
      
      <Torus args={[4, 0.12, 16, 100]} position={[0, 0, 0]} rotation={[0, Math.PI / 4, Math.PI / 4]}>
        <meshStandardMaterial 
          color={new THREE.Color().setHSL(330 / 360, 0.81, Math.min(1, (50 + resonance * 0.3) / 100))}
          emissive={new THREE.Color().setHSL(330 / 360, 0.81, Math.min(1, (20 + resonance * 0.1) / 100))}
          transparent
          opacity={0.4}
        />
      </Torus>
    </group>
  );
};

const QuantumCore = ({ state }: { state: string }) => {
  const coreRef = useRef<THREE.Mesh>(null);
  const intensity = state === 'Entangled' ? 1.5 : state === 'Superposition' ? 1.2 : 0.8;

  useFrame((frameState) => {
    if (!coreRef.current) return;
    
    const time = frameState.clock.elapsedTime;
    coreRef.current.rotation.x = time * 0.5;
    coreRef.current.rotation.y = time * 0.3;
    coreRef.current.scale.setScalar(intensity + Math.sin(time * 2) * 0.1);
  });

  return (
    <Sphere ref={coreRef} args={[0.5, 32, 32]}>
      <meshStandardMaterial 
        color={new THREE.Color().setHSL(330 / 360, 0.81, 0.6)}
        emissive={new THREE.Color().setHSL(330 / 360, 0.81, 0.3)}
        emissiveIntensity={intensity}
        transparent
        opacity={0.9}
      />
    </Sphere>
  );
};

const Quantum3DVisualization: React.FC<Quantum3DVisualizationProps> = ({
  resonanceField,
  quantumState
}) => {
  const [activeTab, setActiveTab] = React.useState('field');

  const renderContent = () => {
    switch (activeTab) {
      case 'particles':
        return <QuantumParticles count={50} resonance={resonanceField} />;
      case 'core':
        return <QuantumCore state={quantumState} />;
      default:
        return <QuantumField resonance={resonanceField} />;
    }
  };

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-primary/30 h-full">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <Atom className="w-5 h-5" />
          3D Quantum Field Visualization
          <span className="text-xs font-mono bg-primary/20 px-2 py-1 rounded">
            R3F v8.18
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black/50">
            <TabsTrigger value="field" className="text-xs">
              <Zap className="w-3 h-3 mr-1" />
              Field
            </TabsTrigger>
            <TabsTrigger value="particles" className="text-xs">
              <Atom className="w-3 h-3 mr-1" />
              Particles
            </TabsTrigger>
            <TabsTrigger value="core" className="text-xs">
              <Orbit className="w-3 h-3 mr-1" />
              Core
            </TabsTrigger>
          </TabsList>

          <div className="h-64 bg-black/20">
            <Canvas
              camera={{ position: [8, 8, 8], fov: 60 }}
              style={{ background: 'transparent' }}
            >
              <ambientLight intensity={0.3} />
              <pointLight position={[10, 10, 10]} intensity={1} color={new THREE.Color().setHSL(330 / 360, 0.81, 0.6)} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color={new THREE.Color().setHSL(280 / 360, 1.0, 0.5)} />
              
              {renderContent()}
              
              <OrbitControls 
                enablePan={false} 
                enableZoom={true} 
                maxDistance={20} 
                minDistance={5}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Canvas>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Quantum3DVisualization;