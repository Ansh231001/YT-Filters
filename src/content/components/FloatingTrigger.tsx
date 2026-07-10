import React from 'react';
import { Sparkles, Music2 } from 'lucide-react';

interface FloatingTriggerProps {
  onOpen: () => void;
}

export const FloatingTrigger: React.FC<FloatingTriggerProps> = ({ onOpen }) => {
  return (
    <button
      id="ytm-filters-trigger"
      onClick={onOpen}
      title="Open YT Music Filters"
      aria-label="Open YT Music Filters Sidebar"
    >
      <div className="trigger-icon">
        <Music2 size={18} />
      </div>
      <span>Filters & Tools</span>
      <Sparkles size={14} style={{ opacity: 0.8 }} />
    </button>
  );
};
