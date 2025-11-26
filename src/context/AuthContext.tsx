'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserTheme: (theme: 'light' | 'dark') => Promise<void>;
};

// ---------------------------------------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

async function loadUserData(uid: string) {
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      setUser(fbUser);

      if (fbUser) {
        const data = await loadUserData(fbUser.uid);
        const theme = data?.theme ?? 'light';

        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  const register = async (email: string, password: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, 'users', cred.user.uid), {
      email,
      theme: 'light',
    });
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateUserTheme = async (theme: 'light' | 'dark') => {
    if (!user) return;

    await updateDoc(doc(db, 'users', user.uid), {
      theme,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        updateUserTheme,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
