'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
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
      <main className='min-h-dvh flex items-center justify-center'>
        <p>You must be logged in.</p>
      </main>
    );
  }

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await updateEmail(user, newEmail);
      setMessage('Email successfully updated!');
    } catch (err: any) {
      setMessage(err.message);
    }

    setLoading(false);
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = confirm('Are you sure? This cannot be undone.');
    if (!confirmDelete) return;

    setLoading(true);
    setMessage(null);

    try {
      await deleteUser(user);
      router.push('/signup');
    } catch (err: any) {
      setMessage(err.message);
    }

    setLoading(false);
  };

  return (
    <main className='min-h-dvh flex items-center justify-center p-6'>
      <div className='card-paper w-full max-w-md p-8 rounded-xl'>
        <h1 className='text-3xl font-serif font-bold text-center mb-6'>
          User Settings
        </h1>

        <form onSubmit={handleEmailUpdate} className='space-y-4'>
          <label className='text-sm font-semibold text-muted'>New Email</label>
          <input
            type='email'
            placeholder='new email'
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className='w-full p-2 rounded border bg-transparent'
          />

          <button
            type='submit'
            disabled={loading}
            className='btn bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white w-full'
          >
            {loading ? 'Updating...' : 'Update Email'}
          </button>
        </form>

        <button
          onClick={handleDeleteAccount}
          className='btn bg-red-600 hover:bg-red-700 text-white w-full mt-6'
        >
          Delete My Account
        </button>

        {message && (
          <p className='mt-4 text-center text-muted text-sm'>{message}</p>
        )}
      </div>
    </main>
  );
}
