
import React from 'react';
import { Badge } from '@/components/ui/badge';

const HeaderSection: React.FC = () => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gradient-pink mb-4 leading-tight tracking-tight">
        Vers3Dynamics
      </h1>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-light text-foreground/90 mb-6 italic leading-tight">
        will accelerate your growth.
      </h2>
      <p className="text-base md:text-lg text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed font-light">
        A cognitive-field simulation platform that uses Dynamic Resonance Rooting and chrono-spatial vector analysis to detect, model, and manipulate non-local phase structures across time, space, and symbolic logic.
      </p>
      <div className="flex justify-center gap-3 flex-wrap">
        <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 px-4 py-2 font-medium hover-lift">
          READY
        </Badge>
        <Badge variant="outline" className="border-green-500/30 text-green-600 bg-green-500/5 px-4 py-2 font-medium hover-lift">
          Active
        </Badge>
        <Badge variant="outline" className="border-blue-500/30 text-blue-600 bg-blue-500/5 px-4 py-2 font-medium hover-lift">
          Wormhole Stable
        </Badge>
      </div>
    </div>
  );
};

export default HeaderSection;
