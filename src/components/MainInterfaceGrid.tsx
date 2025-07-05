
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
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Row 1: Core Input and Processing */}
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

      {/* Row 2: Enhanced Visualizations */}
      <div className="col-span-1 lg:col-span-2">
        <TensorLattice
          seeds={ontologicalSeeds}
          temporalGeometry={temporalGeometry}
          resonanceField={resonanceField}
        />
      </div>

      <div className="col-span-1 lg:col-span-2">
        <RealityDivergenceMap
          seeds={ontologicalSeeds}
          temporalGeometry={temporalGeometry}
        />
      </div>

      {/* Row 3: Legacy Systems Integration */}
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

      <div className="col-span-1">
        <PhaseGenerator
          quantumState={quantumState}
          onPhaseShift={(newState) => setQuantumState(newState)}
        />
      </div>

      {/* Row 4: Export and Monitoring */}
      <div className="col-span-1 lg:col-span-4">
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
