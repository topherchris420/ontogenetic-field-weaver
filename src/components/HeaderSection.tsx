
import React from 'react';
import { Badge } from '@/components/ui/badge';

const HeaderSection: React.FC = () => {
  return (
    <div className="text-center mb-6">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
        Vers3: Cognitive-Field Simulation Engine
      </h1>
      <p className="text-lg text-gray-300 max-w-5xl mx-auto mb-4">
        Full-spectrum predictive operations platform integrating Dynamic Resonance Rooting, 
        chrono-spatial displacement modeling, and adaptive geometric reconfiguration
      </p>
      <div className="flex justify-center gap-4">
        <Badge variant="outline" className="border-green-500/50 text-green-400">
          DRR-ENABLED
        </Badge>
        <Badge variant="outline" className="border-orange-500/50 text-orange-400">
          CLASSIFIED
        </Badge>
      </div>
    </div>
  );
};

export default HeaderSection;
