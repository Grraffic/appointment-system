// hooks/useEvents.js
import { useState, useEffect, useCallback } from "react"; // Added useCallback
import dayjs from "dayjs";
import axios from "axios";

const API_URL =
  import.meta.env.REACT_APP_API_URL || "http://localhost:5000/api"; // Ensure port matches backend

const useEvents = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [currentDate, setCurrentDate] = useState(dayjs());

  // --- State for event data ---
  const [allApiEvents, setAllApiEvents] = useState([]); // Stores raw event objects from API
  const [calendarEvents, setCalendarEvents] = useState({}); // Formatted for calendar: { monthKey: { day: eventUIData } }

  // --- State for event form and modal ---
  const initialEventFormState = {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    color: "bg-blue-500",
  }; // Added default color
  const [newEventForm, setNewEventForm] = useState(initialEventFormState);
  const [selectedEventForModal, setSelectedEventForModal] = useState(null); // For displaying event details in modal
  // const [selectedDayForNewEvent, setSelectedDayForNewEvent] = useState(null); // Optional: for UI indication

  // Persist sidebar state
  useEffect(() => {
    localStorage.setItem(
      "sidebarOpenEventsPage",
      JSON.stringify(isSidebarOpen)
    );
  }, [isSidebarOpen]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // --- API Interaction ---
  const fetchEventsFromAPI = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/events`);
      setAllApiEvents(response.data); // Store the raw array of events
    } catch (error) {
      console.error("Error fetching events:", error);
      setAllApiEvents([]); // Reset on error
      alert(
        `Failed to fetch events: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  }, []);

  // Fetch events on initial load and when an event is saved/deleted (via fetchEventsFromAPI call)
  useEffect(() => {
    fetchEventsFromAPI();
  }, [fetchEventsFromAPI]);

  // Process `allApiEvents` into the `calendarEvents` structure whenever `allApiEvents` changes
  useEffect(() => {
    const formattedForCalendar = {};
    allApiEvents.forEach((event) => {
      if (!event.startDate || !event.endDate) return; // Skip if dates are missing

      const eventStartDate = dayjs(event.startDate);
      const eventEndDate = dayjs(event.endDate);

      let currentDateIterator = eventStartDate;
      while (
        currentDateIterator.isBefore(eventEndDate) ||
        currentDateIterator.isSame(eventEndDate, "day")
      ) {
        const monthKey = currentDateIterator.format("YYYY-MM");
        const day = currentDateIterator.date();

        if (!formattedForCalendar[monthKey]) {
          formattedForCalendar[monthKey] = {};
        }

        // Store UI-relevant data for the calendar cell.
        // If multiple events on one day, this will overwrite. Consider an array if needed.
        formattedForCalendar[monthKey][day] = {
          id: event._id, // Important for delete/update
          label: event.title,
          description: event.description || "", // Ensure description is at least an empty string
          startDate: dayjs(event.startDate).format("YYYY-MM-DD"), // Standard format for display/edit
          endDate: dayjs(event.endDate).format("YYYY-MM-DD"),
          color: event.color || "bg-blue-500", // Use event's color or default
          // originalEvent: event, // Optionally keep the full original event object
        };
        currentDateIterator = currentDateIterator.add(1, "day");
      }
    });
    setCalendarEvents(formattedForCalendar);
  }, [allApiEvents]);

  // Calendar Navigation and Properties
  const handlePrevMonth = () =>
    setCurrentDate(currentDate.subtract(1, "month"));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  const daysInMonth = currentDate.daysInMonth();
  const startOfMonth = currentDate.startOf("month").day(); // 0 for Sunday
  const monthKey = currentDate.format("YYYY-MM");
  const monthName = currentDate.format("MMMM");
  const year = currentDate.year();

  // Event Form and Modal Logic
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEventForm({ ...newEventForm, [name]: value });
  };

  const handleDayClick = (day) => {
    const eventOnDay = calendarEvents[monthKey]?.[day];
    if (eventOnDay) {
      setSelectedEventForModal(eventOnDay); // Set data for the modal
    } else {
      // Pre-fill start and end date for a new event form when an empty day is clicked
      const clickedDate = currentDate.date(day).format("YYYY-MM-DD");
      setNewEventForm({
        ...initialEventFormState,
        startDate: clickedDate,
        endDate: clickedDate,
      });
      setSelectedEventForModal(null); // Ensure no event modal is open
      // setSelectedDayForNewEvent(day); // Optional for UI
    }
  };

  const handleSaveEvent = async () => {
    const { title, startDate, endDate, description, color } = newEventForm;
    if (!title || !startDate || !endDate) {
      alert("Event title, start date, and end date are required.");
      return;
    }
    if (dayjs(endDate).isBefore(dayjs(startDate))) {
      alert("End date cannot be before start date.");
      return;
    }

    const eventDataToSave = { title, startDate, endDate, description, color };

    try {
      // NOTE: This simple save always creates a NEW event.
      // To implement UPDATE, you'd need an `editingEventId` state,
      // check if it exists, and make a PUT request instead.
      await axios.post(`${API_URL}/events`, eventDataToSave);
      fetchEventsFromAPI(); // Re-fetch all events to update the calendar
      setNewEventForm(initialEventFormState); // Reset the form
      // setSelectedDayForNewEvent(null);
    } catch (error) {
      console.error("Error saving event:", error);
      alert(
        `Failed to save event: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleCancelEvent = () => {
    setNewEventForm(initialEventFormState); // Reset the form
    // setSelectedDayForNewEvent(null);
  };

  const handleDeleteEvent = async () => {
    if (!selectedEventForModal || !selectedEventForModal.id) {
      alert("No event selected for deletion or event ID is missing.");
      return;
    }
    try {
      await axios.delete(`${API_URL}/events/${selectedEventForModal.id}`);
      fetchEventsFromAPI(); // Re-fetch events
      setSelectedEventForModal(null); // Close the modal
    } catch (error) {
      console.error("Error deleting event:", error);
      alert(
        `Failed to delete event: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleCloseModal = () => {
    setSelectedEventForModal(null);
  };

  return {
    isSidebarOpen,
    currentDate,
    events: calendarEvents, // This is the processed data for calendar cells
    allEvents: allApiEvents, // The raw list of all events from API (e.g., for a list view if needed)
    newEvent: newEventForm, // Renamed for clarity (was newEvent, now newEventForm)
    selectedEvent: selectedEventForModal, // Renamed for clarity
    toggleSidebar,
    handlePrevMonth,
    handleNextMonth,
    handleInputChange,
    handleSaveEvent,
    handleCancelEvent,
    handleDayClick,
    handleDeleteEvent,
    handleCloseModal,
    daysInMonth,
    startOfMonth,
    monthKey,
    monthName,
    year,
    // selectedDayForNewEvent, // Expose if needed
  };
};

export default useEvents;
