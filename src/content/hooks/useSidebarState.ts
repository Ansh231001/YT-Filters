import { useState, useCallback } from 'react';

export type ActiveTab = 'home' | 'filters' | 'analytics' | 'settings';

const STORAGE_KEY_IS_OPEN = 'ytm_filters_is_open';
const STORAGE_KEY_IS_COLLAPSED = 'ytm_filters_is_collapsed';
const STORAGE_KEY_WIDTH = 'ytm_filters_width';
const STORAGE_KEY_ACTIVE_TAB = 'ytm_filters_active_tab';

const DEFAULT_WIDTH = 400;
const MIN_WIDTH = 320;
const MAX_WIDTH = 640;

export function useSidebarState() {
  const [isOpen, setIsOpenState] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_IS_OPEN);
      if (stored !== null) return stored === 'true';
    } catch (e) {
      console.warn('Failed to read isOpen from localStorage:', e);
    }
    return true; // Default open on first install/run
  });

  const [isCollapsed, setIsCollapsedState] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_IS_COLLAPSED);
      if (stored !== null) return stored === 'true';
    } catch (e) {
      console.warn('Failed to read isCollapsed from localStorage:', e);
    }
    return false;
  });

  const [width, setWidthState] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_WIDTH);
      if (stored !== null) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed) && parsed >= MIN_WIDTH && parsed <= MAX_WIDTH) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to read width from localStorage:', e);
    }
    return DEFAULT_WIDTH;
  });

  const [activeTab, setActiveTabState] = useState<ActiveTab>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ACTIVE_TAB);
      if (stored === 'home' || stored === 'filters' || stored === 'analytics' || stored === 'settings') {
        return stored;
      }
    } catch (e) {
      console.warn('Failed to read activeTab from localStorage:', e);
    }
    return 'home';
  });

  const openSidebar = useCallback(() => {
    setIsOpenState(true);
    try {
      localStorage.setItem(STORAGE_KEY_IS_OPEN, 'true');
    } catch (e) {
      console.warn('Failed to save isOpen:', e);
    }
  }, []);

  const closeSidebar = useCallback(() => {
    setIsOpenState(false);
    try {
      localStorage.setItem(STORAGE_KEY_IS_OPEN, 'false');
    } catch (e) {
      console.warn('Failed to save isOpen:', e);
    }
  }, []);

  const toggleCollapse = useCallback(() => {
    setIsCollapsedState((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY_IS_COLLAPSED, String(next));
      } catch (e) {
        console.warn('Failed to save isCollapsed:', e);
      }
      return next;
    });
  }, []);

  const setWidth = useCallback((newWidth: number) => {
    const clamped = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, newWidth));
    setWidthState(clamped);
    try {
      localStorage.setItem(STORAGE_KEY_WIDTH, String(clamped));
    } catch (e) {
      console.warn('Failed to save width:', e);
    }
  }, []);

  const resetWidth = useCallback(() => {
    setWidth(DEFAULT_WIDTH);
  }, [setWidth]);

  const setActiveTab = useCallback((tab: ActiveTab) => {
    setActiveTabState(tab);
    try {
      localStorage.setItem(STORAGE_KEY_ACTIVE_TAB, tab);
    } catch (e) {
      console.warn('Failed to save activeTab:', e);
    }
  }, []);

  return {
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
    minWidth: MIN_WIDTH,
    maxWidth: MAX_WIDTH
  };
}
