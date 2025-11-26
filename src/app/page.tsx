'use client';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import { Title, align } from '../components/Title';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { getAllQuotes, likeQuote } from '../lib/quotes';

export default function Home() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [liked, setLiked] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getAllQuotes();
      setQuotes(data);

      setCurrent(Math.floor(Math.random() * data.length));
    }
    load();
  }, []);

  if (quotes.length === 0) return <p>Loading...</p>;

  const q = quotes[current];
  async function handleLike() {
    if (liked.includes(q.id)) return;

    await likeQuote(q.id); // firestore update

    setQuotes((prev) =>
      prev.map((item) =>
        item.id === q.id
          ? { ...item, likeCount: (item.likeCount || 0) + 1 }
          : item,
      ),
    );

    setLiked([...liked, q.id]);
  }

  return (
    <main
      className='flex min-h-dvh items-center justify-center 
    bg-gradient-to-r from-amber-400 to-red-800 
  dark:from-slate-900 dark:to-black'
    >
      <Card>
        <div className='flex items-center gap-2 absolute top-4 right-4'>
          <button onClick={handleLike}>
            {liked.includes(q.id) ? (
              <FaHeart className='text-red-500 text-2xl transition-transform duration-300 hover:scale-125' />
            ) : (
              <FaRegHeart className='text-black text-2xl transition-transform duration-300 hover:scale-125' />
            )}
          </button>
          <span className='text-slate-800 font-medium'>{q.likeCount || 0}</span>
        </div>

        <Title label={q.quote} align={align.center} />

        <div className='text-end italic mt-4'>{q.author}</div>

        <button
          onClick={() => setCurrent(Math.floor(Math.random() * quotes.length))}
          className='bg-amber-900 text-white mt-4 p-2 rounded-lg'
        >
          New Quote
        </button>
      </Card>
    </main>
  );
}
