'use client';

import { createContext, useState, useContext } from 'react';
import { quotes as quotesArray } from '../../quotes.js';

const QuotesContext = createContext(undefined);
const QuotesDispatchContext = createContext(undefined);

export const QuotesProvider = ({ children }) => {
  const [quotes, setQuotes] = useState([
    ...quotesArray,
    { quote: 'Dummy quote', author: 'Dummy quote author', likeCount: 0 },
  ]);

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  function handleUpdateQuotes(newQuote) {
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
export const useQuotesContext = () => useContext(QuotesContext);
export const useQuotesDispatchContext = () => useContext(QuotesDispatchContext);
