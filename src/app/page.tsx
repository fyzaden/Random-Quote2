'use client';

import { useEffect, useState } from 'react';
import Card from '../components/Card';
import { Title, align } from '../components/Title';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { getValidatedQuotes, likeQuote } from '../lib/quotes';

export default function Home() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [current, setCurrent] = useState<number | null>(null);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await getValidatedQuotes();

        if (!ignore) {
          setQuotes(data);
          if (data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            setCurrent(randomIndex);
          }
          setLoading(false);
        }
      } catch (err) {
        console.error('LOAD ERROR:', err);
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) return <p className='p-10'>Loading...</p>;
  if (!quotes.length || current === null)
    return <p className='p-10'>No quotes found.</p>;

  const q = quotes[current];
  const isLiked = likedIds.includes(q.id);

  async function handleLike() {
    try {
      await likeQuote(q.id);

      // UI Update
      setQuotes((prev) =>
        prev.map((item) =>
          item.id === q.id
            ? { ...item, likeCount: (item.likeCount || 0) + 1 }
            : item,
        ),
      );

      if (!isLiked) {
        setLikedIds((prev) => [...prev, q.id]);
      }
    } catch (err) {
      console.error('LIKE ERROR:', err);
    }
  }

  function handleNewQuote() {
    if (quotes.length <= 1) return;

    let index = Math.floor(Math.random() * quotes.length);

    while (index === current) {
      index = Math.floor(Math.random() * quotes.length);
    }

    setCurrent(index);
  }

  return (
    <main className='flex min-h-dvh items-center justify-center p-6 bg-[var(--bg)]'>
      <Card className='relative max-w-xl p-6'>
        <div className='flex items-center gap-2 absolute top-4 right-4'>
          <button onClick={handleLike}>
            {isLiked ? (
              <FaHeart className='text-red-500 text-2xl' />
            ) : (
              <FaRegHeart className='text-[var(--text)] text-2xl' />
            )}
          </button>

          <span className='font-medium text-[var(--text)]'>
            {q.likeCount || 0}
          </span>
        </div>

        <Title label={q.quote} align={align.center} />

        <div className='text-end italic mt-4 text-[var(--muted)]'>
          {q.author}
        </div>

        <button
          onClick={handleNewQuote}
          className='btn bg-[var(--accent)] hover:bg-[var(--accent-hover)] 
          text-white mt-4 w-full rounded-lg p-2'
        >
          New Quote
        </button>
      </Card>
    </main>
  );
}
