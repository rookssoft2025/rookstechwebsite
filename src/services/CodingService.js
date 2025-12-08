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

const COLLECTION = "codingProjects";
const COUNTER_DOC = "counter";

const cleanCodingData = (data) => {
  const cleaned = { ...data };
  delete cleaned.renderRow;
  delete cleaned.expandContent;
  delete cleaned.progress; 
  return cleaned;
};

const getNextCodingId = async () => {
  const counterRef = doc(db, COLLECTION, COUNTER_DOC);
  const snap = await getDoc(counterRef);

  let count = 0;
  if (snap.exists()) {
    count = snap.data().count || 0;
  }

  count++;
  await setDoc(counterRef, { count }, { merge: true });

  return `CD-${String(count).padStart(3, "0")}`;
};

export const fetchCodingProjects = async () => {
  try {
    const q = query(collection(db, COLLECTION), where("isDeleted", "==", false));
    const querySnap = await getDocs(q);

    const projects = [];
    querySnap.forEach((docSnap) => {
      if (docSnap.id !== COUNTER_DOC) {
        projects.push({ id: docSnap.id, ...docSnap.data() });
      }
    });

    return projects;
  } catch (err) {
    console.error("Error fetching coding projects:", err);
    return [];
  }
};

export const addCodingProject = async (project) => {
  try {
    const newId = await getNextCodingId();
    const ref = doc(db, COLLECTION, newId);

    const cleaned = cleanCodingData(project);
    const newProject = {
      ...cleaned,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(ref, newProject);

    return { id: newId, ...newProject };
  } catch (err) {
    console.error("Error adding coding project:", err);
    throw err;
  }
};

export const updateCodingProject = async (updated) => {
  try {
    const { id, ...data } = updated;
    const cleaned = cleanCodingData(data);
    const ref = doc(db, COLLECTION, id);

    await updateDoc(ref, {
      ...cleaned,
      updatedAt: new Date(),
    });
  } catch (err) {
    console.error("Error updating coding project:", err);
    throw err;
  }
};

export const deleteCodingProject = async (id) => {
  try {
    const ref = doc(db, COLLECTION, id);
    await updateDoc(ref, {
      isDeleted: true,
      deletedAt: new Date(),
    });
  } catch (err) {
    console.error("Error deleting coding project:", err);
    throw err;
  }
};
