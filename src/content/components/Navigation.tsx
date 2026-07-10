import React from 'react';
import { Home, Filter, BarChart3, Settings } from 'lucide-react';
import type { ActiveTab } from '../hooks/useSidebarState';

interface NavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  isCollapsed: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  isCollapsed,
}) => {
  const tabs: Array<{ id: ActiveTab; label: string; icon: React.ReactNode }> = [
    { id: 'home', label: 'Home', icon: <Home size={18} /> },
    { id: 'filters', label: 'Filters', icon: <Filter size={18} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <nav className="ytm-nav" aria-label="Sidebar Navigation">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`ytm-nav-tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
          title={isCollapsed ? tab.label : undefined}
          aria-label={tab.label}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};
