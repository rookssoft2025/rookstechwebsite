import React, { createContext, useState, useContext } from 'react';

const AppShowcaseContext = createContext();

export const AppShowcaseProvider = ({ children }) => {
  const [selectedAppId, setSelectedAppId] = useState(null);

  return (
    <AppShowcaseContext.Provider value={{ selectedAppId, setSelectedAppId }}>
      {children}
    </AppShowcaseContext.Provider>
  );
};

export const useAppShowcase = () => {
  const context = useContext(AppShowcaseContext);
  if (!context) {
    throw new Error('useAppShowcase must be used within an AppShowcaseProvider');
  }
  return context;
};
