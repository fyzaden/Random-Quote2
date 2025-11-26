import '../lib/firebase';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
  increment,
} from 'firebase/firestore';

const db = getFirestore();

export async function getAllQuotes() {
  const ref = collection(db, 'quotes');
  const snap = await getDocs(ref);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function addQuote(quote: string, author: string, userId: string) {
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

export async function likeQuote(id: string) {
  const ref = doc(db, 'quotes', id);
  await updateDoc(ref, {
    likeCount: increment(1),
  });
}
