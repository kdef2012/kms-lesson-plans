import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore/lite';

const firebaseConfig = { projectId: 'studio-7414300225-756e1' };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function check() {
  const q = query(collection(db, 'exitTickets'));
  const snap = await getDocs(q);
  snap.docs.forEach(d => {
    const data = d.data();
    if (data.title.includes('9/21') || data.title.includes('9/23')) {
      console.log(`\n=== ${data.title} ===`);
      data.questions.slice(0, 3).forEach(q => console.log(q.text));
    }
  });
}
check();
