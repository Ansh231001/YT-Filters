import React from 'react';
import { useTheme } from './hooks/useTheme';
import { useSidebarState } from './hooks/useSidebarState';
import { FloatingTrigger } from './components/FloatingTrigger';
import { Sidebar } from './components/Sidebar';

export const App: React.FC = () => {
  const { mode, resolvedTheme, setMode } = useTheme();
  const {
    isOpen,
    isCollapsed,
    width,
    activeTab,
    openSidebar,
    closeSidebar,
    toggleCollapse,
    setWidth,
    resetWidth,
    setActiveTab,
    minWidth,
    maxWidth,
  } = useSidebarState();

  return (
    <div id="ytm-filters-app" data-theme={resolvedTheme}>
      {!isOpen && <FloatingTrigger onOpen={openSidebar} />}

      <Sidebar
        isOpen={isOpen}
        isCollapsed={isCollapsed}
        width={width}
        activeTab={activeTab}
        themeMode={mode}
        onThemeChange={setMode}
        onToggleCollapse={toggleCollapse}
        onClose={closeSidebar}
        onTabChange={setActiveTab}
        onWidthChange={setWidth}
        onResetWidth={resetWidth}
        minWidth={minWidth}
        maxWidth={maxWidth}
      />
    </div>
  );
};

export default App;
