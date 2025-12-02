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

const COLLECTION = "researchProposals";
const COUNTER_DOC = "counter";

// Clean data - remove non-serializable properties
const cleanProposalData = (data) => {
  const cleaned = { ...data };
  delete cleaned.renderRow;
  delete cleaned.expandContent;
  return cleaned;
};

// Get next proposal ID
const getNextProposalId = async () => {
  const counterRef = doc(db, COLLECTION, COUNTER_DOC);
  const snap = await getDoc(counterRef);

  let count = 0;
  if (snap.exists()) {
    count = snap.data().count || 0;
  }

  count++;
  await setDoc(counterRef, { count }, { merge: true });

  return `PT-${String(count).padStart(3, "0")}`;
};

// Fetch proposals (excluding deleted)
export const fetchProposals = async () => {
  try {
    const q = query(
      collection(db, COLLECTION),
      where("isDeleted", "==", false)
    );
    const querySnap = await getDocs(q);

    const proposals = [];
    querySnap.forEach((docSnap) => {
      if (docSnap.id !== COUNTER_DOC) {
        proposals.push({ id: docSnap.id, ...docSnap.data() });
      }
    });

    return proposals;
  } catch (err) {
    console.error("Error fetching proposals:", err);
    return [];
  }
};

// Add new proposal
export const addProposal = async (proposal) => {
  try {
    const newId = await getNextProposalId();
    const ref = doc(db, COLLECTION, newId);

    const cleanedProposal = cleanProposalData(proposal);
    const newProposal = {
      ...cleanedProposal,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(ref, newProposal);

    return { id: newId, ...newProposal };
  } catch (err) {
    console.error("Error adding proposal:", err);
    throw err;
  }
};

// Update proposal
export const updateProposal = async (updated) => {
  try {
    const { id, ...data } = updated;
    const cleanedData = cleanProposalData(data);
    const ref = doc(db, COLLECTION, id);

    await updateDoc(ref, {
      ...cleanedData,
      updatedAt: new Date(),
    });
  } catch (err) {
    console.error("Error updating proposal:", err);
    throw err;
  }
};

// Soft delete
export const deleteProposal = async (id) => {
  try {
    const ref = doc(db, COLLECTION, id);
    await updateDoc(ref, {
      isDeleted: true,
      deletedAt: new Date(),
    });
  } catch (err) {
    console.error("Error deleting proposal:", err);
    throw err;
  }
};
