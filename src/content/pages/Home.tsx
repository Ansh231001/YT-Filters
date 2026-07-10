import React from 'react';
import { Sparkles, Layers, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="ytm-page-home">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div className="ytm-status-pill">
          <span className="ytm-status-dot"></span>
          <span>Phase 1 Shell Active</span>
        </div>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Shadow DOM Isolated</span>
      </div>

      <div className="ytm-card" style={{ background: 'var(--accent-gradient)', color: '#fff', border: 'none', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Sparkles size={20} />
          <h3 style={{ fontSize: '16px', fontWeight: '700' }}>Welcome to YT Music Filters</h3>
        </div>
        <p style={{ fontSize: '13px', lineHeight: '1.5', opacity: 0.95 }}>
          The Phase 1 extension framework is successfully injected into YouTube Music with zero style clashing. You are running the foundational architecture ready for live playlist extraction.
        </p>
      </div>

      <h4 style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', margin: '8px 0 12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        Active Architecture Features
      </h4>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div className="ytm-card">
          <div className="ytm-card-header" style={{ marginBottom: '6px' }}>
            <span className="ytm-card-title">
              <ShieldCheck size={18} style={{ color: 'var(--accent-primary)' }} />
              Shadow DOM Isolation
            </span>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#10b981' }}>ONLINE</span>
          </div>
          <p className="ytm-card-subtitle">
            Encapsulates all React components and custom CSS variables inside an isolated shadow root inside `music.youtube.com`.
          </p>
        </div>

        <div className="ytm-card">
          <div className="ytm-card-header" style={{ marginBottom: '6px' }}>
            <span className="ytm-card-title">
              <Layers size={18} style={{ color: 'var(--accent-secondary)' }} />
              Responsive Drawer & Resizer
            </span>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#10b981' }}>ONLINE</span>
          </div>
          <p className="ytm-card-subtitle">
            Drag the left edge to resize between 320px and 640px. Collapse or close at any time with persistent state storage.
          </p>
        </div>

        <div className="ytm-card">
          <div className="ytm-card-header" style={{ marginBottom: '6px' }}>
            <span className="ytm-card-title">
              <Cpu size={18} style={{ color: '#3b82f6' }} />
              Phase 2: Playlist Extraction
            </span>
            <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--accent-primary)' }}>QUEUED</span>
          </div>
          <p className="ytm-card-subtitle">
            In Phase 2, this view will render live songs from your Liked Songs and active playlists with instant fuzzy search.
          </p>
          <div style={{ marginTop: '12px', padding: '10px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Ready for DOM Scraper & Dexie DB</span>
            <ArrowRight size={14} style={{ color: 'var(--text-secondary)' }} />
          </div>
        </div>
      </div>
    </div>
  );
};
