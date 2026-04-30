"use client";

import React, { createContext, useContext } from 'react';

const SiteContentContext = createContext<any>(null);

export function SiteContentProvider({ children, content }: { children: React.ReactNode, content: any }) {
  return (
    <SiteContentContext.Provider value={{ content }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context.content;
}
