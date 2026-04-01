import { useState } from 'react';

interface UseProfileTabsReturn {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const useProfileTabs = (
  initialTab: string = 'view'
): UseProfileTabsReturn => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  return {
    activeTab,
    setActiveTab,
  };
};
