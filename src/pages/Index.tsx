
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import ConsciousnessInterface from '@/components/ConsciousnessInterface';
import TensorLattice from '@/components/TensorLattice';
import MetaSemanticEngine from '@/components/MetaSemanticEngine';
import RealityDivergenceMap from '@/components/RealityDivergenceMap';
import SyntheticCore from '@/components/SyntheticCore';
import PhaseGenerator from '@/components/PhaseGenerator';
import ExportSystem from '@/components/ExportSystem';

const Index = () => {
  const [activeInput, setActiveInput] = useState('');
  const [resonanceField, setResonanceField] = useState(0);
  const [quantumState, setQuantumState] = useState('stable');
  const [ontologicalSeeds, setOntologicalSeeds] = useState<any[]>([]);
  const [temporalGeometry, setTemporalGeometry] = useState({ x: 0, y: 0, z: 0, t: 0 });

  useEffect(() => {
    // Initialize quantum field dynamics
    const interval = setInterval(() => {
      setResonanceField(prev => (prev + Math.random() * 0.1) % 100);
      setTemporalGeometry(prev => ({
        x: prev.x + Math.sin(Date.now() * 0.001) * 0.01,
        y: prev.y + Math.cos(Date.now() * 0.001) * 0.01,
        z: prev.z + Math.sin(Date.now() * 0.002) * 0.01,
        t: Date.now() * 0.001
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const processOntologicalInput = (input: string) => {
    const seed = {
      id: Date.now(),
      content: input,
      resonance: Math.random(),
      topology: {
        deformation: Math.random() * 10,
        complexity: input.length / 10,
        entanglement: Math.random() * 5
      },
      timestamp: Date.now()
    };
    
    setOntologicalSeeds(prev => [...prev, seed]);
    setActiveInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Quantum Field Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 via-purple-500/10 to-transparent animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_#8b5cf6_0%,_transparent_50%)] opacity-30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,_#3b82f6_0%,_transparent_50%)] opacity-30"></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Vers3: The Synthetic Reality Compiler
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Real-time consciousness-linked simulation engine fusing quantum field dynamics, 
            symbolic computation, and temporal geometry modulation
          </p>
        </div>

        {/* Status Bar */}
        <div className="mb-6 bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Resonance Field:</span>
              <Progress value={resonanceField} className="mt-1" />
            </div>
            <div>
              <span className="text-gray-400">Quantum State:</span>
              <span className="ml-2 text-cyan-400 capitalize">{quantumState}</span>
            </div>
            <div>
              <span className="text-gray-400">Ontological Seeds:</span>
              <span className="ml-2 text-purple-400">{ontologicalSeeds.length}</span>
            </div>
            <div>
              <span className="text-gray-400">Temporal Coord:</span>
              <span className="ml-2 text-blue-400 font-mono text-xs">
                [{temporalGeometry.x.toFixed(2)}, {temporalGeometry.y.toFixed(2)}, {temporalGeometry.z.toFixed(2)}, {temporalGeometry.t.toFixed(0)}]
              </span>
            </div>
          </div>
        </div>

        {/* Main Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Consciousness Interface */}
          <div className="col-span-1">
            <ConsciousnessInterface
              onInputProcess={processOntologicalInput}
              activeInput={activeInput}
              setActiveInput={setActiveInput}
            />
          </div>

          {/* Tensor Lattice Visualization */}
          <div className="col-span-1 lg:col-span-2 xl:col-span-1">
            <TensorLattice
              seeds={ontologicalSeeds}
              temporalGeometry={temporalGeometry}
              resonanceField={resonanceField}
            />
          </div>

          {/* Meta-Semantic Engine */}
          <div className="col-span-1">
            <MetaSemanticEngine
              seeds={ontologicalSeeds}
              onTopologyChange={(topology) => console.log('Topology changed:', topology)}
            />
          </div>

          {/* Reality Divergence Map */}
          <div className="col-span-1 lg:col-span-2">
            <RealityDivergenceMap
              seeds={ontologicalSeeds}
              temporalGeometry={temporalGeometry}
            />
          </div>

          {/* Synthetic Intelligence Core */}
          <div className="col-span-1">
            <SyntheticCore
              resonanceField={resonanceField}
              ontologicalSeeds={ontologicalSeeds}
              onFeedback={(feedback) => console.log('AI Feedback:', feedback)}
            />
          </div>

          {/* Phase Interference Generator */}
          <div className="col-span-1 lg:col-span-2">
            <PhaseGenerator
              quantumState={quantumState}
              onPhaseShift={(newState) => setQuantumState(newState)}
            />
          </div>

          {/* Export System */}
          <div className="col-span-1">
            <ExportSystem
              seeds={ontologicalSeeds}
              temporalGeometry={temporalGeometry}
              resonanceField={resonanceField}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
