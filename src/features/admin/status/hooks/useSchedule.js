import { useState, useEffect, useCallback } from "react";
import {
  getAllSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../../../../services/scheduleServices";

const useSchedule = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  // State for error messages in modals
  const [addModalError, setAddModalError] = useState(null);
  const [editModalError, setEditModalError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const [originalScheduleForForm, setOriginalScheduleForForm] = useState(null);

  const initialScheduleState = {
    slots: "",
    date: "",
    startTime: "",
    endTime: "",
  };
  const [newSchedule, setNewSchedule] = useState(initialScheduleState);
  const [schedules, setSchedules] = useState([]);

  // Format schedule data for display
  const formatScheduleForDisplay = useCallback((schedule, index) => {
    return {
      no: (index + 1).toString(),
      slots: schedule.slots.toString(),
      availableSlots: (schedule.slots - (schedule.bookedSlots || 0)).toString(),
      bookedSlots: (schedule.bookedSlots || 0).toString(),
      date: formatDateForStorage(schedule.date.split("T")[0]),
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      _id: schedule._id,
    };
  }, []);

  // Fetch all schedules from the API
  const fetchSchedules = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllSchedules();
      const formattedSchedules = data.map((schedule, index) =>
        formatScheduleForDisplay(schedule, index)
      );
      setSchedules(formattedSchedules);
    } catch (error) {
      console.error("Error fetching schedules:", error);
      setAddModalError("Failed to fetch schedules");
    } finally {
      setLoading(false);
    }
  }, [formatScheduleForDisplay]);

  // Set up auto-refresh of schedules
  useEffect(() => {
    fetchSchedules();
    const refreshInterval = setInterval(fetchSchedules, 30000); // Refresh every 30 seconds
    return () => clearInterval(refreshInterval);
  }, [fetchSchedules]);

  // --- Modal Open/Close ---
  const openAddModal = () => {
    setNewSchedule(initialScheduleState);
    setAddModalError(null);
    setFieldErrors({});
    setIsAddModalOpen(true);
  };
  const closeDeleteModal = () => {
    setDeleteIndex(null);
    setIsDeleteModalOpen(false);
  };
  const closeAddModal = () => {
    setNewSchedule(initialScheduleState);
    setAddModalError(null);
    setFieldErrors({});
    setIsAddModalOpen(false);
  };

  const openEditModal = (index) => {
    const scheduleToEdit = schedules[index];
    if (!scheduleToEdit) return;
    const formReadySchedule = {
      ...scheduleToEdit,
      date: formatDate(scheduleToEdit.date),
      startTime: scheduleToEdit.startTime,
      endTime: scheduleToEdit.endTime,
    };
    setEditIndex(index);
    setNewSchedule(formReadySchedule);
    setOriginalScheduleForForm(formReadySchedule);
    setEditModalError(null);
    setFieldErrors({});
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setNewSchedule(initialScheduleState);
    setOriginalScheduleForForm(null);
    setEditIndex(null);
    setEditModalError(null);
    setFieldErrors({});
    setIsEditModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule((prev) => ({ ...prev, [name]: value }));
    if (addModalError) setAddModalError(null);
    if (editModalError) setEditModalError(null);
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // --- Formatting for display/storage ---
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatDateForStorage = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleUpdateSchedule = async () => {
    if (editIndex === null || !originalScheduleForForm) return;

    // Validate individual fields
    const newFieldErrors = {};
    if (!newSchedule.slots) newFieldErrors.slots = "This field is required";
    if (!newSchedule.date) newFieldErrors.date = "This field is required";
    if (!newSchedule.startTime)
      newFieldErrors.startTime = "This field is required";
    if (!newSchedule.endTime) newFieldErrors.endTime = "This field is required";

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      setEditModalError("All fields are required");
      return;
    }

    // Parse slots as numbers
    const newSlots = parseInt(newSchedule.slots);
    const originalSlots = parseInt(originalScheduleForForm.slots);
    const bookedSlots = parseInt(originalScheduleForForm.bookedSlots) || 0;

    // Validate that new slot count isn't less than booked slots
    if (newSlots < bookedSlots) {
      setEditModalError(
        `Cannot reduce slots below booked amount (${bookedSlots} slots already booked)`
      );
      return;
    }

    const hasChanges =
      newSlots !== originalSlots ||
      newSchedule.date !== originalScheduleForForm.date ||
      newSchedule.startTime !== originalScheduleForForm.startTime ||
      newSchedule.endTime !== originalScheduleForForm.endTime;

    if (!hasChanges) {
      setEditModalError("No changes made to the schedule.");
      return;
    }

    try {
      const scheduleToUpdate = schedules[editIndex];

      // Prepare update data with slot calculations
      const updateData = {
        ...newSchedule,
        slots: newSlots,
        bookedSlots: bookedSlots,
        availableSlots: newSlots - bookedSlots,
      };

      const response = await updateSchedule(scheduleToUpdate._id, updateData);
      if (response) {
        await fetchSchedules();
        closeEditModal();
      }
    } catch (error) {
      console.error("Error updating schedule:", error);
      setEditModalError(error.message || "Failed to update schedule");
    }
  };

  const addSchedule = async () => {
    // Validate individual fields
    const newFieldErrors = {};
    if (!newSchedule.slots) newFieldErrors.slots = "This field is required";
    if (!newSchedule.date) newFieldErrors.date = "This field is required";
    if (!newSchedule.startTime)
      newFieldErrors.startTime = "This field is required";
    if (!newSchedule.endTime) newFieldErrors.endTime = "This field is required";

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      setAddModalError("All fields are required");
      return;
    }

    // Check for time overlap with existing schedules on the same day
    const existingSchedules = schedules.filter(
      (schedule) => schedule.date === formatDateForStorage(newSchedule.date)
    );

    // Convert times to minutes for comparison
    const newStartMinutes = convertTimeToMinutes(newSchedule.startTime);
    const newEndMinutes = convertTimeToMinutes(newSchedule.endTime);

    // Check if the new time slot overlaps with any existing slots
    const hasOverlap = existingSchedules.some((schedule) => {
      const existingStartMinutes = convertTimeToMinutes(schedule.startTime);
      const existingEndMinutes = convertTimeToMinutes(schedule.endTime);

      return (
        (newStartMinutes >= existingStartMinutes &&
          newStartMinutes < existingEndMinutes) ||
        (newEndMinutes > existingStartMinutes &&
          newEndMinutes <= existingEndMinutes) ||
        (newStartMinutes <= existingStartMinutes &&
          newEndMinutes >= existingEndMinutes)
      );
    });

    if (hasOverlap) {
      setAddModalError("This time slot overlaps with an existing schedule");
      return;
    }

    if (newStartMinutes >= newEndMinutes) {
      setAddModalError("End time must be after start time");
      return;
    }

    try {
      const response = await createSchedule(newSchedule);
      if (response) {
        await fetchSchedules();
        closeAddModal();
      }
    } catch (error) {
      console.error("Error adding schedule:", error);
      setAddModalError(error.message || "Failed to add schedule");
    }
  };

  // Helper function to convert time to minutes for comparison
  const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const openDeleteModal = (index) => {
    setDeleteIndex(index);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteIndex === null) return;

    try {
      const scheduleToDelete = schedules[deleteIndex];
      const response = await deleteSchedule(scheduleToDelete._id);
      await fetchSchedules();
      closeDeleteModal();

      // Show success message
      toast.success("Schedule deleted successfully");

      // If notification is included in response, show notification
      if (response.notification) {
        // You can add additional notification handling here if needed
      }
    } catch (error) {
      console.error("Error deleting schedule:", error);
      toast.error(error.response?.data?.message || "Failed to delete schedule");
    }
  };

  return {
    isSidebarOpen,
    isAddModalOpen,
    isEditModalOpen,
    editIndex,
    isDeleteModalOpen,
    deleteIndex,
    newSchedule,
    schedules,
    loading,
    addModalError,
    editModalError,
    fieldErrors,

    toggleSidebar,
    openAddModal,
    closeAddModal,
    addSchedule,

    openEditModal,
    closeEditModal,
    handleInputChange,
    handleUpdateSchedule,

    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  };
};

export default useSchedule;
