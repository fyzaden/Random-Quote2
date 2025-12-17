'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { updateEmail, deleteUser } from 'firebase/auth';

export default function UserSettingsPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [newEmail, setNewEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <main className='min-h-dvh flex items-center justify-center text-white bg-gradient-to-r from-red-500 to-amber-600'>
        <p>You must be logged in to view this page.</p>
      </main>
    );
  }

  // Email Update Handler
  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await updateEmail(user, newEmail);
      setMessage('Email successfully updated!');
    } catch (err: any) {
      setMessage(err.message || 'Failed to update email.');
    }

    setLoading(false);
  };

  // Delete User Handler
  const handleDeleteAccount = async () => {
    const confirmDelete = confirm('Are you sure? This action is irreversible.');

    if (!confirmDelete) return;

    setLoading(true);
    setMessage(null);

    try {
      await deleteUser(user);
      router.push('/signup');
    } catch (err: any) {
      setMessage(err.message || 'Failed to delete account.');
    }

    setLoading(false);
  };

  return (
    <main className='min-h-dvh flex items-center justify-center bg-gradient-to-r from-amber-400 to-red-800'>
      <div className='bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md w-[90%] max-w-md mx-auto'>
        <h1 className='text-3xl font-bold text-center mb-6'>User Settings</h1>

        {/* Email Update Section */}
        <form onSubmit={handleEmailUpdate} className='flex flex-col gap-4'>
          <label className='font-bold text-sm dark:text-slate-300'>
            New Email
          </label>
          <input
            type='email'
            placeholder='new email'
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className='p-2 rounded bg-amber-900 text-white dark:bg-slate-700'
          />
          <button
            type='submit'
            disabled={loading}
            className='bg-amber-900 hover:bg-amber-600 text-white rounded-lg p-2'
          >
            {loading ? 'Updating...' : 'Update Email'}
          </button>
        </form>

        {/* Delete Account */}
        <button
          onClick={handleDeleteAccount}
          className='bg-red-600 hover:bg-red-800 text-white rounded-lg p-2 mt-6 w-full'
        >
          Delete My Account
        </button>

        {/* Error & Info Message */}
        {message && (
          <p className='mt-4 text-center text-sm text-white bg-black/40 p-2 rounded'>
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
