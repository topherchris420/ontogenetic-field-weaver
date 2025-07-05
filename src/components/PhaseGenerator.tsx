
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Zap, Waves, AlertCircle } from 'lucide-react';

interface PhaseGeneratorProps {
  quantumState: string;
  onPhaseShift: (newState: string) => void;
}

const PhaseGenerator: React.FC<PhaseGeneratorProps> = ({ quantumState, onPhaseShift }) => {
  const [phaseIntensity, setPhaseIntensity] = useState([50]);
  const [interferencePattern, setInterferencePattern] = useState(0);
  const [activeEvent, setActiveEvent] = useState<'none' | 'shockwave' | 'stabilization' | 'resync'>('none');

  const events = [
    { id: 'shockwave', label: 'Ontological Shockwave', icon: Zap, color: 'text-red-400' },
    { id: 'stabilization', label: 'Paradox Stabilization', icon: AlertCircle, color: 'text-yellow-400' },
    { id: 'resync', label: 'Timeline Re-sync', icon: Waves, color: 'text-blue-400' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setInterferencePattern(prev => (prev + Math.random() * 0.1) % 100);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const triggerEvent = (eventType: string) => {
    setActiveEvent(eventType as any);
    
    const states = ['stable', 'fluctuating', 'cascading', 'resonant', 'chaotic'];
    const newState = states[Math.floor(Math.random() * states.length)];
    onPhaseShift(newState);

    setTimeout(() => {
      setActiveEvent('none');
    }, 3000);
  };

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-yellow-500/30 h-full">
      <CardHeader>
        <CardTitle className="text-yellow-400 flex items-center gap-2">
          <Waves className="w-5 h-5" />
          Phase Interference Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Phase Intensity Control */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300">Phase Intensity</span>
            <span className="text-sm text-yellow-400">{phaseIntensity[0]}%</span>
          </div>
          <Slider
            value={phaseIntensity}
            onValueChange={setPhaseIntensity}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Interference Pattern Visualization */}
        <div className="bg-black/30 rounded-lg p-4 border border-gray-600">
          <h4 className="text-sm text-gray-300 mb-3">Interference Pattern</h4>
          <div className="h-16 bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent relative overflow-hidden">
            <div 
              className="absolute inset-0 bg-gradient-to-r from-yellow-400/50 to-orange-400/50"
              style={{
                transform: `translateX(${Math.sin(interferencePattern * 0.1) * 20}px)`,
                width: `${phaseIntensity[0]}%`
              }}
            />
            <div 
              className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30"
              style={{
                transform: `translateX(${Math.cos(interferencePattern * 0.15) * 30}px)`,
                width: `${100 - phaseIntensity[0]}%`
              }}
            />
          </div>
        </div>

        {/* Event Triggers */}
        <div className="space-y-3">
          <h4 className="text-sm text-gray-300">Quantum Events</h4>
          <div className="grid grid-cols-1 gap-2">
            {events.map(({ id, label, icon: Icon, color }) => (
              <Button
                key={id}
                variant="outline"
                size="sm"
                onClick={() => triggerEvent(id)}
                disabled={activeEvent === id}
                className={`justify-start border-gray-600 hover:bg-gray-800 ${
                  activeEvent === id ? 'bg-gray-800 animate-pulse' : ''
                }`}
              >
                <Icon className={`w-4 h-4 mr-2 ${color}`} />
                <span className="text-xs">{label}</span>
                {activeEvent === id && (
                  <div className="ml-auto w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Status Display */}
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg p-3 border border-yellow-500/20">
          <div className="text-xs text-gray-400 space-y-1">
            <div className="flex justify-between">
              <span>Quantum State:</span>
              <span className="text-yellow-400 capitalize">{quantumState}</span>
            </div>
            <div className="flex justify-between">
              <span>Active Event:</span>
              <span className="text-orange-400 capitalize">
                {activeEvent === 'none' ? 'Stable Field' : activeEvent.replace(/([A-Z])/g, ' $1')}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Field Coherence:</span>
              <span className="text-green-400">{(90 + Math.sin(interferencePattern * 0.05) * 8).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhaseGenerator;
