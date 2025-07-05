
import React from 'react';
import { Badge } from '@/components/ui/badge';

const HeaderSection: React.FC = () => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-6xl font-display font-semibold text-gradient-pink mb-4 leading-tight">
        Cognitive Agents to
      </h1>
      <h2 className="text-5xl font-display font-light text-foreground mb-6 italic leading-tight">
        accelerate your growth.
      </h2>
      <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
        Train your Agents to scout the internet 24/7 and gather 
        any data humans can—powering your outbound sales, 
        revenue operations, and marketing.
      </p>
      <div className="flex justify-center gap-3">
        <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 px-4 py-2">
          AI-POWERED
        </Badge>
        <Badge variant="outline" className="border-green-500/30 text-green-600 bg-green-500/5 px-4 py-2">
          PRODUCTION READY
        </Badge>
      </div>
    </div>
  );
};

export default HeaderSection;
