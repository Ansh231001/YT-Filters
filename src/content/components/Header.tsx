import React from 'react';
import { Sun, Moon, Monitor, Minimize2, Maximize2, X, Music } from 'lucide-react';
import type { ThemeMode } from '../hooks/useTheme';

interface HeaderProps {
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onClose: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  themeMode,
  onThemeChange,
  isCollapsed,
  onToggleCollapse,
  onClose,
}) => {
  const cycleTheme = () => {
    if (themeMode === 'system') onThemeChange('dark');
    else if (themeMode === 'dark') onThemeChange('light');
    else onThemeChange('system');
  };

  const getThemeIcon = () => {
    if (themeMode === 'system') return <Monitor size={16} />;
    if (themeMode === 'dark') return <Moon size={16} />;
    return <Sun size={16} />;
  };

  const getThemeTitle = () => {
    if (themeMode === 'system') return 'Theme: Auto (System)';
    if (themeMode === 'dark') return 'Theme: Dark Mode';
    return 'Theme: Light Mode';
  };

  return (
    <header className="ytm-header">
      {!isCollapsed ? (
        <div className="ytm-header-brand">
          <div className="ytm-brand-icon">
            <Music size={18} />
          </div>
          <span>YT Music Filters</span>
          <span className="ytm-brand-badge">Phase 1</span>
        </div>
      ) : (
        <div className="ytm-header-brand" style={{ justifyItems: 'center', width: '100%', justifyContent: 'center' }}>
          <div className="ytm-brand-icon" title="YT Music Filters v0.1">
            <Music size={18} />
          </div>
        </div>
      )}

      <div className="ytm-header-actions">
        {!isCollapsed && (
          <button
            className="ytm-icon-btn"
            onClick={cycleTheme}
            title={getThemeTitle()}
            aria-label={getThemeTitle()}
          >
            {getThemeIcon()}
          </button>
        )}

        <button
          className="ytm-icon-btn"
          onClick={onToggleCollapse}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
        </button>

        {!isCollapsed && (
          <button
            className="ytm-icon-btn"
            onClick={onClose}
            title="Close Sidebar"
            aria-label="Close Sidebar"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </header>
  );
};
