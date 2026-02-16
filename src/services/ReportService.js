import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

// Collections mapping to teams
const COLLECTIONS = {
  coding: {
    name: "Coding Team",
    key: "coding",
    collection: "codingProjects",
    statusField: "status",
    dateField: "startDate",
    completedField: "deadline",
  },
  proposal: {
    name: "Proposal Team",
    key: "proposal",
    collection: "researchProposals",
    statusField: "status",
    dateField: "startDate",
    completedField: "endDate",
  },
  journal: {
    name: "Journal Team",
    key: "journal",
    collection: "journals",
    statusField: "status",
    dateField: "uploadedDate",
    completedField: "dateOfReview",
  },
  writing: {
    name: "Writing Team",
    key: "writing",
    collection: "paperWritings",
    statusField: "status",
    dateField: "createdAt",
    completedField: "deadline",
  },
};

// Helper function to check if status is completed
function isCompleted(statusVal) {
  if (!statusVal) return false;
  const s = String(statusVal).toLowerCase();
  return (
    s === "completed" ||
    s === "complete" ||
    s === "done" ||
    s === "published" ||
    s === "approved" ||
    s === "accepted"
  );
}

// Helper function to check if status is active
function isActive(statusVal) {
  if (!statusVal) return true; // Default to active if no status
  const s = String(statusVal).toLowerCase();
  return (
    s === "active" ||
    s === "in progress" ||
    s === "ongoing" ||
    s === "started" ||
    s === "hold" ||
    s === "draft" ||
    s === "under review" ||
    s === "submitted"
  );
}

// Helper function to get date from various fields
function getDateFromItem(item, teamConfig) {
  // Try completed date first, then creation date
  const dateFields = [teamConfig.dateField, teamConfig.completedField];
  
  for (const field of dateFields) {
    if (item[field]) {
      const dateValue = item[field];
      try {
        if (dateValue && dateValue.seconds) {
          return new Date(dateValue.seconds * 1000);
        } else if (dateValue instanceof Date) {
          return dateValue;
        } else if (typeof dateValue === 'string') {
          // Handle ISO string or date string
          const parsed = new Date(dateValue);
          if (!isNaN(parsed.getTime())) return parsed;
        } else if (typeof dateValue === 'number') {
          return new Date(dateValue);
        }
      } catch (error) {
        console.warn(`Failed to parse date field ${field}:`, dateValue);
        continue;
      }
    }
  }

  // Fallback: no valid date
  return null;
}

// Helper to check if date is within range
function isDateInRange(date, startDate, endDate) {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) return false;

  if (!startDate && !endDate) return true;
  if (startDate && !endDate) return date >= startDate;
  if (!startDate && endDate) return date <= endDate;
  return date >= startDate && date <= endDate;
}

// Convert Firestore timestamp to date string for frontend
function convertToDateString(timestamp) {
  if (!timestamp) return null;
  
  if (timestamp.seconds) {
    return new Date(timestamp.seconds * 1000).toISOString();
  } else if (timestamp instanceof Date) {
    return timestamp.toISOString();
  } else if (typeof timestamp === 'string') {
    return timestamp;
  } else if (typeof timestamp === 'number') {
    return new Date(timestamp).toISOString();
  }
  
  return null;
}

// Fetch documents with date filtering
async function fetchDocsWithDateFilter(
  collectionName,
  teamConfig,
  startDate = null,
  endDate = null
) {
  try {
    const baseQuery = query(collection(db, collectionName));
    const snapshot = await getDocs(baseQuery);

    const allDocuments = [];
    const documentsInRange = [];

    snapshot.forEach((docSnap) => {
      if (docSnap.id === "counter") return;

      const data = docSnap.data();
      // Skip explicitly deleted documents; include docs where isDeleted is undefined or false
      if (data && data.isDeleted === true) {
        return;
      }
      
      // Prepare the document with proper date formatting
      const docWithId = {
        id: docSnap.id,
        ...data,
        // Convert timestamps to ISO strings for frontend
        startDate: data.startDate ? convertToDateString(data.startDate) : null,
        endDate: data.endDate ? convertToDateString(data.endDate) : null,
        deadline: data.deadline ? convertToDateString(data.deadline) : null,
        uploadedDate: data.uploadedDate ? convertToDateString(data.uploadedDate) : null,
        dateOfReview: data.dateOfReview ? convertToDateString(data.dateOfReview) : null,
        createdAt: data.createdAt ? convertToDateString(data.createdAt) : null,
        updatedAt: data.updatedAt ? convertToDateString(data.updatedAt) : null,
        deletedAt: data.deletedAt ? convertToDateString(data.deletedAt) : null,
      };

      allDocuments.push(docWithId);

      const docDate = getDateFromItem(data, teamConfig);
      if (isDateInRange(docDate, startDate, endDate)) {
        documentsInRange.push(docWithId);
      }
    });

    return {
      all: allDocuments,
      filtered: documentsInRange,
    };
  } catch (error) {
    console.error(`❌ Error fetching from ${collectionName}:`, error);
    return { all: [], filtered: [] };
  }
}

// Process team data with date filtering
function processTeamData(items, itemsInPeriod, teamConfig, startDate, endDate) {
  const total = items.length;
  
  // Calculate active and completed based on status
  const completed = items.filter((item) =>
    isCompleted(item[teamConfig.statusField])
  ).length;
  
  const active = items.filter((item) =>
    isActive(item[teamConfig.statusField])
  ).length;

  const createdInPeriod = itemsInPeriod.length;

  // Finished in period = completed items whose completedField date is inside range
  const finishedInPeriod = items.filter((item) => {
    if (!isCompleted(item[teamConfig.statusField])) return false;
    
    // Get the completion date
    let completedDate = null;
    if (item[teamConfig.completedField]) {
      const dateValue = item[teamConfig.completedField];
      if (dateValue && dateValue.seconds) {
        completedDate = new Date(dateValue.seconds * 1000);
      } else if (dateValue instanceof Date) {
        completedDate = dateValue;
      } else if (typeof dateValue === 'string' || typeof dateValue === 'number') {
        completedDate = new Date(dateValue);
      }
    }

    return isDateInRange(completedDate, startDate, endDate);
  }).length;

  // Format itemsInPeriod for frontend consumption
  const formattedItems = itemsInPeriod.map(item => ({
    id: item.id,
    title: item.title || item.projectName || item.proposalTitle || item.paperTitle || item.journalTitle || item.documentTitle || "Untitled",
    details: item.details || item.description || item.abstract || "",
    status: item[teamConfig.statusField] || "Active",
    takenBy: item.takenBy || item.assignedTo || item.author || item.createdBy || item.assignee || item.uploadedBy || item.responsiblePerson || "Unassigned",
    
    // Date fields based on team type
    ...(teamConfig.key === 'coding' && {
      startDate: item.startDate,
      deadline: item.deadline || item.endDate,
    }),
    ...(teamConfig.key === 'proposal' && {
      startDate: item.startDate,
      endDate: item.endDate,
    }),
    ...(teamConfig.key === 'journal' && {
      uploadedDate: item.uploadedDate,
      dateOfReview: item.dateOfReview,
    }),
    ...(teamConfig.key === 'writing' && {
      startDate: item.startDate || item.createdAt,
      deadline: item.deadline || item.endDate,
    }),
    
    // Original data for debugging
    ...item,
  }));

  return {
    total: Number(total || 0),
    active: Number(active || 0),
    completed: Number(completed || 0),
    createdInPeriod: Number(createdInPeriod || 0),
    finishedInPeriod: Number(finishedInPeriod || 0),
    itemsInPeriod: formattedItems, // only items within the date range, formatted
  };
}

// Get date range for different time periods
function getDateRangeForPeriod(period, year = null, month = null) {
  const now = new Date();
  let startDate, endDate;

  switch (period) {
    case "weekly":
      startDate = new Date(now);
      startDate.setDate(now.getDate() - now.getDay());
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
      break;

    case "monthly":
      if (month !== null && year !== null) {
        startDate = new Date(year, month, 1);
        endDate = new Date(year, month + 1, 0);
        endDate.setHours(23, 59, 59, 999);
      } else {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        endDate.setHours(23, 59, 59, 999);
      }
      break;

    case "yearly":
      startDate = new Date(now.getFullYear(), 0, 1);
      endDate = new Date(now.getFullYear(), 11, 31);
      endDate.setHours(23, 59, 59, 999);
      break;

    default:
      return { startDate: null, endDate: null };
  }

  return { startDate, endDate };
}

// Format period string for display
function getPeriodString(period, year = null, month = null) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  switch (period) {
    case "weekly": {
      const now = new Date();
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      return `${startOfWeek.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })} - ${endOfWeek.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}`;
    }

    case "monthly":
      if (month !== null && year !== null) {
        return `${months[month]} ${year}`;
      }
      return `${months[new Date().getMonth()]} ${new Date().getFullYear()}`;

    case "yearly":
      return `${new Date().getFullYear()}`;

    case "custom":
      return "Custom Date Range";

    default:
      return "All Time Data";
  }
}

// Main function to get reports with date filtering
export async function getReportsByDateRange(
  startDate = null,
  endDate = null,
  period = null
) {
  try {
    console.log(`📊 Fetching reports for period: ${period || 'custom'}`);
    console.log(`📅 Start Date: ${startDate}, End Date: ${endDate}`);

    const [codingResult, proposalResult, journalResult, writingResult] =
      await Promise.all([
        fetchDocsWithDateFilter(
          COLLECTIONS.coding.collection,
          COLLECTIONS.coding,
          startDate,
          endDate
        ),
        fetchDocsWithDateFilter(
          COLLECTIONS.proposal.collection,
          COLLECTIONS.proposal,
          startDate,
          endDate
        ),
        fetchDocsWithDateFilter(
          COLLECTIONS.journal.collection,
          COLLECTIONS.journal,
          startDate,
          endDate
        ),
        fetchDocsWithDateFilter(
          COLLECTIONS.writing.collection,
          COLLECTIONS.writing,
          startDate,
          endDate
        ),
      ]);

    console.log('📋 Raw results counts:', {
      coding: { all: codingResult.all.length, filtered: codingResult.filtered.length },
      proposal: { all: proposalResult.all.length, filtered: proposalResult.filtered.length },
      journal: { all: journalResult.all.length, filtered: journalResult.filtered.length },
      writing: { all: writingResult.all.length, filtered: writingResult.filtered.length },
    });

    const coding = processTeamData(
      codingResult.all,
      codingResult.filtered,
      COLLECTIONS.coding,
      startDate,
      endDate
    );
    const proposal = processTeamData(
      proposalResult.all,
      proposalResult.filtered,
      COLLECTIONS.proposal,
      startDate,
      endDate
    );
    const journal = processTeamData(
      journalResult.all,
      journalResult.filtered,
      COLLECTIONS.journal,
      startDate,
      endDate
    );
    const writing = processTeamData(
      writingResult.all,
      writingResult.filtered,
      COLLECTIONS.writing,
      startDate,
      endDate
    );

    console.log('✅ Processed team data:', {
      coding: { total: coding.total, itemsCount: coding.itemsInPeriod.length },
      proposal: { total: proposal.total, itemsCount: proposal.itemsInPeriod.length },
      journal: { total: journal.total, itemsCount: journal.itemsInPeriod.length },
      writing: { total: writing.total, itemsCount: writing.itemsInPeriod.length },
    });

    const overallTotals = {
      total: coding.total + proposal.total + journal.total + writing.total,
      active: coding.active + proposal.active + journal.active + writing.active,
      completed:
        coding.completed +
        proposal.completed +
        journal.completed +
        writing.completed,
      createdInPeriod:
        coding.createdInPeriod +
        proposal.createdInPeriod +
        journal.createdInPeriod +
        writing.createdInPeriod,
      finishedInPeriod:
        coding.finishedInPeriod +
        proposal.finishedInPeriod +
        journal.finishedInPeriod +
        writing.finishedInPeriod,
    };

    const result = {
      period: period
        ? getPeriodString(
            period,
            startDate?.getFullYear(),
            startDate?.getMonth()
          )
        : startDate && endDate
        ? `${startDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })} - ${endDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}`
        : "All Time Data",
      teams: {
        coding,
        proposal,
        journal,
        writing,
      },
      overall: { totals: overallTotals },
    };

    console.log('📤 Final result period:', result.period);
    console.log('📤 Teams structure check:', {
      coding: result.teams.coding ? '✓' : '✗',
      proposal: result.teams.proposal ? '✓' : '✗',
      journal: result.teams.journal ? '✓' : '✗',
      writing: result.teams.writing ? '✓' : '✗',
    });

    return result;
  } catch (error) {
    console.error("❌ Failed to generate reports:", error);
    throw error;
  }
}

// Weekly reports
export async function getWeeklyReports() {
  const { startDate, endDate } = getDateRangeForPeriod("weekly");
  return getReportsByDateRange(startDate, endDate, "weekly");
}

// Monthly reports - specific month or current month
export async function getMonthlyReports(year = null, month = null) {
  const { startDate, endDate } = getDateRangeForPeriod("monthly", year, month);
  return getReportsByDateRange(startDate, endDate, "monthly");
}

// Yearly reports
export async function getYearlyReports() {
  const { startDate, endDate } = getDateRangeForPeriod("yearly");
  return getReportsByDateRange(startDate, endDate, "yearly");
}

// Custom date range
export async function getCustomReports(startDateStr, endDateStr) {
  const startDate = startDateStr ? new Date(startDateStr) : null;
  const endDate = endDateStr ? new Date(endDateStr) : null;

  if (startDate) startDate.setHours(0, 0, 0, 0);
  if (endDate) endDate.setHours(23, 59, 59, 999);

  return getReportsByDateRange(startDate, endDate, "custom");
}

// For month picker
export async function getMonthlyReportsByMonth(year, month) {
  const monthIndex = month - 1;
  return getMonthlyReports(year, monthIndex);
}

// Legacy
export async function getAllTeamReports() {
  return getReportsByDateRange(null, null, null);
}

export async function getReportsByRange(startDate, endDate) {
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  if (start) start.setHours(0, 0, 0, 0);
  if (end) end.setHours(23, 59, 59, 999);

  return getReportsByDateRange(start, end, "custom");
}