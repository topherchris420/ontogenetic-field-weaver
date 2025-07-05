
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Lock, Unlock, Zap, Eye, EyeOff, Triangle } from 'lucide-react';

interface SecureCommandLayerProps {
  onCommandExecution: (command: any) => void;
  systemResonance: number;
}

const SecureCommandLayer: React.FC<SecureCommandLayerProps> = ({
  onCommandExecution,
  systemResonance
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [resonanceKey, setResonanceKey] = useState('');
  const [activeCommand, setActiveCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [geometryState, setGeometryState] = useState({
    triangle: { rotation: 0, scale: 1 },
    circle: { pulsation: 0 },
    spiral: { phase: 0 }
  });
  const [securityLevel, setSecurityLevel] = useState(0);
  const [showSymbols, setShowSymbols] = useState(false);

  // Symbolic resonance patterns
  const resonancePattterns = {
    '△◉◈': 'quantum_field_manipulation',
    '◈△◉': 'temporal_displacement',
    '◉◈△': 'causal_intervention',
    '◈◉△': 'reality_anchor',
    '△◈◉': 'consciousness_bridge'
  };

  // Update geometry based on system resonance
  useEffect(() => {
    const interval = setInterval(() => {
      setGeometryState(prev => ({
        triangle: {
          rotation: (prev.triangle.rotation + systemResonance * 0.01) % 360,
          scale: 1 + Math.sin(Date.now() * 0.001) * 0.1
        },
        circle: {
          pulsation: Math.sin(Date.now() * 0.002) * 0.3
        },
        spiral: {
          phase: (prev.spiral.phase + systemResonance * 0.02) % (Math.PI * 2)
        }
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [systemResonance]);

  const authenticateResonance = () => {
    const validKeys = ['OMEGA-7', 'SIGMA-13', 'DELTA-9', 'PSI-21'];
    if (validKeys.includes(resonanceKey.toUpperCase())) {
      setIsAuthenticated(true);
      setSecurityLevel(85 + Math.random() * 15);
    } else {
      // Simulate biometric authentication
      if (resonanceKey.length >= 8) {
        setIsAuthenticated(true);
        setSecurityLevel(60 + Math.random() * 25);
      }
    }
  };

  const executeSymbolicCommand = () => {
    if (!isAuthenticated) return;

    const command = {
      type: 'symbolic_resonance',
      pattern: activeCommand,
      interpretation: resonancePattterns[activeCommand as keyof typeof resonancePattterns] || 'unknown_pattern',
      timestamp: Date.now(),
      resonanceStrength: systemResonance,
      securityClearance: securityLevel
    };

    onCommandExecution(command);
    setCommandHistory(prev => [...prev.slice(-4), activeCommand]);
    setActiveCommand('');
  };

  const emergencyLockdown = () => {
    setIsAuthenticated(false);
    setSecurityLevel(0);
    setResonanceKey('');
    setActiveCommand('');
    onCommandExecution({
      type: 'emergency_lockdown',
      timestamp: Date.now(),
      reason: 'manual_override'
    });
  };

  const renderSymbolicGeometry = () => {
    const symbols = ['△', '◉', '◈', '◇', '▣', '⟐', '◎', '⊕'];
    return (
      <div className="flex justify-center items-center h-20 bg-black/20 rounded border border-purple-500/30">
        <div className="relative">
          {symbols.map((symbol, index) => (
            <span
              key={index}
              className="absolute text-lg font-bold text-purple-400"
              style={{
                transform: `
                  translate(${Math.cos((index / symbols.length) * Math.PI * 2 + geometryState.spiral.phase) * 25}px, 
                           ${Math.sin((index / symbols.length) * Math.PI * 2 + geometryState.spiral.phase) * 25}px) 
                  scale(${geometryState.triangle.scale})
                  rotate(${geometryState.triangle.rotation}deg)
                `,
                opacity: 0.6 + geometryState.circle.pulsation,
                color: `hsl(${(index * 45 + geometryState.triangle.rotation) % 360}, 70%, 60%)`
              }}
            >
              {symbol}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className="bg-black/60 backdrop-blur-sm border-purple-500/50 h-full">
      <CardHeader>
        <CardTitle className="text-purple-300 flex items-center gap-2">
          {isAuthenticated ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
          Secure Command Layer
          <Badge variant="outline" className="ml-auto text-xs border-purple-500/50 text-purple-400">
            {isAuthenticated ? 'AUTHORIZED' : 'LOCKED'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isAuthenticated ? (
          <div className="space-y-3">
            <div className="text-sm text-gray-300">Resonance Authentication Required</div>
            <Input
              type="password"
              placeholder="Enter resonance key or biometric signature..."
              value={resonanceKey}
              onChange={(e) => setResonanceKey(e.target.value)}
              className="bg-black/30 border-purple-500/30 text-white placeholder-gray-400 font-mono"
            />
            <Button
              onClick={authenticateResonance}
              disabled={!resonanceKey}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <Lock className="w-4 h-4 mr-2" />
              Authenticate Neural Pattern
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Security Status */}
            <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-lg p-3 border border-purple-500/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-purple-300">Security Clearance</span>
                <span className="text-sm text-green-400">{securityLevel.toFixed(0)}%</span>
              </div>
              <Progress value={securityLevel} className="h-2" />
            </div>

            {/* Symbolic Geometry Display */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Resonance Geometry</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowSymbols(!showSymbols)}
                  className="text-xs"
                >
                  {showSymbols ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                </Button>
              </div>
              {showSymbols && renderSymbolicGeometry()}
            </div>

            {/* Command Input */}
            <div className="space-y-2">
              <div className="text-sm text-gray-300">Symbolic Command Construct</div>
              <div className="grid grid-cols-5 gap-1">
                {Object.keys(resonancePattterns).map((pattern) => (
                  <Button
                    key={pattern}
                    size="sm"
                    variant={activeCommand === pattern ? "default" : "outline"}
                    onClick={() => setActiveCommand(pattern)}
                    className="text-xs font-mono"
                  >
                    {pattern}
                  </Button>
                ))}
              </div>
              <Input
                placeholder="Custom symbolic pattern..."
                value={activeCommand}
                onChange={(e) => setActiveCommand(e.target.value)}
                className="bg-black/30 border-purple-500/30 text-white placeholder-gray-400 font-mono text-center text-lg"
              />
            </div>

            {/* Command Interpretation */}
            {activeCommand && (
              <div className="bg-black/30 rounded-lg p-3 border border-gray-600">
                <div className="text-xs text-gray-400 mb-1">Command Interpretation:</div>
                <div className="text-sm text-cyan-400 font-mono">
                  {resonancePattterns[activeCommand as keyof typeof resonancePattterns] || 'UNDEFINED_PATTERN'}
                </div>
              </div>
            )}

            {/* Execution Controls */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={executeSymbolicCommand}
                disabled={!activeCommand}
                className="bg-cyan-600 hover:bg-cyan-700 text-xs"
              >
                <Zap className="w-3 h-3 mr-1" />
                Execute Pattern
              </Button>
              <Button
                onClick={emergencyLockdown}
                variant="outline"
                className="border-red-500/50 text-red-400 hover:bg-red-500/10 text-xs"
              >
                <Lock className="w-3 h-3 mr-1" />
                Emergency Lock
              </Button>
            </div>

            {/* Command History */}
            {commandHistory.length > 0 && (
              <div className="bg-black/30 rounded-lg p-3 border border-gray-600">
                <div className="text-xs text-gray-400 mb-2">Recent Command History:</div>
                <div className="space-y-1">
                  {commandHistory.slice(-3).reverse().map((cmd, index) => (
                    <div key={index} className="text-xs font-mono text-purple-400">
                      {cmd} → {resonancePattterns[cmd as keyof typeof resonancePattterns] || 'UNKNOWN'}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* System Status */}
        <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg p-3 border border-purple-500/20">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-gray-400">System Resonance:</span>
              <span className="text-purple-400 ml-2">{systemResonance.toFixed(1)}%</span>
            </div>
            <div>
              <span className="text-gray-400">Field Status:</span>
              <span className="text-cyan-400 ml-2">
                {isAuthenticated ? 'SYNCHRONIZED' : 'DISCONNECTED'}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecureCommandLayer;
