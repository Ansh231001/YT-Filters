import React from 'react';
import { BarChart3, PieChart, TrendingUp, Users, Clock, Disc } from 'lucide-react';

export const Analytics: React.FC = () => {
  return (
    <div className="ytm-page-analytics">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <BarChart3 size={18} style={{ color: 'var(--accent-secondary)' }} />
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>
          Playlist Insights Dashboard
        </h3>
      </div>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.4' }}>
        Phase 7 will unlock rich visualizations and library breakdown metrics directly from your parsed tracks.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
        <div className="ytm-card" style={{ padding: '12px', textAlign: 'center' }}>
          <Users size={20} style={{ color: 'var(--accent-primary)', margin: '0 auto 6px' }} />
          <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>--</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Unique Artists</div>
        </div>
        <div className="ytm-card" style={{ padding: '12px', textAlign: 'center' }}>
          <Disc size={20} style={{ color: 'var(--accent-secondary)', margin: '0 auto 6px' }} />
          <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>--</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total Albums</div>
        </div>
        <div className="ytm-card" style={{ padding: '12px', textAlign: 'center' }}>
          <Clock size={20} style={{ color: '#3b82f6', margin: '0 auto 6px' }} />
          <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>--</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Avg Duration</div>
        </div>
        <div className="ytm-card" style={{ padding: '12px', textAlign: 'center' }}>
          <TrendingUp size={20} style={{ color: '#10b981', margin: '0 auto 6px' }} />
          <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>--</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Most Played</div>
        </div>
      </div>

      <div className="ytm-card">
        <div className="ytm-card-header">
          <span className="ytm-card-title">
            <PieChart size={16} style={{ color: 'var(--accent-primary)' }} />
            Genre Distribution (Phase 7)
          </span>
        </div>
        <div style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px dashed var(--border-color)' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Interactive charts rendering when tracks are indexed</span>
        </div>
      </div>
    </div>
  );
};
