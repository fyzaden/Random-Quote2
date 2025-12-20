import { db } from './firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

export async function getAllUsers() {
  const ref = collection(db, 'users');
  const snap = await getDocs(ref);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function setAdmin(userId: string, isAdmin: boolean) {
  const ref = doc(db, 'users', userId);
  await updateDoc(ref, { admin: isAdmin });
}
