'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { deleteQuote, getAllQuotes } from '@/lib/quotes';
import { useAuth } from '@/context/AuthContext';

export default function DeleteQuotePage() {
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  useEffect(() => {
    async function run() {
      if (!user) return;

      const all = await getAllQuotes();
      const q = all.find((x) => x.id === id) as
        | { id: string; userId: string }
        | undefined;

      if (!q || q.userId !== user.uid) {
        router.push('/my-quotes');
        return;
      }

      await deleteQuote(id);
      router.push('/my-quotes');
    }
    run();
  }, [user]);

  return (
    <main className='min-h-dvh flex items-center justify-center'>
      <div className='text-center text-muted animate-pulse'>
        Deleting your quote...
      </div>
    </main>
  );
}
