import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Object3DConfig {
  type: 'cone' | 'cube' | 'dodecahedron';
  color: string;
  rotation: [number, number, number];
}

interface ThreeDContextProps {
  objects: Object3DConfig[];
  addObject: (object: Object3DConfig) => void;
}

const ThreeDContext = createContext<ThreeDContextProps | undefined>(undefined);

export function ThreeDProvider({ children }: { children: ReactNode }) {
  const [objects, setObjects] = useState<Object3DConfig[]>([]);

  function addObject(object: Object3DConfig) {
    setObjects((prev) => [...prev, object]);
  }

  return (
    <ThreeDContext.Provider value={{ objects, addObject }}>
      {children}
    </ThreeDContext.Provider>
  );
}

export function useThreeDContext() {
  const context = useContext(ThreeDContext);
  if (!context) {
    throw new Error('useThreeDContext must be used within a ThreeDProvider');
  }
  return context;
}
