// services/CodingService.js
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
  orderBy,
} from "firebase/firestore";

const COLLECTION = "codingProjects";
const COUNTER_DOC = "counter";

const cleanCodingData = (data) => {
  const cleaned = { ...data };
  // Remove React-specific properties
  delete cleaned.renderRow;
  delete cleaned.expandContent;
  delete cleaned.progress;
  delete cleaned._projectData;
  delete cleaned.serial;
  // Also remove any undefined or null values
  Object.keys(cleaned).forEach(key => {
    if (cleaned[key] === undefined || cleaned[key] === null) {
      delete cleaned[key];
    }
  });
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
    // Create query with composite index requirements
    const q = query(
      collection(db, COLLECTION),
      where("isDeleted", "==", false),
      orderBy("createdAt", "desc")
    );
    
    const querySnap = await getDocs(q);

    const projects = [];
    querySnap.forEach((docSnap) => {
      if (docSnap.id !== COUNTER_DOC) {
        const data = docSnap.data();
        projects.push({ 
          id: docSnap.id, 
          ...data,
          // Ensure dates are in correct format
          startDate: data.startDate || "",
          deadline: data.deadline || "",
          resultsTaken: data.resultsTaken || 0
        });
      }
    });

    return projects;
  } catch (err) {
    console.error("Error fetching coding projects:", err);
    
    // If there's an index error, try a simpler query
    if (err.code === 'failed-precondition') {
      console.log("Trying alternative query...");
      try {
        // Try without the orderBy first
        const q2 = query(
          collection(db, COLLECTION),
          where("isDeleted", "==", false)
        );
        const querySnap2 = await getDocs(q2);
        
        const projects = [];
        querySnap2.forEach((docSnap) => {
          if (docSnap.id !== COUNTER_DOC) {
            const data = docSnap.data();
            projects.push({ 
              id: docSnap.id, 
              ...data,
              startDate: data.startDate || "",
              deadline: data.deadline || "",
              resultsTaken: data.resultsTaken || 0
            });
          }
        });
        
        // Sort manually by createdAt in JavaScript
        projects.sort((a, b) => {
          const dateA = new Date(a.createdAt || 0);
          const dateB = new Date(b.createdAt || 0);
          return dateB - dateA; // Descending
        });
        
        return projects;
      } catch (fallbackErr) {
        console.error("Fallback query also failed:", fallbackErr);
      }
    }
    
    return [];
  }
};

export const addCodingProject = async (project) => {
  try {
    const newId = await getNextCodingId();
    const ref = doc(db, COLLECTION, newId);

    // Clean the data before saving
    const cleaned = cleanCodingData(project);
    
    // Format dates properly
    const now = new Date().toISOString();
    const newProject = {
      ...cleaned,
      title: cleaned.title?.trim() || "",
      takenBy: cleaned.takenBy?.trim() || "",
      startDate: cleaned.startDate || "",
      deadline: cleaned.deadline || "",
      status: cleaned.status || "Started",
      resultsTaken: parseInt(cleaned.resultsTaken) || 0,
      details: cleaned.details?.trim() || "",
      isDeleted: false,
      createdAt: now,
      updatedAt: now,
    };

    await setDoc(ref, newProject);

    return { id: newId, ...newProject };
  } catch (err) {
    console.error("Error adding coding project:", err);
    throw new Error(`Failed to add project: ${err.message}`);
  }
};

export const updateCodingProject = async (updated) => {
  try {
    const { id, ...data } = updated;
    const cleaned = cleanCodingData(data);
    const ref = doc(db, COLLECTION, id);

    // Ensure required fields are present
    const updateData = {
      ...cleaned,
      title: cleaned.title?.trim() || "",
      takenBy: cleaned.takenBy?.trim() || "",
      resultsTaken: parseInt(cleaned.resultsTaken) || 0,
      updatedAt: new Date().toISOString(),
    };

    await updateDoc(ref, updateData);
    
    return { id, ...updateData };
  } catch (err) {
    console.error("Error updating coding project:", err);
    throw new Error(`Failed to update project: ${err.message}`);
  }
};

export const deleteCodingProject = async (id) => {
  try {
    const ref = doc(db, COLLECTION, id);
    await updateDoc(ref, {
      isDeleted: true,
      deletedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return true;
  } catch (err) {
    console.error("Error deleting coding project:", err);
    throw new Error(`Failed to delete project: ${err.message}`);
  }
};

// Simplified function to fetch research paper titles for dropdown
export const fetchResearchPaperTitles = async () => {
  try {
    // Simple query without where clause for now
    const q = query(collection(db, 'researchProposals'));
    const querySnap = await getDocs(q);
    const titles = [];
    
    querySnap.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.title && data.title.trim()) {
        titles.push({
          id: docSnap.id,
          title: data.title.trim(),
          status: data.status || 'unknown'
        });
      }
    });

    // Sort alphabetically
    titles.sort((a, b) => a.title.localeCompare(b.title));
    
    return titles;
  } catch (err) {
    console.error("Error fetching research paper titles:", err);
    return [];
  }
};