
import React from 'react';
import ConsciousnessInterface from '@/components/ConsciousnessInterface';
import TensorLattice from '@/components/TensorLattice';
import MetaSemanticEngine from '@/components/MetaSemanticEngine';
import RealityDivergenceMap from '@/components/RealityDivergenceMap';
import SyntheticCore from '@/components/SyntheticCore';
import PhaseGenerator from '@/components/PhaseGenerator';
import ExportSystem from '@/components/ExportSystem';
import NeuroSymbolicParser from '@/components/NeuroSymbolicParser';
import ChronoTopologicalCore from '@/components/ChronoTopologicalCore';
import ThreatModelingInterface from '@/components/ThreatModelingInterface';
import SecureCommandLayer from '@/components/SecureCommandLayer';
import QuantumFieldVisualizer from '@/components/QuantumFieldVisualizer';
import ConsciousnessMapper from '@/components/ConsciousnessMapper';
import TemporalManipulator from '@/components/TemporalManipulator';
import WormholePhysicsSimulator from '@/components/WormholePhysicsSimulator';
import Quantum3DVisualization from '@/components/Quantum3DVisualization';

interface MainInterfaceGridProps {
  // Input and processing props
  activeInput: string;
  setActiveInput: (input: string) => void;
  processOntologicalInput: (input: string) => void;
  
  // Data props
  ontologicalSeeds: any[];
  temporalGeometry: { x: number; y: number; z: number; t: number };
  resonanceField: number;
  quantumState: string;
  fieldDeformations: any[];
  detectedThreats: any[];
  
  // Handler props
  handleFieldDeformation: (deformation: any) => void;
  handleThreatDetection: (threat: any) => void;
  handleCausalDisruption: (disruption: any) => void;
  handleCommandExecution: (command: any) => void;
  handleThreatMitigation: (mitigation: any) => void;
  setQuantumState: (state: string) => void;
}

const MainInterfaceGrid: React.FC<MainInterfaceGridProps> = ({
  activeInput,
  setActiveInput,
  processOntologicalInput,
  ontologicalSeeds,
  temporalGeometry,
  resonanceField,
  quantumState,
  fieldDeformations,
  detectedThreats,
  handleFieldDeformation,
  handleThreatDetection,
  handleCausalDisruption,
  handleCommandExecution,
  handleThreatMitigation,
  setQuantumState
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
      {/* Row 1: New Wormhole Physics Simulator - Featured */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-3">
        <WormholePhysicsSimulator
          resonanceField={resonanceField}
          onStabilityChange={(stability) => console.log('Wormhole stability:', stability)}
        />
      </div>

      <div className="col-span-1">
        <TemporalManipulator
          temporalGeometry={temporalGeometry}
          onTemporalShift={(shift) => console.log('Temporal shift:', shift)}
        />
      </div>

      {/* Row 2: Enhanced Visualization Components */}
      <div className="col-span-1">
        <QuantumFieldVisualizer
          resonanceField={resonanceField}
          ontologicalSeeds={ontologicalSeeds}
        />
      </div>

      <div className="col-span-1">
        <Quantum3DVisualization
          resonanceField={resonanceField}
          quantumState={quantumState}
        />
      </div>

      <div className="col-span-1">
        <ConsciousnessMapper
          ontologicalSeeds={ontologicalSeeds}
          resonanceField={resonanceField}
        />
      </div>

      <div className="col-span-1">
        <PhaseGenerator
          quantumState={quantumState}
          onPhaseShift={(newState) => setQuantumState(newState)}
        />
      </div>

      {/* Row 3: Core Processing */}
      <div className="col-span-1">
        <NeuroSymbolicParser
          onFieldDeformation={handleFieldDeformation}
          onThreatDetection={handleThreatDetection}
        />
      </div>

      <div className="col-span-1">
        <ChronoTopologicalCore
          fieldDeformations={fieldDeformations}
          temporalGeometry={temporalGeometry}
          onCausalDisruption={handleCausalDisruption}
        />
      </div>

      <div className="col-span-1">
        <ThreatModelingInterface
          threats={detectedThreats}
          fieldDeformations={fieldDeformations}
          onThreatMitigation={handleThreatMitigation}
        />
      </div>

      <div className="col-span-1">
        <SecureCommandLayer
          onCommandExecution={handleCommandExecution}
          systemResonance={resonanceField}
        />
      </div>

      {/* Row 4: Advanced Analysis */}
      <div className="col-span-1 sm:col-span-2">
        <TensorLattice
          seeds={ontologicalSeeds}
          temporalGeometry={temporalGeometry}
          resonanceField={resonanceField}
        />
      </div>

      <div className="col-span-1 sm:col-span-2">
        <RealityDivergenceMap
          seeds={ontologicalSeeds}
          temporalGeometry={temporalGeometry}
        />
      </div>

      {/* Row 5: Legacy Interface Components */}
      <div className="col-span-1">
        <ConsciousnessInterface
          onInputProcess={processOntologicalInput}
          activeInput={activeInput}
          setActiveInput={setActiveInput}
        />
      </div>

      <div className="col-span-1">
        <MetaSemanticEngine
          seeds={ontologicalSeeds}
          onTopologyChange={(topology) => console.log('Topology changed:', topology)}
        />
      </div>

      <div className="col-span-1">
        <SyntheticCore
          resonanceField={resonanceField}
          ontologicalSeeds={ontologicalSeeds}
          onFeedback={(feedback) => console.log('AI Feedback:', feedback)}
        />
      </div>

      {/* Row 6: Export System - Full Width on Mobile */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4">
        <ExportSystem
          seeds={ontologicalSeeds}
          temporalGeometry={temporalGeometry}
          resonanceField={resonanceField}
        />
      </div>
    </div>
  );
};

export default MainInterfaceGrid;
