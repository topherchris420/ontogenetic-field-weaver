
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Brain, Activity, Zap, Target } from 'lucide-react';

interface ConsciousnessMapperProps {
  ontologicalSeeds: any[];
  resonanceField: number;
}

const ConsciousnessMapper: React.FC<ConsciousnessMapperProps> = ({ ontologicalSeeds, resonanceField }) => {
  const [cognitiveState, setCognitiveState] = useState({
    awareness: 0,
    creativity: 0,
    logic: 0,
    intuition: 0,
    memory: 0
  });
  const [activeBrainWave, setActiveBrainWave] = useState<'alpha' | 'beta' | 'gamma' | 'theta'>('alpha');
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCognitiveState(prev => ({
        awareness: Math.max(0, Math.min(100, prev.awareness + (Math.random() - 0.5) * 5 + ontologicalSeeds.length * 2)),
        creativity: Math.max(0, Math.min(100, prev.creativity + (Math.random() - 0.5) * 4 + resonanceField * 0.1)),
        logic: Math.max(0, Math.min(100, prev.logic + (Math.random() - 0.5) * 3)),
        intuition: Math.max(0, Math.min(100, prev.intuition + (Math.random() - 0.5) * 6)),
        memory: Math.max(0, Math.min(100, prev.memory + (Math.random() - 0.5) * 2))
      }));
    }, 100);

    return () => clearInterval(interval);
  }, [ontologicalSeeds.length, resonanceField]);

  const brainWaves = [
    { type: 'alpha', frequency: '8-12 Hz', state: 'Relaxed Focus', color: 'text-green-400' },
    { type: 'beta', frequency: '13-30 Hz', state: 'Active Thinking', color: 'text-blue-400' },
    { type: 'gamma', frequency: '30-100 Hz', state: 'High Awareness', color: 'text-purple-400' },
    { type: 'theta', frequency: '4-8 Hz', state: 'Deep Meditation', color: 'text-orange-400' }
  ];

  const startScan = async () => {
    setIsScanning(true);
    // Simulate consciousness scanning process
    for (let i = 0; i < brainWaves.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setActiveBrainWave(brainWaves[i].type as any);
    }
    setIsScanning(false);
  };

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-purple-400 flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Consciousness Mapper
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Cognitive State Visualization */}
        <div className="space-y-3">
          <h4 className="text-sm text-gray-300">Cognitive State Analysis</h4>
          {Object.entries(cognitiveState).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400 capitalize">{key}</span>
                <span className="text-xs text-purple-400">{value.toFixed(0)}%</span>
              </div>
              <Progress value={value} className="h-2" />
            </div>
          ))}
        </div>

        {/* Brain Wave Analysis */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm text-gray-300">Brain Wave Analysis</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={startScan}
              disabled={isScanning}
              className="border-purple-500/30"
            >
              {isScanning ? (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                  Scanning...
                </div>
              ) : (
                <>
                  <Activity className="w-3 h-3 mr-1" />
                  Scan
                </>
              )}
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {brainWaves.map(({ type, frequency, state, color }) => (
              <div 
                key={type}
                className={`p-3 rounded-lg border ${
                  activeBrainWave === type 
                    ? 'border-purple-400 bg-purple-500/10' 
                    : 'border-gray-600 bg-gray-800/20'
                }`}
              >
                <div className={`text-xs font-medium ${color}`}>{type.toUpperCase()}</div>
                <div className="text-xs text-gray-400">{frequency}</div>
                <div className="text-xs text-gray-300">{state}</div>
                {activeBrainWave === type && (
                  <div className="mt-1 flex items-center gap-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-purple-400">Active</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Consciousness Metrics */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-3 border border-purple-500/20">
          <div className="text-xs text-gray-400 space-y-1">
            <div className="flex justify-between">
              <span>Consciousness Level:</span>
              <span className="text-purple-400">{((cognitiveState.awareness + cognitiveState.intuition) / 2).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Neural Plasticity:</span>
              <span className="text-pink-400">{cognitiveState.creativity.toFixed(0)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Cognitive Load:</span>
              <span className="text-cyan-400">{((cognitiveState.logic + cognitiveState.memory) / 2).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Synchronization:</span>
              <span className="text-orange-400">{resonanceField.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Real-time Activity Indicator */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="w-1 bg-purple-400 rounded-full animate-pulse"
                style={{ 
                  height: `${8 + Math.sin(Date.now() * 0.01 + i) * 4}px`,
                  animationDelay: `${i * 100}ms`
                }}
              />
            ))}
          </div>
          <span>Neural activity detected</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsciousnessMapper;
