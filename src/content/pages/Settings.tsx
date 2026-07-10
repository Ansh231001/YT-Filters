import React from 'react';
import { Settings as SettingsIcon, Sun, Moon, Monitor, RotateCcw, Database, Shield } from 'lucide-react';
import type { ThemeMode } from '../hooks/useTheme';

interface SettingsProps {
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
  onResetWidth: () => void;
  width: number;
}

export const Settings: React.FC<SettingsProps> = ({
  themeMode,
  onThemeChange,
  onResetWidth,
  width,
}) => {
  return (
    <div className="ytm-page-settings">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <SettingsIcon size={18} style={{ color: 'var(--accent-primary)' }} />
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>
          Extension Preferences
        </h3>
      </div>

      {/* Theme Settings */}
      <div className="ytm-card" style={{ marginBottom: '16px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>
          Color Theme & Mode
        </h4>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
          Choose how the sidebar looks inside YouTube Music. System mode matches your OS preferences automatically.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          <button
            type="button"
            className={`ytm-btn ${themeMode === 'system' ? 'ytm-btn-primary' : 'ytm-btn-secondary'}`}
            onClick={() => onThemeChange('system')}
            style={{ flexDirection: 'column', padding: '10px 6px', gap: '6px' }}
          >
            <Monitor size={18} />
            <span style={{ fontSize: '12px' }}>System Auto</span>
          </button>

          <button
            type="button"
            className={`ytm-btn ${themeMode === 'dark' ? 'ytm-btn-primary' : 'ytm-btn-secondary'}`}
            onClick={() => onThemeChange('dark')}
            style={{ flexDirection: 'column', padding: '10px 6px', gap: '6px' }}
          >
            <Moon size={18} />
            <span style={{ fontSize: '12px' }}>Dark Mode</span>
          </button>

          <button
            type="button"
            className={`ytm-btn ${themeMode === 'light' ? 'ytm-btn-primary' : 'ytm-btn-secondary'}`}
            onClick={() => onThemeChange('light')}
            style={{ flexDirection: 'column', padding: '10px 6px', gap: '6px' }}
          >
            <Sun size={18} />
            <span style={{ fontSize: '12px' }}>Light Mode</span>
          </button>
        </div>
      </div>

      {/* Sidebar Dimensions */}
      <div className="ytm-card" style={{ marginBottom: '16px' }}>
        <div className="ytm-card-header" style={{ marginBottom: '8px' }}>
          <span className="ytm-card-title">Sidebar Dimensions</span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{width}px</span>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
          You can drag the left edge of the sidebar to resize between 320px and 640px.
        </p>
        <button
          type="button"
          className="ytm-btn ytm-btn-secondary"
          onClick={onResetWidth}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <RotateCcw size={14} />
          <span>Reset to Default Width (400px)</span>
        </button>
      </div>

      {/* Storage Status */}
      <div className="ytm-card" style={{ marginBottom: '16px' }}>
        <div className="ytm-card-header" style={{ marginBottom: '8px' }}>
          <span className="ytm-card-title">
            <Database size={16} style={{ color: '#10b981' }} />
            Local Cache & Storage
          </span>
          <span style={{ fontSize: '11px', fontWeight: '600', color: '#10b981' }}>Phase 1</span>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          UI preferences (theme, dimensions, active tab) are saved in `localStorage`. IndexedDB cache will activate in Phase 2 for track persistence.
        </p>
      </div>

      {/* About */}
      <div className="ytm-card" style={{ background: 'var(--bg-secondary)', border: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>YT Music Filters v0.1.0</span>
          <Shield size={14} style={{ color: 'var(--accent-primary)' }} />
        </div>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          Phase 1 Extension Shell — Built with React 19, TypeScript, Vite & Shadow DOM.
        </p>
      </div>
    </div>
  );
};
