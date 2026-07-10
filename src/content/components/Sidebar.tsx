import React, { useState, useEffect, useRef } from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { Home } from '../pages/Home';
import { Filters } from '../pages/Filters';
import { Analytics } from '../pages/Analytics';
import { Settings } from '../pages/Settings';
import type { ThemeMode } from '../hooks/useTheme';
import type { ActiveTab } from '../hooks/useSidebarState';
import { Maximize2 } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  width: number;
  activeTab: ActiveTab;
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
  onToggleCollapse: () => void;
  onClose: () => void;
  onTabChange: (tab: ActiveTab) => void;
  onWidthChange: (newWidth: number) => void;
  onResetWidth: () => void;
  minWidth: number;
  maxWidth: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  isCollapsed,
  width,
  activeTab,
  themeMode,
  onThemeChange,
  onToggleCollapse,
  onClose,
  onTabChange,
  onWidthChange,
  onResetWidth,
  minWidth,
  maxWidth,
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const startXRef = useRef<number>(0);
  const startWidthRef = useRef<number>(width);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      // Since sidebar is fixed on right side of screen, moving left increases width
      const deltaX = startXRef.current - e.clientX;
      const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidthRef.current + deltaX));
      onWidthChange(newWidth);
    };

    const handleMouseUp = () => {
      if (isResizing) {
        setIsResizing(false);
      }
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'ew-resize';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isResizing, minWidth, maxWidth, onWidthChange]);

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    startXRef.current = e.clientX;
    startWidthRef.current = width;
    setIsResizing(true);
  };

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'filters':
        return <Filters />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return (
          <Settings
            themeMode={themeMode}
            onThemeChange={onThemeChange}
            onResetWidth={onResetWidth}
            width={width}
          />
        );
      default:
        return <Home />;
    }
  };

  return (
    <aside
      id="ytm-filters-sidebar"
      className={`${!isOpen ? 'closed' : ''} ${isCollapsed ? 'collapsed' : ''}`}
      style={!isCollapsed ? { width: `${width}px` } : undefined}
      aria-label="YT Music Filters Sidebar"
    >
      {!isCollapsed && (
        <div
          className={`resize-handle ${isResizing ? 'resizing' : ''}`}
          onMouseDown={handleResizeStart}
          title="Drag to resize sidebar width"
        />
      )}

      <Header
        themeMode={themeMode}
        onThemeChange={onThemeChange}
        isCollapsed={isCollapsed}
        onToggleCollapse={onToggleCollapse}
        onClose={onClose}
      />

      <Navigation
        activeTab={activeTab}
        onTabChange={onTabChange}
        isCollapsed={isCollapsed}
      />

      {!isCollapsed ? (
        <main className="ytm-content">
          {renderActivePage()}
        </main>
      ) : (
        <div className="ytm-collapsed-footer">
          <button
            className="ytm-icon-btn"
            onClick={onToggleCollapse}
            title="Expand Sidebar"
            aria-label="Expand Sidebar"
          >
            <Maximize2 size={18} />
          </button>
        </div>
      )}
    </aside>
  );
};
