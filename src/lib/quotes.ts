import { db } from './firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  increment,
  serverTimestamp,
  query,
  where,
} from 'firebase/firestore';

export async function getAllQuotes() {
  const ref = collection(db, 'quotes');
  const snap = await getDocs(ref);
  const quoteList = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

  return quoteList;
}

export async function addQuote(quote: string, author: string, userId?: string) {
  if (!userId) throw new Error('No user ID provided');

  const ref = collection(db, 'quotes');

  await addDoc(ref, {
    quote,
    author,
    likeCount: 0,
    userId,
    createdAt: serverTimestamp(),
  });
}

export async function deleteQuote(id: string) {
  const ref = doc(db, 'quotes', id);
  await deleteDoc(ref);
}

export async function updateQuote(
  id: string,
  newQuote: string,
  newAuthor: string,
) {
  const ref = doc(db, 'quotes', id);
  await updateDoc(ref, {
    quote: newQuote,
    author: newAuthor,
  });
}
export async function getUserQuotes(userId: string) {
  const ref = collection(db, 'quotes');
  const q = query(ref, where('userId', '==', userId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
export async function likeQuote(id: string) {
  const ref = doc(db, 'quotes', id);
  await updateDoc(ref, {
    likeCount: increment(1),
  });
}
