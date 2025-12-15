import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

// Collections mapping to teams
const COLLECTIONS = {
  coding: {
    name: "Coding Team",
    key: "coding",
    collection: "codingProjects",
    statusField: "status",
    dateField: "createdAt", // Field to use for date filtering
    completedField: "completedAt" // Field to check for completion date
  },
  proposal: {
    name: "Proposal Team",
    key: "proposal",
    collection: "researchProposals",
    statusField: "status",
    dateField: "createdAt",
    completedField: "completedAt"
  },
  journal: {
    name: "Journal Team",
    key: "journal",
    collection: "journals",
    statusField: "status",
    dateField: "uploadedDate",
    completedField: "dateOfReview"
  },
  writing: {
    name: "Writing Team",
    key: "writing",
    collection: "paperWritings",
    statusField: "status",
    dateField: "createdAt",
    completedField: "deadline"
  },
};

// Helper function to check if status is completed
function isCompleted(statusVal) {
  if (!statusVal) return false;
  const s = String(statusVal).toLowerCase();
  return s === "completed" || s === "complete" || s === "done" || s === "published";
}

// Helper function to get date from various fields
function getDateFromItem(item, teamConfig) {
  // Try completed date first, then creation date
  if (item[teamConfig.completedField]) {
    const completedDate = item[teamConfig.completedField];
    if (completedDate && completedDate.seconds) {
      return new Date(completedDate.seconds * 1000);
    } else if (completedDate instanceof Date) {
      return completedDate;
    } else if (typeof completedDate === 'string' || typeof completedDate === 'number') {
      return new Date(completedDate);
    }
  }
  
  if (item[teamConfig.dateField]) {
    const date = item[teamConfig.dateField];
    if (date && date.seconds) {
      return new Date(date.seconds * 1000);
    } else if (date instanceof Date) {
      return date;
    } else if (typeof date === 'string' || typeof date === 'number') {
      return new Date(date);
    }
  }
  
  // Fallback to current date
  return new Date();
}

// Helper to check if date is within range
function isDateInRange(date, startDate, endDate) {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) return false;
  
  // If no dates provided, include all
  if (!startDate && !endDate) return true;
  
  // Only start date provided
  if (startDate && !endDate) {
    return date >= startDate;
  }
  
  // Only end date provided
  if (!startDate && endDate) {
    return date <= endDate;
  }
  
  // Both dates provided
  return date >= startDate && date <= endDate;
}

// Fetch documents with date filtering
async function fetchDocsWithDateFilter(collectionName, teamConfig, startDate = null, endDate = null) {
  try {
    console.log(`🔍 Fetching from "${collectionName}"`);
    console.log(`   Date range: ${startDate ? startDate.toLocaleDateString() : 'None'} to ${endDate ? endDate.toLocaleDateString() : 'None'}`);
    
    // Query to get non-deleted documents
    const baseQuery = query(
      collection(db, collectionName), 
      where("isDeleted", "==", false)
    );
    
    const snapshot = await getDocs(baseQuery);
    console.log(`📊 Found ${snapshot.size} total documents in "${collectionName}"`);
    
    const allDocuments = [];
    const documentsInRange = [];
    
    snapshot.forEach((doc) => {
      if (doc.id === "counter") return;
      
      const data = doc.data();
      const docWithId = {
        id: doc.id,
        ...data
      };
      
      allDocuments.push(docWithId);
      
      // Check if document should be included based on date range
      const docDate = getDateFromItem(data, teamConfig);
      if (isDateInRange(docDate, startDate, endDate)) {
        documentsInRange.push(docWithId);
      }
    });
    
    console.log(`   Documents in date range: ${documentsInRange.length}`);
    
    // Return both all documents and filtered ones
    return {
      all: allDocuments,
      filtered: documentsInRange
    };
  } catch (error) {
    console.error(`❌ Error fetching from ${collectionName}:`, error);
    return { all: [], filtered: [] };
  }
}

// Process team data with date filtering
function processTeamData(items, itemsInPeriod, teamConfig) {
  console.log(`🔄 Processing ${teamConfig.name}:`);
  console.log(`   Total items: ${items.length}`);
  console.log(`   Items in period: ${itemsInPeriod.length}`);
  
  // Overall totals from all items
  const total = items.length;
  const completed = items.filter(item => isCompleted(item[teamConfig.statusField])).length;
  const active = total - completed;
  
  // Items created/completed in the period
  const createdInPeriod = itemsInPeriod.length;
  const finishedInPeriod = itemsInPeriod.filter(item => 
    isCompleted(item[teamConfig.statusField]) && 
    isDateInRange(getDateFromItem(item, teamConfig), null, null) // Check if completed in period
  ).length;
  
  return {
    teamName: teamConfig.name,
    total,
    active,
    completed,
    createdInPeriod,
    finishedInPeriod,
    itemsInPeriod // Only items within the date range
  };
}

// Get date range for different time periods
function getDateRangeForPeriod(period, year = null, month = null) {
  const now = new Date();
  let startDate, endDate;
  
  switch(period) {
    case 'weekly':
      // Get start of current week (Sunday)
      startDate = new Date(now);
      startDate.setDate(now.getDate() - now.getDay());
      startDate.setHours(0, 0, 0, 0);
      
      // Get end of current week (Saturday)
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
      break;
      
    case 'monthly':
      // If specific month/year provided
      if (month !== null && year !== null) {
        startDate = new Date(year, month, 1);
        endDate = new Date(year, month + 1, 0);
        endDate.setHours(23, 59, 59, 999);
      } else {
        // Current month
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        endDate.setHours(23, 59, 59, 999);
      }
      break;
      
    case 'yearly':
      // Current year
      startDate = new Date(now.getFullYear(), 0, 1);
      endDate = new Date(now.getFullYear(), 11, 31);
      endDate.setHours(23, 59, 59, 999);
      break;
      
    default:
      // No date range - get all data
      return { startDate: null, endDate: null };
  }
  
  return { startDate, endDate };
}

// Format period string for display
function getPeriodString(period, year = null, month = null) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  switch(period) {
    case 'weekly':
      const now = new Date();
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      
    case 'monthly':
      if (month !== null && year !== null) {
        return `${months[month]} ${year}`;
      }
      return `${months[new Date().getMonth()]} ${new Date().getFullYear()}`;
      
    case 'yearly':
      return `${new Date().getFullYear()}`;
      
    default:
      return "All Time Data";
  }
}

// Main function to get reports with date filtering
export async function getReportsByDateRange(startDate = null, endDate = null, period = null) {
  console.log("🚀 Starting to fetch team reports with date filtering");
  console.log(`   Period: ${period || 'custom'}`);
  console.log(`   Start Date: ${startDate ? startDate.toLocaleDateString() : 'None'}`);
  console.log(`   End Date: ${endDate ? endDate.toLocaleDateString() : 'None'}`);
  
  try {
    // Fetch all teams in parallel
    const [codingResult, proposalResult, journalResult, writingResult] = await Promise.all([
      fetchDocsWithDateFilter(COLLECTIONS.coding.collection, COLLECTIONS.coding, startDate, endDate),
      fetchDocsWithDateFilter(COLLECTIONS.proposal.collection, COLLECTIONS.proposal, startDate, endDate),
      fetchDocsWithDateFilter(COLLECTIONS.journal.collection, COLLECTIONS.journal, startDate, endDate),
      fetchDocsWithDateFilter(COLLECTIONS.writing.collection, COLLECTIONS.writing, startDate, endDate)
    ]);
    
    console.log("\n📈 Data Summary:");
    console.log(`   Coding Team: ${codingResult.all.length} total, ${codingResult.filtered.length} in period`);
    console.log(`   Writing Team: ${writingResult.all.length} total, ${writingResult.filtered.length} in period`);
    console.log(`   Proposal Team: ${proposalResult.all.length} total, ${proposalResult.filtered.length} in period`);
    console.log(`   Journal Team: ${journalResult.all.length} total, ${journalResult.filtered.length} in period`);
    
    // Process each team's data
    const coding = processTeamData(codingResult.all, codingResult.filtered, COLLECTIONS.coding);
    const proposal = processTeamData(proposalResult.all, proposalResult.filtered, COLLECTIONS.proposal);
    const journal = processTeamData(journalResult.all, journalResult.filtered, COLLECTIONS.journal);
    const writing = processTeamData(writingResult.all, writingResult.filtered, COLLECTIONS.writing);
    
    // Calculate overall totals
    const overallTotals = {
      total: coding.total + proposal.total + journal.total + writing.total,
      active: coding.active + proposal.active + journal.active + writing.active,
      completed: coding.completed + proposal.completed + journal.completed + writing.completed,
      createdInPeriod: coding.createdInPeriod + proposal.createdInPeriod + journal.createdInPeriod + writing.createdInPeriod,
      finishedInPeriod: coding.finishedInPeriod + proposal.finishedInPeriod + journal.finishedInPeriod + writing.finishedInPeriod
    };
    
    console.log("\n✅ Report generation complete!");
    console.log("   Overall totals:", overallTotals);
    
    return {
      period: period ? getPeriodString(period, startDate?.getFullYear(), startDate?.getMonth()) : 
              (startDate && endDate ? 
                `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}` : 
                "All Time Data"),
      teams: { coding, proposal, journal, writing },
      overall: { totals: overallTotals }
    };
    
  } catch (error) {
    console.error("❌ Failed to generate reports:", error);
    throw error;
  }
}

// Weekly reports
export async function getWeeklyReports() {
  const { startDate, endDate } = getDateRangeForPeriod('weekly');
  return getReportsByDateRange(startDate, endDate, 'weekly');
}

// Monthly reports - specific month or current month
export async function getMonthlyReports(year = null, month = null) {
  const { startDate, endDate } = getDateRangeForPeriod('monthly', year, month);
  return getReportsByDateRange(startDate, endDate, 'monthly');
}

// Yearly reports
export async function getYearlyReports() {
  const { startDate, endDate } = getDateRangeForPeriod('yearly');
  return getReportsByDateRange(startDate, endDate, 'yearly');
}

// Custom date range
export async function getCustomReports(startDateStr, endDateStr) {
  const startDate = startDateStr ? new Date(startDateStr) : null;
  const endDate = endDateStr ? new Date(endDateStr) : null;
  
  // Set time to beginning of day for start, end of day for end
  if (startDate) startDate.setHours(0, 0, 0, 0);
  if (endDate) endDate.setHours(23, 59, 59, 999);
  
  return getReportsByDateRange(startDate, endDate, 'custom');
}

// Get monthly reports by specific month (for the month picker)
export async function getMonthlyReportsByMonth(year, month) {
  // Convert month from 1-12 to 0-11 for JavaScript Date
  const monthIndex = month - 1;
  return getMonthlyReports(year, monthIndex);
}

// Legacy function for compatibility
export async function getAllTeamReports() {
  return getReportsByDateRange(null, null, null);
}

// Legacy function for compatibility
export async function getReportsByRange(startDate, endDate) {
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;
  
  if (start) start.setHours(0, 0, 0, 0);
  if (end) end.setHours(23, 59, 59, 999);
  
  return getReportsByDateRange(start, end, 'custom');
}