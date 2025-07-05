
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Sparkles, Triangle, Circle, Square } from 'lucide-react';

interface MetaSemanticEngineProps {
  seeds: any[];
  onTopologyChange: (topology: any) => void;
}

const MetaSemanticEngine: React.FC<MetaSemanticEngineProps> = ({ seeds, onTopologyChange }) => {
  const [deformationState, setDeformationState] = useState({
    emotional: 0,
    symbolic: 0,
    conceptual: 0
  });
  const [activeDeformation, setActiveDeformation] = useState<'emotional' | 'symbolic' | 'conceptual'>('emotional');

  useEffect(() => {
    // Process seeds and calculate topological deformations
    const processSeeds = () => {
      if (seeds.length === 0) return;

      const latest = seeds[seeds.length - 1];
      const content = latest.content.toLowerCase();
      
      // Analyze content for different semantic dimensions
      const emotionalWords = ['love', 'fear', 'joy', 'anger', 'peace', 'chaos', 'hope', 'despair'];
      const symbolicWords = ['infinity', 'circle', 'triangle', 'spiral', 'void', 'light', 'shadow'];
      const conceptualWords = ['time', 'space', 'reality', 'consciousness', 'quantum', 'dimension'];

      const emotional = emotionalWords.some(word => content.includes(word)) ? Math.random() * 100 : deformationState.emotional;
      const symbolic = symbolicWords.some(word => content.includes(word)) ? Math.random() * 100 : deformationState.symbolic;
      const conceptual = conceptualWords.some(word => content.includes(word)) ? Math.random() * 100 : deformationState.conceptual;

      setDeformationState({ emotional, symbolic, conceptual });
      
      // Notify parent of topology change
      onTopologyChange({
        deformation: { emotional, symbolic, conceptual },
        complexity: content.length / 10,
        timestamp: Date.now()
      });
    };

    processSeeds();
  }, [seeds, onTopologyChange, deformationState.emotional, deformationState.symbolic, deformationState.conceptual]);

  const getDeformationColor = (type: string) => {
    switch (type) {
      case 'emotional': return 'from-pink-500 to-red-500';
      case 'symbolic': return 'from-purple-500 to-indigo-500';
      case 'conceptual': return 'from-cyan-500 to-blue-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getShapeIcon = (type: string) => {
    switch (type) {
      case 'emotional': return Circle;
      case 'symbolic': return Triangle;
      case 'conceptual': return Square;
      default: return Circle;
    }
  };

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-pink-500/30 h-full">
      <CardHeader>
        <CardTitle className="text-pink-400 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Meta-Semantic Engine
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Deformation Controls */}
        <div className="space-y-4">
          {Object.entries(deformationState).map(([type, value]) => {
            const Icon = getShapeIcon(type);
            return (
              <div key={type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="text-sm capitalize text-gray-300">{type} Deformation</span>
                  </div>
                  <span className="text-xs text-gray-400">{value.toFixed(1)}%</span>
                </div>
                <div className="relative">
                  <Progress value={value} className="h-2" />
                  <div 
                    className={`absolute inset-0 bg-gradient-to-r ${getDeformationColor(type)} rounded-full opacity-60`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Topology Visualization */}
        <div className="bg-black/30 rounded-lg p-4 border border-gray-600">
          <h4 className="text-sm text-gray-300 mb-3">Current Topology State</h4>
          <div className="grid grid-cols-3 gap-2 h-20">
            {Object.entries(deformationState).map(([type, value], index) => (
              <div
                key={type}
                className={`bg-gradient-to-t ${getDeformationColor(type)} rounded opacity-70 transition-all duration-500`}
                style={{
                  height: `${Math.max(value / 2, 10)}%`,
                  transform: `rotate(${Math.sin(Date.now() * 0.001 + index) * 5}deg)`
                }}
              />
            ))}
          </div>
        </div>

        {/* Semantic Analysis */}
        <div className="text-xs text-gray-400 space-y-1">
          <div>Seeds Processed: {seeds.length}</div>
          <div>Active Deformations: {Object.values(deformationState).filter(v => v > 50).length}</div>
          <div>Topology Complexity: {(Object.values(deformationState).reduce((a, b) => a + b, 0) / 300 * 100).toFixed(1)}%</div>
        </div>

        {/* Real-time Feedback */}
        <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg p-3 text-xs">
          <div className="text-pink-300 mb-1">Reality Deformation Active</div>
          <div className="text-gray-400">
            Semantic fields are reshaping topological manifold in real-time based on consciousness input patterns.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetaSemanticEngine;
