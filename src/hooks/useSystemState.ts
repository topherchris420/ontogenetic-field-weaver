
import { useState } from 'react';

export const useSystemState = () => {
  const [activeInput, setActiveInput] = useState('');
  const [quantumState, setQuantumState] = useState('stable');
  const [ontologicalSeeds, setOntologicalSeeds] = useState<any[]>([]);
  const [fieldDeformations, setFieldDeformations] = useState<any[]>([]);
  const [detectedThreats, setDetectedThreats] = useState<any[]>([]);
  const [causalDisruptions, setCausalDisruptions] = useState<any[]>([]);
  const [commandLog, setCommandLog] = useState<any[]>([]);
  const [systemStatus, setSystemStatus] = useState({
    drrEnabled: true,
    chronoSync: 87,
    threatLevel: 23,
    fieldStability: 94
  });

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

  const handleFieldDeformation = (deformation: any) => {
    setFieldDeformations(prev => [...prev.slice(-19), deformation]);
    
    if (deformation.threatLevel > 60) {
      setDetectedThreats(prev => [...prev.slice(-9), {
        id: Date.now(),
        type: 'field_anomaly',
        severity: deformation.threatLevel,
        timestamp: Date.now()
      }]);
    }
  };

  const handleThreatDetection = (threat: any) => {
    setDetectedThreats(prev => [...prev.slice(-9), threat]);
  };

  const handleCausalDisruption = (disruption: any) => {
    setCausalDisruptions(prev => [...prev.slice(-9), disruption]);
  };

  const handleCommandExecution = (command: any) => {
    setCommandLog(prev => [...prev.slice(-19), command]);
    
    // Process command effects
    if (command.type === 'symbolic_resonance') {
      // This would be handled by the quantum field hook
    } else if (command.type === 'emergency_lockdown') {
      setQuantumState('locked');
      setTimeout(() => setQuantumState('stable'), 5000);
    }
  };

  const handleThreatMitigation = (mitigation: any) => {
    setSystemStatus(prev => ({
      ...prev,
      threatLevel: Math.max(0, prev.threatLevel - 15)
    }));
  };

  return {
    // State
    activeInput,
    quantumState,
    ontologicalSeeds,
    fieldDeformations,
    detectedThreats,
    causalDisruptions,
    commandLog,
    systemStatus,
    
    // Setters
    setActiveInput,
    setQuantumState,
    setSystemStatus,
    
    // Handlers
    processOntologicalInput,
    handleFieldDeformation,
    handleThreatDetection,
    handleCausalDisruption,
    handleCommandExecution,
    handleThreatMitigation
  };
};
