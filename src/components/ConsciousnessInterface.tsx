
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Mic, Brain, Zap } from 'lucide-react';

interface ConsciousnessInterfaceProps {
  onInputProcess: (input: string) => void;
  activeInput: string;
  setActiveInput: (input: string) => void;
}

const ConsciousnessInterface: React.FC<ConsciousnessInterfaceProps> = ({
  onInputProcess,
  activeInput,
  setActiveInput
}) => {
  const [inputMode, setInputMode] = useState<'text' | 'audio' | 'biometric' | 'file'>('text');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = async () => {
    if (!activeInput.trim()) return;
    
    setIsProcessing(true);
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    onInputProcess(activeInput);
    setIsProcessing(false);
  };

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-purple-500/30 h-full">
      <CardHeader>
        <CardTitle className="text-cyan-400 flex items-center gap-2">
          <Brain className="w-5 h-5" />
          OntoChron Input Interface
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Input Mode Selector */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { mode: 'text', icon: Zap, label: 'Text/Symbol' },
            { mode: 'audio', icon: Mic, label: 'Audio Wave' },
            { mode: 'biometric', icon: Brain, label: 'Biometric' },
            { mode: 'file', icon: Upload, label: 'File Upload' }
          ].map(({ mode, icon: Icon, label }) => (
            <Button
              key={mode}
              variant={inputMode === mode ? 'default' : 'outline'}
              size="sm"
              onClick={() => setInputMode(mode as any)}
              className={`${
                inputMode === mode 
                  ? 'bg-purple-600 border-purple-400' 
                  : 'bg-black/20 border-gray-600 hover:border-purple-400'
              }`}
            >
              <Icon className="w-4 h-4 mr-1" />
              {label}
            </Button>
          ))}
        </div>

        {/* Input Area */}
        <div className="space-y-3">
          {inputMode === 'text' && (
            <Textarea
              placeholder="Enter ontological seeds: text, symbols, concepts, emotions..."
              value={activeInput}
              onChange={(e) => setActiveInput(e.target.value)}
              className="bg-black/30 border-gray-600 text-white placeholder-gray-400 min-h-[120px] resize-none"
            />
          )}

          {inputMode === 'audio' && (
            <div className="bg-black/30 border border-gray-600 rounded-md p-6 text-center">
              <Mic className="w-12 h-12 mx-auto mb-3 text-purple-400" />
              <p className="text-gray-400 text-sm">Audio consciousness mapping active</p>
              <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 animate-pulse w-1/3"></div>
              </div>
            </div>
          )}

          {inputMode === 'biometric' && (
            <div className="bg-black/30 border border-gray-600 rounded-md p-6 text-center">
              <Brain className="w-12 h-12 mx-auto mb-3 text-cyan-400" />
              <p className="text-gray-400 text-sm">Neural pattern recognition enabled</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="h-8 bg-gradient-to-t from-purple-600 to-purple-400 rounded animate-pulse"></div>
                <div className="h-8 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="h-8 bg-gradient-to-t from-blue-600 to-blue-400 rounded animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          )}

          {inputMode === 'file' && (
            <div className="bg-black/30 border border-gray-600 rounded-md p-6 text-center border-dashed">
              <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p className="text-gray-400 text-sm">Drop files to encode as ontological data</p>
              <Input type="file" className="mt-3 bg-transparent border-0" multiple />
            </div>
          )}
        </div>

        {/* Process Button */}
        <Button
          onClick={handleProcess}
          disabled={isProcessing || !activeInput.trim()}
          className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Compiling Reality Vector...
            </div>
          ) : (
            'Encode to Chrono-Spatial Field'
          )}
        </Button>

        {/* Recent Encodings */}
        <div className="text-xs text-gray-500">
          <p>Recent encodings: 3 text seeds, 1 audio wave, 2 biometric patterns</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsciousnessInterface;
