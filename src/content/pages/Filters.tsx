import React from 'react';
import { Filter, Search, SlidersHorizontal, Music2, Disc, Clock, Calendar, Globe } from 'lucide-react';

export const Filters: React.FC = () => {
  const filterCategories = [
    { label: 'Artist Filter', icon: <Music2 size={16} />, status: 'Phase 4' },
    { label: 'Album Filter', icon: <Disc size={16} />, status: 'Phase 4' },
    { label: 'Duration Range', icon: <Clock size={16} />, status: 'Phase 4' },
    { label: 'Release Year', icon: <Calendar size={16} />, status: 'Phase 4' },
    { label: 'Genre & Mood', icon: <SlidersHorizontal size={16} />, status: 'Phase 6' },
    { label: 'Language & Country', icon: <Globe size={16} />, status: 'Phase 6' },
  ];

  return (
    <div className="ytm-page-filters">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <Filter size={18} style={{ color: 'var(--accent-primary)' }} />
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>
          Multi-Select Filtering Engine
        </h3>
      </div>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.4' }}>
        In Phase 3 & 4, this panel will allow composable multi-criteria filtering across 10,000+ tracks with zero latency.
      </p>

      <div className="ytm-card" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <Search size={16} style={{ color: 'var(--text-muted)' }} />
          <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>
            Instant Fuzzy Search (Preview)
          </span>
        </div>
        <input
          type="text"
          className="ytm-input"
          placeholder="Search by song title, artist, or album (Phase 3)..."
          disabled
          style={{ opacity: 0.7 }}
        />
      </div>

      <h4 style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', margin: '12px 0 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        Planned Filter Modularity
      </h4>

      <div className="ytm-chip-grid">
        {filterCategories.map((item, idx) => (
          <div key={idx} className="ytm-chip">
            <span style={{ color: 'var(--accent-primary)' }}>{item.icon}</span>
            <span style={{ flex: 1 }}>{item.label}</span>
            <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '6px', background: 'var(--bg-primary)', color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
