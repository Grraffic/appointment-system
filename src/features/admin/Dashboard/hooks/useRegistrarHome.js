import { useState, useEffect, useCallback } from "react"; // Added useCallback
import dayjs from "dayjs";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
const API_URL_EVENTS = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"

const useRegistrarHome = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [allFetchedHolidays, setAllFetchedHolidays] = useState([]);
  const [currentMonthCalendarHolidays, setCurrentMonthCalendarHolidays] = useState([]);
  const [allDashboardEvents, setAllDashboardEvents] = useState([]); // Raw events for this dashboard
  const [calendarDashboardEvents, setCalendarDashboardEvents] = useState({}); // Formatted for calendar

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const daysInMonth = currentDate.daysInMonth();
  const startOfMonth = currentDate.startOf("month").day();
  const monthName = currentDate.format("MMMM");
  const year = currentDate.year();

  const fetchEventsForDashboard = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL_EVENTS}/events`); // Fetch events
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
    allDashboardEvents.forEach(event => {
      const startDate = dayjs(event.startDate);
      const endDate = dayjs(event.endDate);
      let currentDateIter = startDate;
      while (currentDateIter.isBefore(endDate) || currentDateIter.isSame(endDate, 'day')) {
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
        currentDateIter = currentDateIter.add(1, 'day');
      }
    });
    setCalendarDashboardEvents(formatted);
  }, [allDashboardEvents]);
  // Function to fetch all holidays from the backend
  const fetchAllHolidaysFromAPI = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/holidays`);
      const formattedBackendHolidays = response.data.map(h => {
        let localDateStr = "";
        if (h.date) {
          try {
            const dateInput = h.date.includes('T') ? h.date : `${h.date}T00:00:00`;
            const dateObj = new Date(dateInput);
            const y = dateObj.getFullYear();
            const m = String(dateObj.getMonth() + 1).padStart(2, '0'); // Correct: Add 1
            const d = String(dateObj.getDate()).padStart(2, '0');
            localDateStr = `${y}-${m}-${d}`;
          } catch (e) {
            console.error("Error parsing holiday date in useRegistrarHome:", h.date, e);
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


  // const events = {
  //   2: { label: "Fully Booked", color: "bg-[#F63838]" },
  //   3: { label: "Fully Booked", color: "bg-[#F63838]" },
  //   6: { label: "Fully Booked", color: "bg-[#F63838]" },
  //   7: { label: "Fully Booked", color: "bg-[#F63838]" },
  //   10: { label: "Fully Booked", color: "bg-[#F63838]" },
  //   13: { label: "Available", color: "bg-[#48E14D]" },
  //   14: { label: "Available", color: "bg-[#48E14D]" },
  //   15: { label: "Available", color: "bg-[#48E14D]" },
  //   16: { label: "Available", color: "bg-[#48E14D]" },
  //   17: { label: "Available", color: "bg-[#48E14D]" },
  //   20: { label: "Special Event", color: "bg-[#FBBC05]" },
  //   21: { label: "Special Event", color: "bg-[#FBBC05]" },
  //   22: { label: "Available", color: "bg-[#48E14D]" },
  //   23: { label: "Available", color: "bg-[#48E14D]" },
  //   24: { label: "Available", color: "bg-[#48E14D]" },
  //   25: { label: "Available", color: "bg-[#48E14D]" },
  //   26: { label: "Available", color: "bg-[#48E14D]" },
  //   27: { label: "Available", color: "bg-[#48E14D]" },
  //   28: { label: "Available", color: "bg-[#48E14D]" },
  //   29: { label: "Available", color: "bg-[#48E14D]" },
  //   30: { label: "Available", color: "bg-[#48E14D]" },
  //   31: { label: "Available", color: "bg-[#48E14D]" },
  // };
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
    // events,
    handlePrevMonth,
    handleNextMonth,
    isWeekend,
    currentMonthHolidays: currentMonthCalendarHolidays,
    events: calendarDashboardEvents,
  };
};

export default useRegistrarHome;