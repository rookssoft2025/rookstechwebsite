import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

// Collections mapping to teams - SIMPLIFIED
const COLLECTIONS = {
  coding: {
    name: "Coding Team",
    key: "coding",
    collection: "codingProjects",  // This is correct
    statusField: "status",
  },
  proposal: {
    name: "Proposal Team",
    key: "proposal",
    collection: "researchProposals",
    statusField: "status",
  },
  journal: {
    name: "Journal Team",
    key: "journal",
    collection: "journals",
    statusField: "status",
  },
  writing: {
    name: "Writing Team",
    key: "writing",
    collection: "paperWritings",  // This is correct
    statusField: "status",
  },
};

// Simple function to check if status is completed
function isCompleted(statusVal) {
  if (!statusVal) return false;
  const s = String(statusVal).toLowerCase();
  return s === "completed" || s === "complete" || s === "done" || s === "published";
}

// Fetch ALL documents from a collection (no date filtering)
async function fetchAllDocs(collectionName) {
  try {
    console.log(`🔍 Fetching ALL documents from collection: "${collectionName}"`);
    
    // Query to get non-deleted documents
    const q = query(collection(db, collectionName), where("isDeleted", "==", false));
    const snapshot = await getDocs(q);
    
    console.log(`📊 Found ${snapshot.size} documents in "${collectionName}"`);
    
    const documents = [];
    snapshot.forEach((doc) => {
      // Skip the counter document if it exists
      if (doc.id === "counter") return;
      
      const data = doc.data();
      documents.push({
        id: doc.id,
        ...data
      });
      
      // Log first few documents for debugging
      if (documents.length <= 3) {
        console.log(`📄 Document ${doc.id}:`, {
          id: doc.id,
          title: data.title || data.projectName || data.name || 'No title',
          status: data.status || 'No status',
          hasData: Object.keys(data).length > 0
        });
      }
    });
    
    return documents;
  } catch (error) {
    console.error(`❌ Error fetching from ${collectionName}:`, error);
    return [];
  }
}

// Process team data - SIMPLE version
function processTeamData(items, teamConfig) {
  console.log(`🔄 Processing ${teamConfig.name}: ${items.length} items`);
  
  const total = items.length;
  const completed = items.filter(item => isCompleted(item[teamConfig.statusField])).length;
  const active = total - completed;
  
  return {
    teamName: teamConfig.name,
    total,
    active,
    completed,
    createdInPeriod: total,        // Show total count
    finishedInPeriod: completed,   // Show completed count
    itemsInPeriod: items           // Show ALL items
  };
}

// Main function to get all team reports
export async function getAllTeamReports() {
  console.log("🚀 Starting to fetch ALL team reports");
  
  try {
    // Fetch all teams in parallel
    const [codingData, proposalData, journalData, writingData] = await Promise.all([
      fetchAllDocs(COLLECTIONS.coding.collection),
      fetchAllDocs(COLLECTIONS.proposal.collection),
      fetchAllDocs(COLLECTIONS.journal.collection),
      fetchAllDocs(COLLECTIONS.writing.collection)
    ]);
    
    console.log("\n📈 Data Summary:");
    console.log(`   Coding Team (${COLLECTIONS.coding.collection}): ${codingData.length} items`);
    console.log(`   Writing Team (${COLLECTIONS.writing.collection}): ${writingData.length} items`);
    console.log(`   Proposal Team: ${proposalData.length} items`);
    console.log(`   Journal Team: ${journalData.length} items`);
    
    // Process each team's data
    const coding = processTeamData(codingData, COLLECTIONS.coding);
    const proposal = processTeamData(proposalData, COLLECTIONS.proposal);
    const journal = processTeamData(journalData, COLLECTIONS.journal);
    const writing = processTeamData(writingData, COLLECTIONS.writing);
    
    // Calculate overall totals
    const overallTotals = {
      total: coding.total + proposal.total + journal.total + writing.total,
      active: coding.active + proposal.active + journal.active + writing.active,
      completed: coding.completed + proposal.completed + journal.completed + writing.completed,
      createdInPeriod: coding.total + proposal.total + journal.total + writing.total,
      finishedInPeriod: coding.completed + proposal.completed + journal.completed + writing.completed
    };
    
    console.log("\n✅ Report generation complete!");
    console.log("   Overall totals:", overallTotals);
    
    return {
      period: "All Time Data",  // No date range
      teams: { coding, proposal, journal, writing },
      overall: { totals: overallTotals }
    };
    
  } catch (error) {
    console.error("❌ Failed to generate reports:", error);
    throw error;
  }
}

// Compatible functions for your frontend
export async function getWeeklyReports() {
  return getAllTeamReports();
}

export async function getMonthlyReports() {
  return getAllTeamReports();
}

export async function getYearlyReports() {
  return getAllTeamReports();
}

export async function getCustomReports(startDate, endDate) {
  // Just return all data regardless of dates
  return getAllTeamReports();
}

export async function getReportsByRange(startDate, endDate) {
  // Just return all data regardless of dates
  return getAllTeamReports();
}