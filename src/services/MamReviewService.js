import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

// Collections used across the app
const COLLECTIONS = {
  coding: "codingProjects",
  paper: "paperWritings",
  proposal: "researchProposals",
  journal: "journals",
};

// Normalize records from each collection to a unified shape the UI can consume
const normalizeTask = (collectionName, id, data) => {
  if (collectionName === COLLECTIONS.coding) {
    return {
      id,
      type: "coding",
      typeLabel: "Coding Project",
      title: data.title,
      assignedTo: data.takenBy,
      startDate: data.startDate || null,
      deadline: data.deadline || null,
      status: data.status || "Started",
      progress: data.progress || 0,
      details: data.details || "",
      resultsTaken: data.resultsTaken || 0,
      raw: data,
    };
  }
  if (collectionName === COLLECTIONS.paper) {
    return {
      id,
      type: "paper",
      typeLabel: "Paper Writing",
      title: data.title,
      assignedTo: data.takenBy,
      startDate: data.startDate || null,
      deadline: data.deadline || null,
      status: data.status || "Started",
      progress: data.progress || 0,
      details: data.details || "",
      raw: data,
    };
  }
  // proposal (updated schema: title, takenBy)
  return {
    id,
    type: "proposal",
    typeLabel: "Research Proposal",
    title: data.title || data.paperName,
    assignedTo: data.takenBy || data.proposalTakenBy,
    startDate: data.startDate || null,
    endDate: data.endDate || null,
    status: data.status || "Started",
    progress: data.progress || 0,
    details: data.details || "",
    raw: data,
  };
};

// Shared helper to fetch tasks from a collection for a given member
const fetchTasksByMemberFromCollection = async (collectionName, memberName) => {
  try {
    let qRef;
    if (collectionName === COLLECTIONS.coding) {
      qRef = query(
        collection(db, collectionName),
        where("isDeleted", "==", false),
        where("takenBy", "==", memberName)
      );
    } else if (collectionName === COLLECTIONS.paper) {
      qRef = query(
        collection(db, collectionName),
        where("isDeleted", "==", false),
        where("takenBy", "==", memberName)
      );
    } else if (collectionName === COLLECTIONS.proposal) {
      qRef = query(
        collection(db, collectionName),
        where("isDeleted", "==", false),
        where("takenBy", "==", memberName)
      );
    } else {
      return [];
    }

    const snap = await getDocs(qRef);
    if (snap.empty) return [];

    return snap.docs.map((d) => normalizeTask(collectionName, d.id, d.data()));
  } catch (err) {
    console.error(`Error fetching tasks from ${collectionName}:`, err);
    return [];
  }
};

// Public API: fetch all tasks for a member across coding, paper, and proposals
export const fetchAllByTeam = async () => {
  try {
    const [coding, papers, proposals, journals] = await Promise.all([
      (async () => {
        const qRef = query(collection(db, COLLECTIONS.coding), where("isDeleted", "==", false));
        const snap = await getDocs(qRef);
        return snap.docs.map((d) => normalizeTask(COLLECTIONS.coding, d.id, d.data()));
      })(),
      (async () => {
        const qRef = query(collection(db, COLLECTIONS.paper), where("isDeleted", "==", false));
        const snap = await getDocs(qRef);
        return snap.docs.map((d) => normalizeTask(COLLECTIONS.paper, d.id, d.data()));
      })(),
      (async () => {
        const qRef = query(collection(db, COLLECTIONS.proposal), where("isDeleted", "==", false));
        const snap = await getDocs(qRef);
        return snap.docs.map((d) => normalizeTask(COLLECTIONS.proposal, d.id, d.data()));
      })(),
      (async () => {
        const qRef = query(collection(db, COLLECTIONS.journal), where("isDeleted", "==", false));
        const snap = await getDocs(qRef);
        // Normalize journal shape: treat as type 'journal'
        return snap.docs.map((d) => ({
          id: d.id,
          type: "journal",
          typeLabel: "Journal Paper",
          title: d.data().title || d.data().paperTitle || d.data().name,
          assignedTo: d.data().takenBy || d.data().researcher,
          startDate: d.data().uploadedDate || d.data().startDate || null,
          endDate: d.data().dateOfReview || d.data().endDate || null,
          status: d.data().status || "Started",
          progress: d.data().progress || 0,
          details: d.data().details || "",
          raw: d.data(),
        }));
      })(),
    ]);

    return { coding, journals, papers, proposals };
  } catch (err) {
    console.error("Error fetching team works:", err);
    return { coding: [], journals: [], papers: [], proposals: [] };
  }
};

export const fetchMemberTasks = async (memberName) => {
  try {
    const [coding, papers, proposals] = await Promise.all([
      fetchTasksByMemberFromCollection(COLLECTIONS.coding, memberName),
      fetchTasksByMemberFromCollection(COLLECTIONS.paper, memberName),
      fetchTasksByMemberFromCollection(COLLECTIONS.proposal, memberName),
    ]);

    return {
      coding,
      papers,
      proposals,
      all: [...coding, ...papers, ...proposals],
    };
  } catch (err) {
    console.error("Error fetching member tasks:", err);
    return { coding: [], papers: [], proposals: [], all: [] };
  }
};

export const fetchMemberCodingTasks = async (memberName) =>
  fetchTasksByMemberFromCollection(COLLECTIONS.coding, memberName);

export const fetchMemberPaperTasks = async (memberName) =>
  fetchTasksByMemberFromCollection(COLLECTIONS.paper, memberName);

export const fetchMemberProposalTasks = async (memberName) =>
  fetchTasksByMemberFromCollection(COLLECTIONS.proposal, memberName);
