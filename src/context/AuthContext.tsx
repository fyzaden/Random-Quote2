'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';

import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

type AuthContextType = {
  user: User | null;
  userData: any | null;
  loading: boolean;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserTheme: (theme: 'light' | 'dark') => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setUser(fbUser);

      if (fbUser) {
        const ref = doc(db, 'users', fbUser.uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          await setDoc(ref, {
            email: fbUser.email,
            theme: 'light',
            admin: false,
          });
          setUserData({
            email: fbUser.email,
            theme: 'light',
            admin: false,
          });
        } else {
          setUserData(snap.data());
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (email: string, password: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', res.user.uid), {
      email,
      theme: 'light',
      admin: false,
    });
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
    document.documentElement.classList.remove('dark');
  };

  const updateUserTheme = async (theme: 'light' | 'dark') => {
    if (!user) return;

    const ref = doc(db, 'users', user.uid);
    await updateDoc(ref, { theme });
    setUserData((prev: any) => ({ ...prev, theme }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        register,
        login,
        logout,
        updateUserTheme,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
