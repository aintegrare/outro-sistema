import React, { createContext, useContext } from 'react';
import { useAuth } from './useAuth';
import { db, storage, auth } from './config';

type FirebaseContextType = {
  user: ReturnType<typeof useAuth>['user'];
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  db: typeof db;
  storage: typeof storage;
  auth: typeof auth;
};

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const { user, loading, login, logout, register } = useAuth();

  return (
    <FirebaseContext.Provider value={{ user, loading, login, logout, register, db, storage, auth }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}

