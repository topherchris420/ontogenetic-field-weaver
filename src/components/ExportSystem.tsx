
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, FileText, Image, Music, Cpu } from 'lucide-react';
import { toast } from 'sonner';

interface ExportSystemProps {
  seeds: any[];
  temporalGeometry: { x: number; y: number; z: number; t: number };
  resonanceField: number;
}

const ExportSystem: React.FC<ExportSystemProps> = ({ seeds, temporalGeometry, resonanceField }) => {
  const [exportFormat, setExportFormat] = useState('tensor-map');
  const [isExporting, setIsExporting] = useState(false);

  const exportFormats = [
    { 
      id: 'tensor-map', 
      label: 'Quantum Tensor Map', 
      icon: Cpu, 
      description: 'Mathematical representation of quantum field states',
      extension: '.qtm'
    },
    { 
      id: 'resonance-log', 
      label: 'Symbolic Resonance Log', 
      icon: FileText, 
      description: 'Comprehensive symbolic interaction history',
      extension: '.srl'
    },
    { 
      id: 'cymatic-field', 
      label: 'Animated Cymatic Field', 
      icon: Music, 
      description: 'Visual-audio representation of consciousness patterns',
      extension: '.acf'
    },
    { 
      id: 'topology-blueprint', 
      label: 'Topological Blueprint', 
      icon: Image, 
      description: 'Physical instantiation data for reality constructs',
      extension: '.tpb'
    }
  ];

  const handleExport = async () => {
    if (seeds.length === 0) {
      toast.error('No ontological data to export. Please input some consciousness seeds first.');
      return;
    }

    setIsExporting(true);
    
    // Simulate export processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const selectedFormat = exportFormats.find(f => f.id === exportFormat);
    const exportData = {
      format: exportFormat,
      timestamp: new Date().toISOString(),
      seeds: seeds.map(seed => ({
        id: seed.id,
        content: seed.content,
        resonance: seed.resonance,
        topology: seed.topology
      })),
      temporalGeometry,
      resonanceField,
      metadata: {
        totalSeeds: seeds.length,
        averageResonance: seeds.reduce((acc, seed) => acc + seed.resonance, 0) / seeds.length,
        fieldIntensity: resonanceField,
        exportVersion: 'v3.0.1'
      }
    };

    // Create downloadable file
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vers3-export-${Date.now()}${selectedFormat?.extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setIsExporting(false);
    toast.success(`Successfully exported ${selectedFormat?.label} with ${seeds.length} ontological seeds.`);
  };

  const selectedFormat = exportFormats.find(f => f.id === exportFormat);

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-indigo-500/30 h-full">
      <CardHeader>
        <CardTitle className="text-indigo-400 flex items-center gap-2">
          <Download className="w-5 h-5" />
          Reality Export System
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Format Selection */}
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Export Format</label>
          <Select value={exportFormat} onValueChange={setExportFormat}>
            <SelectTrigger className="bg-black/30 border-gray-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-gray-600">
              {exportFormats.map(format => (
                <SelectItem key={format.id} value={format.id} className="text-gray-300">
                  <div className="flex items-center gap-2">
                    <format.icon className="w-4 h-4" />
                    {format.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Format Description */}
        {selectedFormat && (
          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg p-3 border border-indigo-500/20">
            <div className="flex items-center gap-2 mb-2">
              <selectedFormat.icon className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-medium text-indigo-300">{selectedFormat.label}</span>
            </div>
            <p className="text-xs text-gray-400">{selectedFormat.description}</p>
            <div className="mt-2 text-xs text-gray-500">
              File extension: <span className="text-indigo-400 font-mono">{selectedFormat.extension}</span>
            </div>
          </div>
        )}

        {/* Export Statistics */}
        <div className="bg-black/30 rounded-lg p-3 border border-gray-600">
          <h4 className="text-sm text-gray-300 mb-2">Export Preview</h4>
          <div className="text-xs text-gray-400 space-y-1">
            <div className="flex justify-between">
              <span>Ontological Seeds:</span>
              <span className="text-purple-400">{seeds.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Resonance Field:</span>
              <span className="text-cyan-400">{resonanceField.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Temporal Coordinates:</span>
              <span className="text-blue-400 font-mono">
                [{temporalGeometry.x.toFixed(2)}, {temporalGeometry.y.toFixed(2)}, {temporalGeometry.z.toFixed(2)}]
              </span>
            </div>
            <div className="flex justify-between">
              <span>Data Complexity:</span>
              <span className="text-green-400">
                {seeds.length > 0 ? 'High' : 'None'}
              </span>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <Button
          onClick={handleExport}
          disabled={isExporting || seeds.length === 0}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
        >
          {isExporting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Compiling Reality Data...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export to {selectedFormat?.label}
            </div>
          )}
        </Button>

        {seeds.length === 0 && (
          <p className="text-xs text-gray-500 text-center">
            Input ontological seeds to enable reality export functionality.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ExportSystem;
