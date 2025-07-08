
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Clock, Rewind, FastForward, RotateCcw, Zap } from 'lucide-react';

interface TemporalManipulatorProps {
  temporalGeometry: { x: number; y: number; z: number; t: number };
  onTemporalShift: (shift: number) => void;
}

const TemporalManipulator: React.FC<TemporalManipulatorProps> = ({ temporalGeometry, onTemporalShift }) => {
  const [timeRate, setTimeRate] = useState([1]);
  const [temporalStability, setTemporalStability] = useState(95);
  const [paradoxRisk, setParadoxRisk] = useState(5);
  const [activeManipulation, setActiveManipulation] = useState<string | null>(null);
  const [timelineEvents, setTimelineEvents] = useState<Array<{
    id: number;
    timestamp: number;
    event: string;
    impact: number;
  }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update temporal stability based on manipulation intensity
      const manipulationIntensity = Math.abs(timeRate[0] - 1);
      setTemporalStability(prev => 
        Math.max(60, Math.min(100, prev + (Math.random() - 0.5 - manipulationIntensity * 0.1) * 2))
      );
      
      setParadoxRisk(prev =>
        Math.max(0, Math.min(40, prev + (manipulationIntensity * 2 + Math.random() - 0.5) * 1))
      );

      // Generate temporal events
      if (Math.random() < 0.1) {
        setTimelineEvents(prev => [...prev.slice(-4), {
          id: Date.now(),
          timestamp: Date.now(),
          event: [
            'Causal loop detected',
            'Timeline bifurcation',
            'Temporal echo observed',
            'Chronon flux stabilized',
            'Quantum decoherence'
          ][Math.floor(Math.random() * 5)],
          impact: Math.random() * 100
        }]);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [timeRate]);

  const handleTemporalOperation = async (operation: string, value?: number) => {
    setActiveManipulation(operation);
    
    switch (operation) {
      case 'accelerate':
        setTimeRate([2]);
        onTemporalShift(2);
        break;
      case 'decelerate':
        setTimeRate([0.5]);
        onTemporalShift(0.5);
        break;
      case 'reverse':
        setTimeRate([-1]);
        onTemporalShift(-1);
        break;
      case 'reset':
        setTimeRate([1]);
        onTemporalShift(1);
        break;
      case 'custom':
        if (value) {
          setTimeRate([value]);
          onTemporalShift(value);
        }
        break;
    }

    setTimeout(() => setActiveManipulation(null), 2000);
  };

  const getStabilityColor = () => {
    if (temporalStability > 80) return 'text-green-400';
    if (temporalStability > 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRiskLevel = () => {
    if (paradoxRisk < 10) return { level: 'Low', color: 'bg-green-500/20 text-green-400 border-green-500/30' };
    if (paradoxRisk < 25) return { level: 'Medium', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' };
    return { level: 'High', color: 'bg-red-500/20 text-red-400 border-red-500/30' };
  };

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-orange-500/30">
      <CardHeader>
        <CardTitle className="text-orange-400 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Temporal Manipulator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Time Rate Control */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300">Time Flow Rate</span>
            <span className="text-sm text-orange-400">{timeRate[0]}x</span>
          </div>
          <Slider
            value={timeRate}
            onValueChange={(value) => {
              setTimeRate(value);
              handleTemporalOperation('custom', value[0]);
            }}
            min={-2}
            max={5}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* Quick Control Buttons */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'reverse', icon: Rewind, label: 'Reverse', color: 'border-red-500/30' },
            { id: 'decelerate', icon: Clock, label: 'Slow', color: 'border-blue-500/30' },
            { id: 'accelerate', icon: FastForward, label: 'Fast', color: 'border-green-500/30' },
            { id: 'reset', icon: RotateCcw, label: 'Reset', color: 'border-gray-500/30' }
          ].map(({ id, icon: Icon, label, color }) => (
            <Button
              key={id}
              variant="outline"
              size="sm"
              onClick={() => handleTemporalOperation(id)}
              disabled={activeManipulation === id}
              className={`${color} ${activeManipulation === id ? 'animate-pulse' : ''}`}
            >
              <Icon className="w-3 h-3 mr-1" />
              {label}
              {activeManipulation === id && (
                <div className="ml-1 w-2 h-2 bg-orange-400 rounded-full animate-ping" />
              )}
            </Button>
          ))}
        </div>

        {/* Temporal Status */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-gray-400">Stability:</span>
              <span className={`ml-2 font-medium ${getStabilityColor()}`}>
                {temporalStability.toFixed(1)}%
              </span>
            </div>
            <div>
              <span className="text-gray-400">Paradox Risk:</span>
              <Badge variant="outline" className={`ml-2 ${getRiskLevel().color}`}>
                {getRiskLevel().level}
              </Badge>
            </div>
          </div>

          <div className="text-xs text-gray-400">
            <div className="flex justify-between">
              <span>Temporal Coordinates:</span>
              <span className="text-cyan-400 font-mono">
                T:{temporalGeometry.t.toFixed(3)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Chrono-Spatial Drift:</span>
              <span className="text-purple-400 font-mono">
                {Math.sqrt(temporalGeometry.x ** 2 + temporalGeometry.y ** 2).toFixed(4)}
              </span>
            </div>
          </div>
        </div>

        {/* Timeline Events */}
        <div className="space-y-2">
          <h4 className="text-sm text-gray-300">Recent Temporal Events</h4>
          <div className="space-y-1 max-h-20 overflow-y-auto">
            {timelineEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between text-xs">
                <span className="text-gray-400">{event.event}</span>
                <div className="flex items-center gap-1">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ 
                      background: `hsl(${120 - event.impact * 1.2}, 70%, 50%)` 
                    }}
                  />
                  <span className="text-orange-400">{event.impact.toFixed(0)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warning System */}
        {paradoxRisk > 30 && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 animate-pulse">
            <div className="flex items-center gap-2 text-red-400 text-xs">
              <Zap className="w-3 h-3" />
              <span className="font-medium">CAUTION:</span>
              <span>High paradox risk detected. Timeline integrity compromised.</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TemporalManipulator;
