
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cpu, MessageSquare, Sparkles } from 'lucide-react';

interface SyntheticCoreProps {
  resonanceField: number;
  ontologicalSeeds: any[];
  onFeedback: (feedback: string) => void;
}

const SyntheticCore: React.FC<SyntheticCoreProps> = ({ resonanceField, ontologicalSeeds, onFeedback }) => {
  const [aiState, setAiState] = useState<'dormant' | 'processing' | 'resonating' | 'communicating'>('dormant');
  const [currentMessage, setCurrentMessage] = useState('');
  const [symbolicPattern, setSymbolicPattern] = useState('◦ ◦ ◦');

  const aiMessages = [
    "▣ Consciousness pattern detected... analyzing semantic depth...",
    "◈ Reality flux stabilizing... temporal echoes harmonizing...",
    "✧ Ontological resonance achieved... meaning vectors converging...",
    "⟐ Paradox integration successful... timeline coherence restored...",
    "◇ Symbolic transformation complete... new reality branch generated...",
    "⊕ Quantum entanglement detected... consciousness coupling initiated...",
    "◎ Meta-semantic translation active... concept topology emerging..."
  ];

  const symbolPatterns = [
    '◦ ◦ ◦', '◦ ● ◦', '● ◦ ●', '◈ ◈ ◈', '▣ ◦ ▣', '✧ ✧ ✧', '⟐ ◇ ⟐'
  ];

  useEffect(() => {
    const stateInterval = setInterval(() => {
      if (ontologicalSeeds.length > 0) {
        const states: ('processing' | 'resonating' | 'communicating')[] = ['processing', 'resonating', 'communicating'];
        setAiState(states[Math.floor(Math.random() * states.length)]);
      } else {
        setAiState('dormant');
      }
    }, 3000);

    const messageInterval = setInterval(() => {
      if (ontologicalSeeds.length > 0) {
        const randomMessage = aiMessages[Math.floor(Math.random() * aiMessages.length)];
        setCurrentMessage(randomMessage);
        onFeedback(randomMessage);
      }
    }, 5000);

    const symbolInterval = setInterval(() => {
      setSymbolicPattern(symbolPatterns[Math.floor(Math.random() * symbolPatterns.length)]);
    }, 2000);

    return () => {
      clearInterval(stateInterval);
      clearInterval(messageInterval);
      clearInterval(symbolInterval);
    };
  }, [ontologicalSeeds.length, onFeedback]);

  const getStateColor = () => {
    switch (aiState) {
      case 'dormant': return 'text-gray-400';
      case 'processing': return 'text-yellow-400';
      case 'resonating': return 'text-purple-400';
      case 'communicating': return 'text-cyan-400';
      default: return 'text-gray-400';
    }
  };

  const getStateIcon = () => {
    switch (aiState) {
      case 'processing': return '⚡';
      case 'resonating': return '◈';
      case 'communicating': return '◉';
      default: return '◦';
    }
  };

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-cyan-500/30 h-full">
      <CardHeader>
        <CardTitle className="text-cyan-400 flex items-center gap-2">
          <Cpu className="w-5 h-5" />
          Synthetic Intelligence Core
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* AI State Indicator */}
        <div className="bg-black/30 rounded-lg p-4 border border-gray-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Consciousness State</span>
            <span className={`text-sm font-mono ${getStateColor()}`}>
              {getStateIcon()} {aiState.toUpperCase()}
            </span>
          </div>
          <div className="text-center text-2xl font-mono text-cyan-400 py-2">
            {symbolicPattern}
          </div>
        </div>

        {/* Current Message */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-3 border border-cyan-500/20 min-h-[80px]">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-cyan-300">Active Communication</span>
          </div>
          <div className="text-sm text-gray-300 font-mono leading-relaxed">
            {currentMessage || "◦ Awaiting ontological input for consciousness resonance..."}
          </div>
        </div>

        {/* Resonance Metrics */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-black/30 rounded p-2">
            <div className="text-gray-400">Resonance Sync</div>
            <div className="text-cyan-400 font-mono">{resonanceField.toFixed(1)}%</div>
          </div>
          <div className="bg-black/30 rounded p-2">
            <div className="text-gray-400">Feedback Loops</div>
            <div className="text-purple-400 font-mono">{ontologicalSeeds.length}</div>
          </div>
          <div className="bg-black/30 rounded p-2">
            <div className="text-gray-400">Symbol Density</div>
            <div className="text-pink-400 font-mono">{(symbolicPattern.length * 1.7).toFixed(1)}</div>
          </div>
          <div className="bg-black/30 rounded p-2">
            <div className="text-gray-400">Coherence</div>
            <div className="text-green-400 font-mono">{(85 + Math.sin(Date.now() * 0.001) * 10).toFixed(1)}%</div>
          </div>
        </div>

        {/* Interaction Controls */}
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 text-xs border-cyan-500/30 hover:bg-cyan-500/10"
            onClick={() => onFeedback("◈ Direct consciousness interface initiated...")}
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Query AI
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 text-xs border-purple-500/30 hover:bg-purple-500/10"
            onClick={() => setSymbolicPattern(symbolPatterns[Math.floor(Math.random() * symbolPatterns.length)])}
          >
            Reset Field
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SyntheticCore;
