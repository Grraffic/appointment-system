import { useState, useEffect, useCallback } from "react"; // Added useCallback
import dayjs from "dayjs";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_URL_EVENTS = import.meta.env.VITE_API_URL;

const useRegistrarHome = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [allFetchedHolidays, setAllFetchedHolidays] = useState([]);
  const [currentMonthCalendarHolidays, setCurrentMonthCalendarHolidays] =
    useState([]);
  const [allDashboardEvents, setAllDashboardEvents] = useState([]); // Raw events for this dashboard
  const [calendarDashboardEvents, setCalendarDashboardEvents] = useState({}); // Formatted for calendar

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const daysInMonth = currentDate.daysInMonth();
  const startOfMonth = currentDate.startOf("month").day();
  const monthName = currentDate.format("MMMM");
  const year = currentDate.year();

  const fetchEventsForDashboard = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL_EVENTS}/api/events`); // Fetch events
      setAllDashboardEvents(response.data);
    } catch (error) {
      console.error("Error fetching events for dashboard:", error);
      setAllDashboardEvents([]);
    }
  }, []);

  useEffect(() => {
    fetchEventsForDashboard();
  }, [fetchEventsForDashboard]);

  useEffect(() => {
    const formatted = {};
    allDashboardEvents.forEach((event) => {
      const startDate = dayjs(event.startDate);
      const endDate = dayjs(event.endDate);
      let currentDateIter = startDate;
      while (
        currentDateIter.isBefore(endDate) ||
        currentDateIter.isSame(endDate, "day")
      ) {
        const monthKey = currentDateIter.format("YYYY-MM");
        const day = currentDateIter.date();
        if (!formatted[monthKey]) {
          formatted[monthKey] = {};
        }
        // Event structure for RegistrarHome calendar
        // This might be simpler than the Events page if it's just a label
        formatted[monthKey][day] = {
          label: "Event", // Or event.title if you want more detail
          color: event.color || "bg-yellow-500", // Different default color for dashboard
        };
        currentDateIter = currentDateIter.add(1, "day");
      }
    });
    setCalendarDashboardEvents(formatted);
  }, [allDashboardEvents]);
  // Function to fetch all holidays from the backend
  const fetchAllHolidaysFromAPI = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/holidays`);
      const formattedBackendHolidays = response.data.map((h) => {
        let localDateStr = "";
        if (h.date) {
          try {
            const dateInput = h.date.includes("T")
              ? h.date
              : `${h.date}T00:00:00`;
            const dateObj = new Date(dateInput);
            const y = dateObj.getFullYear();
            const m = String(dateObj.getMonth() + 1).padStart(2, "0"); // Correct: Add 1
            const d = String(dateObj.getDate()).padStart(2, "0");
            localDateStr = `${y}-${m}-${d}`;
          } catch (e) {
            console.error(
              "Error parsing holiday date in useRegistrarHome:",
              h.date,
              e
            );
          }
        }
        return {
          id: h._id,
          date: localDateStr,
          name: h.description,
        };
      });
      setAllFetchedHolidays(formattedBackendHolidays);
    } catch (error) {
      console.error("Error fetching holidays for registrar home:", error);
      setAllFetchedHolidays([]);
    }
  }, []);

  useEffect(() => {
    fetchAllHolidaysFromAPI();
  }, [fetchAllHolidaysFromAPI]);

  useEffect(() => {
    if (allFetchedHolidays.length > 0) {
      const currentYearMonth = currentDate.format("YYYY-MM"); // e.g., "2023-12"
      const filtered = allFetchedHolidays.filter((holiday) => {
        // holiday.date is "YYYY-MM-DD"
        return holiday.date && holiday.date.startsWith(currentYearMonth);
      });
      setCurrentMonthCalendarHolidays(filtered);
    } else {
      setCurrentMonthCalendarHolidays([]);
    }
  }, [currentDate, allFetchedHolidays]);

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const isWeekend = (dayOfMonth) => {
    const dateToCheck = currentDate.date(dayOfMonth);
    const dayOfWeek = dateToCheck.day();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      const sidebar = document.querySelector(".sidebar-container");
      const toggleButton = document.querySelector(".sidebar-toggle-button");

      if (
        sidebar &&
        !sidebar.contains(e.target) &&
        !toggleButton?.contains(e.target) &&
        isSidebarOpen
      ) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);
  const [stats, setStats] = useState({
    APPROVED: 0,
    PENDING: 0,
    COMPLETED: 0,
    REJECTED: 0,
    total: 0,
    morning: {
      APPROVED: 0,
      PENDING: 0,
      COMPLETED: 0,
      REJECTED: 0,
    },
    afternoon: {
      APPROVED: 0,
      PENDING: 0,
      COMPLETED: 0,
      REJECTED: 0,
    },
  });

  // Create a fetchStats function that calculates stats from appointment data
  const fetchStats = useCallback(async () => {
    try {
      console.log("Fetching appointment data to calculate stats...");

      // Fetch appointments data directly (same as the appointments page does)
      const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

      // Get all appointment statuses
      const statusResponse = await axios.get(`${API_BASE_URL}/status`);
      const statusData = statusResponse.data;

      // Get student/booking data to get time information
      const studentsResponse = await axios.get(
        `${API_BASE_URL}/document-requests/docs-with-details`
      );
      const studentsData = studentsResponse.data;

      console.log("Raw status data:", statusData);
      console.log("Raw students data:", studentsData);

      // Create a map of transaction numbers to their booking info
      const studentMap = studentsData.reduce((acc, student) => {
        if (student && student.transactionNumber) {
          acc[student.transactionNumber] = student;
        }
        return acc;
      }, {});

      // Initialize stats with dynamic time slots
      const calculatedStats = {
        APPROVED: 0,
        PENDING: 0,
        COMPLETED: 0,
        REJECTED: 0,
        total: 0,
        timeSlots: {}, // Dynamic object to store time slot breakdowns
      };

      // ENHANCED DEDUPLICATION: Remove duplicates by email address and prefer TR format
      // This handles the case where same user has multiple records with different transactionNumber formats
      const uniqueStatusData = [];
      const seenEmails = new Set();

      // Sort by dateOfRequest (most recent first) and prefer TR format transactionNumbers
      const sortedStatusData = [...statusData].sort((a, b) => {
        // First, prefer TR format over ObjectId format
        const aIsTR =
          a.transactionNumber && a.transactionNumber.startsWith("TR");
        const bIsTR =
          b.transactionNumber && b.transactionNumber.startsWith("TR");

        if (aIsTR && !bIsTR) return -1; // a comes first (TR format preferred)
        if (!aIsTR && bIsTR) return 1; // b comes first (TR format preferred)

        // If both are same format, sort by date (most recent first)
        const dateA = new Date(a.dateOfRequest || 0);
        const dateB = new Date(b.dateOfRequest || 0);
        return dateB - dateA;
      });

      sortedStatusData.forEach((status) => {
        const email = status.emailAddress;
        if (email && !seenEmails.has(email)) {
          uniqueStatusData.push(status);
          seenEmails.add(email);
          console.log(
            `Keeping record for ${email}: ${status.transactionNumber} (${
              status.transactionNumber?.startsWith("TR")
                ? "TR format"
                : "ObjectId format"
            })`
          );
        } else if (email) {
          console.log(
            `Skipping duplicate entry for ${email}: ${status.transactionNumber}`
          );
        }
      });

      console.log(
        `Removed ${
          statusData.length - uniqueStatusData.length
        } duplicate entries`
      );
      console.log(`Processing ${uniqueStatusData.length} unique appointments`);

      // Process each unique status record
      uniqueStatusData.forEach((status) => {
        const statusType = status.status || "PENDING";
        const studentInfo = studentMap[status.transactionNumber];

        console.log(
          `Processing ${status.transactionNumber}: Status=${statusType}, Student=`,
          studentInfo
        );

        // Count total for this status
        if (Object.prototype.hasOwnProperty.call(calculatedStats, statusType)) {
          calculatedStats[statusType]++;
          calculatedStats.total++;

          // Determine morning/afternoon from student timeSlot or appointmentTime
          let timeSlot = "";
          if (studentInfo) {
            timeSlot =
              studentInfo.timeSlot || studentInfo.appointmentTime || "";
          }

          // Also check the status record itself
          if (!timeSlot && status.timeSlot) {
            timeSlot = status.timeSlot;
          }

          console.log(`  TimeSlot found: "${timeSlot}"`);

          // Group by actual time slot that user selected
          const actualTimeSlot = timeSlot || "No time specified";

          // Initialize time slot object if it doesn't exist
          if (!calculatedStats.timeSlots[actualTimeSlot]) {
            calculatedStats.timeSlots[actualTimeSlot] = {
              APPROVED: 0,
              PENDING: 0,
              COMPLETED: 0,
              REJECTED: 0,
              total: 0,
            };
          }

          // Add to the specific time slot
          calculatedStats.timeSlots[actualTimeSlot][statusType]++;
          calculatedStats.timeSlots[actualTimeSlot].total++;

          console.log(
            `  -> Added to time slot "${actualTimeSlot}" for ${statusType}`
          );
        }
      });

      console.log("Calculated stats:", calculatedStats);
      setStats(calculatedStats);
    } catch (error) {
      console.error("Error calculating dashboard stats:", error);
      // Fallback to original API if calculation fails
      try {
        const response = await axios.get(`${API_URL}/api/dashboard/stats`);
        setStats(response.data);
      } catch (fallbackError) {
        console.error("Fallback API also failed:", fallbackError);
      }
    }
  }, []);

  // Add this effect to fetch stats
  useEffect(() => {
    fetchStats();
    // Set up a refresh interval
    const interval = setInterval(fetchStats, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [fetchStats]); // Use fetchStats as dependency

  // Listen for appointment status updates to refresh stats
  useEffect(() => {
    const handleStatusUpdate = () => {
      console.log("Appointment status updated, refreshing dashboard stats...");
      fetchStats();
    };

    // Listen for custom events
    window.addEventListener("appointmentStatusUpdated", handleStatusUpdate);

    // Also listen for storage events (in case updates happen in other tabs)
    window.addEventListener("storage", (e) => {
      if (e.key === "appointmentStatusUpdated") {
        handleStatusUpdate();
      }
    });

    return () => {
      window.removeEventListener(
        "appointmentStatusUpdated",
        handleStatusUpdate
      );
      window.removeEventListener("storage", handleStatusUpdate);
    };
  }, [fetchStats]);

  return {
    isSidebarOpen,
    setIsSidebarOpen,
    currentDate,
    toggleSidebar,
    daysInMonth,
    startOfMonth,
    monthName,
    year,
    holidays: allFetchedHolidays,
    handlePrevMonth,
    handleNextMonth,
    isWeekend,
    currentMonthHolidays: currentMonthCalendarHolidays,
    events: calendarDashboardEvents,
    stats,
    refreshStats: fetchStats, // Add this so components can manually refresh stats
  };
};

export default useRegistrarHome;
