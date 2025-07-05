
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Zap, Shield, Activity, Eye } from 'lucide-react';

interface NeuroSymbolicParserProps {
  onFieldDeformation: (deformation: any) => void;
  onThreatDetection: (threat: any) => void;
}

const NeuroSymbolicParser: React.FC<NeuroSymbolicParserProps> = ({ 
  onFieldDeformation, 
  onThreatDetection 
}) => {
  const [activeMode, setActiveMode] = useState<'natural' | 'biometric' | 'encrypted'>('natural');
  const [inputBuffer, setInputBuffer] = useState('');
  const [biometricPatterns, setBiometricPatterns] = useState({
    heartRate: 72,
    brainwaves: [0.3, 0.7, 0.4, 0.9, 0.2],
    galvanicResponse: 0.45
  });
  const [encryptionKey, setEncryptionKey] = useState('');
  const [parseStatus, setParseStatus] = useState<'idle' | 'parsing' | 'vectorizing' | 'complete'>('idle');
  const [threatLevel, setThreatLevel] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Biometric simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setBiometricPatterns(prev => ({
        heartRate: prev.heartRate + (Math.random() - 0.5) * 4,
        brainwaves: prev.brainwaves.map(w => w + (Math.random() - 0.5) * 0.2),
        galvanicResponse: Math.max(0, Math.min(1, prev.galvanicResponse + (Math.random() - 0.5) * 0.1))
      }));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Biometric visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now() * 0.001;
      
      // Draw brainwave patterns
      ctx.strokeStyle = '#00ff88';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      for (let x = 0; x < canvas.width; x += 2) {
        const frequency = biometricPatterns.brainwaves[Math.floor(x / (canvas.width / 5))];
        const y = canvas.height/2 + Math.sin((x * frequency * 0.1) + time) * 20;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw heart rate pulse
      const pulseX = (time * 50) % canvas.width;
      const pulseIntensity = Math.sin(time * (biometricPatterns.heartRate / 60) * Math.PI * 2);
      
      ctx.fillStyle = `rgba(255, 0, 100, ${Math.abs(pulseIntensity) * 0.8})`;
      ctx.beginPath();
      ctx.arc(pulseX, canvas.height * 0.7, 8 + Math.abs(pulseIntensity) * 5, 0, Math.PI * 2);
      ctx.fill();

      requestAnimationFrame(animate);
    };

    animate();
  }, [biometricPatterns]);

  const processInput = async () => {
    setParseStatus('parsing');
    
    // Simulate parsing delay
    await new Promise(resolve => setTimeout(resolve, 800));
    setParseStatus('vectorizing');
    
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const deformation = {
      source: activeMode,
      vectors: generateVectors(),
      timestamp: Date.now(),
      threatLevel: Math.random() * 100
    };

    setThreatLevel(deformation.threatLevel);
    onFieldDeformation(deformation);
    
    if (deformation.threatLevel > 70) {
      onThreatDetection({
        type: 'ontological_perturbation',
        severity: 'critical',
        vector: deformation.vectors[0]
      });
    }
    
    setParseStatus('complete');
    setTimeout(() => setParseStatus('idle'), 2000);
  };

  const generateVectors = () => {
    const baseVector = inputBuffer.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return [
      { x: Math.sin(baseVector * 0.01), y: Math.cos(baseVector * 0.01), z: baseVector * 0.001 },
      { x: Math.cos(baseVector * 0.02), y: Math.sin(baseVector * 0.02), z: baseVector * 0.002 },
      { x: Math.tan(baseVector * 0.005), y: Math.sin(baseVector * 0.01), z: baseVector * 0.003 }
    ];
  };

  const getThreatColor = () => {
    if (threatLevel < 30) return 'text-green-400';
    if (threatLevel < 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <Card className="bg-black/50 backdrop-blur-sm border-cyan-500/40 h-full">
      <CardHeader>
        <CardTitle className="text-cyan-300 flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Neuro-Symbolic Input Parser
          <Badge variant="outline" className="ml-auto text-xs border-green-500/50 text-green-400">
            DRR-ENABLED
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeMode} onValueChange={(value: any) => setActiveMode(value)}>
          <TabsList className="grid w-full grid-cols-3 bg-black/30">
            <TabsTrigger value="natural" className="text-xs">Natural Language</TabsTrigger>
            <TabsTrigger value="biometric" className="text-xs">Biometric Wave</TabsTrigger>
            <TabsTrigger value="encrypted" className="text-xs">Encrypted Keys</TabsTrigger>
          </TabsList>
          
          <TabsContent value="natural" className="space-y-3">
            <Textarea
              placeholder="Enter strategic intent, memetic construct, or causal directive..."
              value={inputBuffer}
              onChange={(e) => setInputBuffer(e.target.value)}
              className="bg-black/30 border-gray-600 text-white placeholder-gray-400 min-h-[80px]"
            />
          </TabsContent>
          
          <TabsContent value="biometric" className="space-y-3">
            <div className="bg-black/30 border border-gray-600 rounded-md p-3">
              <canvas ref={canvasRef} className="w-full h-20 border border-green-500/20 rounded" />
              <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                <div>
                  <span className="text-gray-400">HR:</span>
                  <span className="text-red-400 ml-1">{biometricPatterns.heartRate.toFixed(0)} BPM</span>
                </div>
                <div>
                  <span className="text-gray-400">GSR:</span>
                  <span className="text-blue-400 ml-1">{(biometricPatterns.galvanicResponse * 100).toFixed(1)}%</span>
                </div>
                <div>
                  <span className="text-gray-400">EEG:</span>
                  <span className="text-green-400 ml-1">ALPHA</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="encrypted" className="space-y-3">
            <Input
              type="password"
              placeholder="Enter classified operation key..."
              value={encryptionKey}
              onChange={(e) => setEncryptionKey(e.target.value)}
              className="bg-black/30 border-gray-600 text-white placeholder-gray-400 font-mono"
            />
            <div className="text-xs text-gray-400">
              Key Format: [CLASSIFICATION]-[OPERATION]-[TEMPORAL_VECTOR]
            </div>
          </TabsContent>
        </Tabs>

        <Button
          onClick={processInput}
          disabled={parseStatus !== 'idle'}
          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
        >
          {parseStatus === 'idle' && (
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Parse & Vectorize Input
            </div>
          )}
          {parseStatus === 'parsing' && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Parsing Symbolic Structures...
            </div>
          )}
          {parseStatus === 'vectorizing' && (
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 animate-pulse" />
              Generating Field Vectors...
            </div>
          )}
          {parseStatus === 'complete' && (
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Vector Integration Complete
            </div>
          )}
        </Button>

        <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-3 border border-gray-600">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-gray-400">Parse Status:</span>
              <span className="text-cyan-400 ml-2 capitalize">{parseStatus}</span>
            </div>
            <div>
              <span className="text-gray-400">Threat Level:</span>
              <span className={`ml-2 ${getThreatColor()}`}>{threatLevel.toFixed(1)}%</span>
            </div>
            <div>
              <span className="text-gray-400">Mode:</span>
              <span className="text-purple-400 ml-2 capitalize">{activeMode}</span>
            </div>
            <div>
              <span className="text-gray-400">DRR Status:</span>
              <span className="text-green-400 ml-2">Active</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NeuroSymbolicParser;
