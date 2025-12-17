'use client';

import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import {
  updateEmail,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import { doc, deleteDoc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function SettingsPage() {
  const { user } = useAuth();

  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  if (!user) return <p className='p-10'>Login required.</p>;

  async function handleEmailUpdate() {
    if (!newEmail || !password) {
      setMessage('Enter email and password.');
      return;
    }

    try {
      // 1) REAUTHENTICATE
      const cred = EmailAuthProvider.credential(user.email!, password);
      await reauthenticateWithCredential(user, cred);

      // 2) UPDATE EMAIL
      await updateEmail(user, newEmail);

      // 3) ENSURE USER DOC EXISTS
      const ref = doc(db, 'users', user.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        await setDoc(ref, {
          email: newEmail,
          theme: 'light',
        });
      } else {
        await updateDoc(ref, { email: newEmail });
      }

      setMessage('Email updated successfully! Please login again.');
    } catch (err: any) {
      console.log('ERROR:', err);
      setMessage(err.message);
    }
  }

  async function handleDeleteAccount() {
    const ok = confirm('Are you sure? This action is permanent.');
    if (!ok) return;

    try {
      await deleteDoc(doc(db, 'users', user.uid));
      await deleteUser(user);
    } catch (err: any) {
      setMessage(err.message);
    }
  }

  return (
    <main className='min-h-dvh flex items-center justify-center p-8 bg-slate-100 dark:bg-slate-900'>
      <div className='bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold text-center mb-6'>User Settings</h1>

        <div className='mb-8'>
          <label className='font-semibold'>New Email</label>
          <input
            type='email'
            className='p-2 w-full border rounded-lg mt-1 dark:bg-slate-700 dark:text-white'
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />

          <label className='font-semibold mt-4'>Confirm Password</label>
          <input
            type='password'
            className='p-2 w-full border rounded-lg mt-1 dark:bg-slate-700 dark:text-white'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleEmailUpdate}
            className='bg-amber-900 hover:bg-amber-700 text-white rounded-lg p-2 mt-3 w-full'
          >
            Update Email
          </button>
        </div>

        <button
          onClick={handleDeleteAccount}
          className='bg-red-600 hover:bg-red-700 text-white rounded-lg p-2 w-full'
        >
          Delete My Account
        </button>

        {message && (
          <p className='text-center mt-4 dark:text-slate-300'>{message}</p>
        )}
      </div>
    </main>
  );
}
