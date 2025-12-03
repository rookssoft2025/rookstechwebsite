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

const COLLECTION = "paperWritings";
const COUNTER_DOC = "counter";

// Clean data - remove non-serializable properties
const cleanPaperData = (data) => {
  const cleaned = { ...data };
  delete cleaned.renderRow;
  delete cleaned.expandContent;
  return cleaned;
};

// Get next paper ID
const getNextPaperId = async () => {
  const counterRef = doc(db, COLLECTION, COUNTER_DOC);
  const snap = await getDoc(counterRef);

  let count = 0;
  if (snap.exists()) {
    count = snap.data().count || 0;
  }

  count++;
  await setDoc(counterRef, { count }, { merge: true });

  return `PW-${String(count).padStart(3, "0")}`;
};

// Fetch papers (excluding deleted)
export const fetchPaperWritings = async () => {
  try {
    const q = query(
      collection(db, COLLECTION),
      where("isDeleted", "==", false)
    );
    const querySnap = await getDocs(q);

    const papers = [];
    querySnap.forEach((docSnap) => {
      if (docSnap.id !== COUNTER_DOC) {
        papers.push({ id: docSnap.id, ...docSnap.data() });
      }
    });

    return papers;
  } catch (err) {
    console.error("Error fetching papers:", err);
    return [];
  }
};

// Add new paper
export const addPaperWriting = async (paper) => {
  try {
    const newId = await getNextPaperId();
    const ref = doc(db, COLLECTION, newId);

    const cleanedPaper = cleanPaperData(paper);
    const newPaper = {
      ...cleanedPaper,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(ref, newPaper);

    return { id: newId, ...newPaper };
  } catch (err) {
    console.error("Error adding paper:", err);
    throw err;
  }
};

// Update paper
export const updatePaperWriting = async (updated) => {
  try {
    const { id, ...data } = updated;
    const cleanedData = cleanPaperData(data);
    const ref = doc(db, COLLECTION, id);

    await updateDoc(ref, {
      ...cleanedData,
      updatedAt: new Date(),
    });
  } catch (err) {
    console.error("Error updating paper:", err);
    throw err;
  }
};

// Soft delete
export const deletePaperWriting = async (id) => {
  try {
    const ref = doc(db, COLLECTION, id);
    await updateDoc(ref, {
      isDeleted: true,
      deletedAt: new Date(),
    });
  } catch (err) {
    console.error("Error deleting paper:", err);
    throw err;
  }
};
