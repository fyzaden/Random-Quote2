'use client';

import { createContext, useState, useContext, ReactNode } from 'react';
import { quotes as quotesArray } from '../data/quotes';
import { Quote } from '../types/quote';

type QuotesContextType = {
  quotes: Quote[];
  currentQuoteIndex: number;
};

type QuotesDispatchType = {
  handleUpdateQuotes: (newQuote: Omit<Quote, 'likeCount'>) => void;
  setQuotes: React.Dispatch<React.SetStateAction<Quote[]>>;
  setCurrentQuoteIndex: React.Dispatch<React.SetStateAction<number>>;
};

const QuotesContext = createContext<QuotesContextType | undefined>(undefined);
const QuotesDispatchContext = createContext<QuotesDispatchType | undefined>(
  undefined,
);

export const QuotesProvider = ({ children }: { children: ReactNode }) => {
  const [quotes, setQuotes] = useState<Quote[]>([
    ...quotesArray.map((q) => ({
      quote: (q as any).quote,
      author: (q as any).author,

      likeCount: (q as any).likeCount ?? (q as any).likCount ?? 0,
    })),
    { quote: 'Dummy quote', author: 'Dummy quote author', likeCount: 0 },
  ]);

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number>(0);

  function handleUpdateQuotes(newQuote: Omit<Quote, 'likeCount'>) {
    setQuotes((prev) => [...prev, { ...newQuote, likeCount: 0 }]);
  }

  return (
    <QuotesContext.Provider value={{ quotes, currentQuoteIndex }}>
      <QuotesDispatchContext.Provider
        value={{ handleUpdateQuotes, setQuotes, setCurrentQuoteIndex }}
      >
        {children}
      </QuotesDispatchContext.Provider>
    </QuotesContext.Provider>
  );
};
export const useQuotesContext = () => {
  const ctx = useContext(QuotesContext);
  if (!ctx) throw new Error('useQuotesContext must be inside Provider');
  return ctx;
};
export const useQuotesDispatchContext = () => {
  const ctx = useContext(QuotesDispatchContext);
  if (!ctx) throw new Error('useQuotesDispatchContext must be inside Provider');
  return ctx;
};
