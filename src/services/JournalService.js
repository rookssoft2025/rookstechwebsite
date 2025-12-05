import { db } from "../firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const COLLECTION = "journals";
const COUNTER_DOC = "counter";

// Clean data - remove non-serializable properties
const cleanJournalData = (data) => {
  const cleaned = { ...data };
  delete cleaned.renderRow;
  delete cleaned.expandContent;
  return cleaned;
};

// Get next journal ID
const getNextJournalId = async () => {
  const counterRef = doc(db, COLLECTION, COUNTER_DOC);
  const snap = await getDoc(counterRef);

  let count = 0;
  if (snap.exists()) {
    count = snap.data().count || 0;
  }

  count++;
  await setDoc(counterRef, { count }, { merge: true });

  return `J-${String(count).padStart(3, "0")}`;
};

// Fetch journals (excluding deleted)
export const fetchJournals = async () => {
  try {
    const q = query(
      collection(db, COLLECTION),
      where("isDeleted", "==", false)
    );
    const querySnap = await getDocs(q);

    const journals = [];
    querySnap.forEach((docSnap) => {
      if (docSnap.id !== COUNTER_DOC) {
        journals.push({ id: docSnap.id, ...docSnap.data() });
      }
    });

    return journals;
  } catch (err) {
    console.error("Error fetching journals:", err);
    return [];
  }
};

// Add new journal
export const addJournal = async (journal) => {
  try {
    const newId = await getNextJournalId();
    const ref = doc(db, COLLECTION, newId);

    const cleanedJournal = cleanJournalData(journal);
    const newJournal = {
      ...cleanedJournal,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(ref, newJournal);

    return { id: newId, ...newJournal };
  } catch (err) {
    console.error("Error adding journal:", err);
    throw err;
  }
};

// Update journal
export const updateJournal = async (updated) => {
  try {
    const { id, ...data } = updated;
    const cleanedData = cleanJournalData(data);
    const ref = doc(db, COLLECTION, id);

    await updateDoc(ref, {
      ...cleanedData,
      updatedAt: new Date(),
    });
  } catch (err) {
    console.error("Error updating journal:", err);
    throw err;
  }
};

// Soft delete
export const deleteJournal = async (id) => {
  try {
    const ref = doc(db, COLLECTION, id);
    await updateDoc(ref, {
      isDeleted: true,
      deletedAt: new Date(),
    });
  } catch (err) {
    console.error("Error deleting journal:", err);
    throw err;
  }
};
