
import React from 'react';
import QuantumBackground from '@/components/QuantumBackground';
import HeaderSection from '@/components/HeaderSection';
import SystemStatusBar from '@/components/SystemStatusBar';
import MainInterfaceGrid from '@/components/MainInterfaceGrid';
import { useSystemState } from '@/hooks/useSystemState';
import { useQuantumField } from '@/hooks/useQuantumField';
import { useSystemStatusUpdater } from '@/hooks/useSystemStatusUpdater';

const Index = () => {
  const {
    activeInput,
    quantumState,
    ontologicalSeeds,
    fieldDeformations,
    detectedThreats,
    systemStatus,
    setActiveInput,
    setQuantumState,
    setSystemStatus,
    processOntologicalInput,
    handleFieldDeformation,
    handleThreatDetection,
    handleCausalDisruption,
    handleCommandExecution,
    handleThreatMitigation
  } = useSystemState();

  const { resonanceField, temporalGeometry, setResonanceField } = useQuantumField((newResonance) => {
    // Handle resonance changes if needed
    if (newResonance > 90) {
      setResonanceField(prev => Math.min(100, prev + 10));
    }
  });

  useSystemStatusUpdater(setSystemStatus);

  return (
    <div className="min-h-screen bg-gradient-modern relative overflow-hidden">
      <QuantumBackground />
      
      <div className="relative z-10 p-3 sm:p-4 md:p-6 max-w-7xl mx-auto">
        <HeaderSection />
        
        <div className="mb-4 md:mb-6">
          <SystemStatusBar
            resonanceField={resonanceField}
            systemStatus={systemStatus}
            quantumState={quantumState}
            detectedThreats={detectedThreats}
          />
        </div>

        <MainInterfaceGrid
          activeInput={activeInput}
          setActiveInput={setActiveInput}
          processOntologicalInput={processOntologicalInput}
          ontologicalSeeds={ontologicalSeeds}
          temporalGeometry={temporalGeometry}
          resonanceField={resonanceField}
          quantumState={quantumState}
          fieldDeformations={fieldDeformations}
          detectedThreats={detectedThreats}
          handleFieldDeformation={handleFieldDeformation}
          handleThreatDetection={handleThreatDetection}
          handleCausalDisruption={handleCausalDisruption}
          handleCommandExecution={handleCommandExecution}
          handleThreatMitigation={handleThreatMitigation}
          setQuantumState={setQuantumState}
        />
      </div>
    </div>
  );
};

export default Index;
