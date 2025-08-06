import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Atom, Zap, Orbit } from 'lucide-react';
import * as THREE from 'three';

interface Quantum3DVisualizationProps {
  resonanceField: number;
  quantumState: string;
}

const QuantumParticles = ({ resonance }: { resonance: number }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = new THREE.Object3D();

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    const count = 50; // Increased particle count
    
    for (let i = 0; i < count; i++) {
      dummy.position.set(
        Math.sin(time * 0.5 + i * 0.2) * 4,
        Math.cos(time * 0.3 + i * 0.15) * 3,
        Math.sin(time * 0.4 + i * 0.1) * 4
      );
      dummy.rotation.set(time + i, time * 0.5 + i, time * 0.3 + i);
      dummy.scale.setScalar(0.15 + resonance * 0.015); // Larger base size
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, 50]}>
      <sphereGeometry args={[0.2]} />
      <meshStandardMaterial 
        color="#ff0088" 
        emissive="#ff0088" 
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
      />
    </instancedMesh>
  );
};

const QuantumField = ({ resonance }: { resonance: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <torusGeometry args={[3, 0.1, 16, 100]} />
        <meshStandardMaterial color="#8800ff" emissive="#330066" transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.08, 16, 100]} />
        <meshStandardMaterial color="#0088ff" emissive="#003366" transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

const QuantumCore = ({ state }: { state: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const intensity = state === 'Entangled' ? 1.5 : state === 'Superposition' ? 1.2 : 0.8;

  useFrame((frameState) => {
    if (!meshRef.current) return;
    const time = frameState.clock.elapsedTime;
    meshRef.current.rotation.x = time * 0.5;
    meshRef.current.rotation.y = time * 0.3;
    meshRef.current.scale.setScalar(intensity + Math.sin(time * 2) * 0.1);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial 
        color="#ff0088" 
        emissive="#660033" 
        emissiveIntensity={intensity}
        transparent 
        opacity={0.9} 
      />
    </mesh>
  );
};

const Quantum3DVisualization: React.FC<Quantum3DVisualizationProps> = ({
  resonanceField,
  quantumState
}) => {
  const [activeTab, setActiveTab] = useState('field');

  const renderContent = () => {
    switch (activeTab) {
      case 'particles':
        return <QuantumParticles resonance={resonanceField} />;
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
            <Canvas camera={{ position: [8, 8, 8], fov: 60 }}>
              <ambientLight intensity={0.3} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#ff0088" />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8800ff" />
              
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