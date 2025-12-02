import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const COLLECTION = "researchProposals";
const DOC_ID = "PT-main";

// Fetch proposals (excluding deleted)
export const fetchProposals = async () => {
  const ref = doc(db, COLLECTION, DOC_ID);
  const snap = await getDoc(ref);

  if (!snap.exists()) return [];

  const arr = snap.data().proposals || [];
  return arr.filter((p) => !p.isDeleted);
};

// Add new proposal
export const addProposal = async (proposal) => {
  const ref = doc(db, COLLECTION, DOC_ID);
  const snap = await getDoc(ref);

  let existing = [];
  if (snap.exists()) existing = snap.data().proposals;

  const newProposal = {
    id: `PT-${existing.length + 1}`,
    ...proposal,
    isDeleted: false,
  };

  await setDoc(ref, { proposals: [...existing, newProposal] });

  return newProposal;
};

// Update proposal
export const updateProposal = async (updated) => {
  const ref = doc(db, COLLECTION, DOC_ID);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const updatedList = snap.data().proposals.map((p) =>
    p.id === updated.id ? updated : p
  );

  await updateDoc(ref, { proposals: updatedList });
};

// Soft delete
export const deleteProposal = async (id) => {
  const ref = doc(db, COLLECTION, DOC_ID);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const updatedList = snap.data().proposals.map((p) =>
    p.id === id ? { ...p, isDeleted: true } : p
  );

  await updateDoc(ref, { proposals: updatedList });
};
