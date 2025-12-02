import React, { createContext, ReactNode, useContext, useState } from 'react';

interface TabBarContextProps {
  visible: boolean;
  setVisible: (v: boolean) => void;
}

const TabBarContext = createContext<TabBarContextProps>({
  visible: true,
  setVisible: () => {},
});

export const useTabBar = () => useContext(TabBarContext);

export const TabBarProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(true);
  return (
    <TabBarContext.Provider value={{ visible, setVisible }}>
      {children}
    </TabBarContext.Provider>
  );
};
