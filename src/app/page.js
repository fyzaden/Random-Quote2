'use client';
import { useState, useEffect } from 'react';
import { quotes } from '../../quotes.js';
import Card from '../components/Card.jsx';
import { Title, align } from '../components/Title.jsx';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export default function Home() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(null);
  const [quoteList, setQuoteList] = useState(quotes);
  const [likedQuotes, setLikedQuotes] = useState([]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuoteIndex(randomIndex);
  }, []);

  function handleSubmit() {
    const randomIndex = Math.floor(Math.random() * quoteList.length);
    setCurrentQuoteIndex(randomIndex);
  }

  function handleLike() {
    if (currentQuoteIndex === null) return;

    const updatedQuotes = [...quoteList];
    updatedQuotes[currentQuoteIndex].likeCount += 1;
    setQuoteList(updatedQuotes);

    if (!likedQuotes.includes(currentQuoteIndex)) {
      setLikedQuotes([...likedQuotes, currentQuoteIndex]);
    }
  }
  if (currentQuoteIndex === null) {
    return (
      <main className='flex min-h-dvh items-center justify-center bg-gray-100 dark:bg-slate-900'>
        <p className='text-gray-800 dark:text-gray-200 text-xl'>
          Loading quotes...
        </p>
      </main>
    );
  }
  const currentQuote = quoteList[currentQuoteIndex];

  return (
    <main
      className='flex min-h-dvh items-center justify-center 
    bg-gradient-to-r from-amber-400 to-red-800 
  dark:from-slate-900 dark:to-black'
    >
      <Card>
        <div className='flex items-center gap-2 absolute top-4 right-4'>
          {/* Like button */}
          <button onClick={handleLike}>
            {likedQuotes.includes(currentQuoteIndex) ? (
              <FaHeart className='text-red-500 text-2xl transition-transform duration-300 hover:scale-125' />
            ) : (
              <FaRegHeart className='text-black text-2xl transition-transform duration-300 hover:scale-125' />
            )}
          </button>
          <span className='text-slate-800 font-medium'>
            {currentQuote.likeCount}
          </span>
        </div>
        {/* Quote */}
        <Title label={currentQuote.quote} align={align.center} />

        <span className='text-end block mt-4 italic '>
          {currentQuote.author}
        </span>
        {/* New quote button*/}
        <button
          onClick={handleSubmit}
          className='bg-amber-900 hover:bg-amber-600 text-white rounded-lg py-2 mt-4 w-50 m-auto'
        >
          New Quote
        </button>
      </Card>
    </main>
  );
}
