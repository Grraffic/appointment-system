import { useState, useEffect } from "react";

const useArchived = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    // Optional: Load from localStorage if you want persistence across page refreshes
    const saved = localStorage.getItem("sidebarOpen");
    return saved !== null ? JSON.parse(saved) : true; // Default to open
  });

  // Add this useEffect if you want persistence across refreshes
  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Load archived appointments from localStorage
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem("archivedAppointments");
    return saved ? JSON.parse(saved) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isRetrieveModalOpen, setIsRetrieveModalOpen] = useState(false);
  const [appointmentToRetrieve, setAppointmentToRetrieve] = useState(null);

  // Add these states to your hook
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);
  const [showSuccessRetrieve, setShowSuccessRetrieve] = useState(false);

  // Add pagination states
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter appointments based on search term
  const filteredAppointments = appointments.filter((data) => {
    const searchString = searchTerm.toLowerCase();
    return (
      data.transactionNumber?.toLowerCase().includes(searchString) ||
      data.request?.toLowerCase().includes(searchString) ||
      data.emailAddress?.toLowerCase().includes(searchString)
    );
  });

  // Calculate pagination values
  const totalFilteredEntries = filteredAppointments.length;
  const calculatedTotalPages = Math.ceil(totalFilteredEntries / entriesPerPage);
  const startEntry =
    totalFilteredEntries > 0 ? (currentPage - 1) * entriesPerPage + 1 : 0;
  const endEntry = Math.min(currentPage * entriesPerPage, totalFilteredEntries);

  // Generate page numbers array
  const pageNumbers = [];
  if (calculatedTotalPages > 0) {
    for (let i = 1; i <= calculatedTotalPages; i++) {
      pageNumbers.push(i);
    }
  }

  // Pagination handlers
  const handleEntriesPerPageChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setEntriesPerPage(value);
      setCurrentPage(1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < calculatedTotalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const closeSuccessDelete = () => {
    setShowSuccessDelete(false);
  };

  const closeSuccessRetrieve = () => {
    setShowSuccessRetrieve(false);
  };

  // Single appointment actions
  const deleteAppointment = async () => {
    if (selectedAppointment) {
      try {
        // Make API call to delete the appointment
        const response = await fetch(
          `https://appointment-system-backend-n8dk.onrender.com/api/document-requests/docs/${selectedAppointment.transactionNumber}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "Failed to delete appointment");
        }
        // ... update local state ...
        setShowSuccessDelete(true);
        closeModal();
        // --- Add this line to refresh notifications ---
        refreshNotifications && refreshNotifications();
      } catch (error) {
        console.error("Error deleting appointment:", error);
        alert(
          error.message || "Failed to delete appointment. Please try again."
        );
      }
    }
  };

  const retrieveAppointment = () => {
    if (appointmentToRetrieve) {
      try {
        // Remove from archived appointments
        const updatedArchived = appointments.filter(
          (appt) => appt.id !== appointmentToRetrieve.id
        );
        setAppointments(updatedArchived);
        localStorage.setItem(
          "archivedAppointments",
          JSON.stringify(updatedArchived)
        );

        // Add back to active appointments
        const activeAppointments = JSON.parse(
          localStorage.getItem("appointments") || "[]"
        );
        const { archived, archivedDate, ...appointmentData } =
          appointmentToRetrieve;
        activeAppointments.push(appointmentData);
        localStorage.setItem(
          "appointments",
          JSON.stringify(activeAppointments)
        );

        // Add back to students table
        const studentsData = JSON.parse(
          localStorage.getItem("studentsData") || "[]"
        );
        const studentData = {
          transactionNumber: appointmentToRetrieve.transactionNumber,
          name: appointmentToRetrieve.name,
          lastSY: appointmentToRetrieve.lastSY,
          program: appointmentToRetrieve.program,
          contact: appointmentToRetrieve.contact,
          email: appointmentToRetrieve.email,
          attachment: appointmentToRetrieve.attachment,
          request: appointmentToRetrieve.request,
          date: appointmentToRetrieve.dateOfRequest,
        };
        studentsData.push(studentData);
        localStorage.setItem("studentsData", JSON.stringify(studentsData));

        setShowSuccessRetrieve(true);
        closeRetrieveModal();
      } catch (error) {
        console.error("Error retrieving appointment:", error);
        alert("Failed to retrieve appointment. Please try again.");
      }
    }
  };

  const openRetrieveModal = (appointment) => {
    setAppointmentToRetrieve(appointment);
    setIsRetrieveModalOpen(true);
  };

  const closeRetrieveModal = () => {
    setAppointmentToRetrieve(null);
    setIsRetrieveModalOpen(false);
  };

  // Delete modals
  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedAppointment(null);
    setIsModalOpen(false);
  };

  const openBulkDeleteModal = () => {
    if (selectedRows.length > 0) {
      setIsBulkDeleteModalOpen(true);
    } else {
      alert("Please select at least one appointment to delete.");
    }
  };

  const closeBulkDeleteModal = () => {
    setIsBulkDeleteModalOpen(false);
  };

  // Bulk action handlers
  const deleteBulkAppointments = async () => {
    try {
      // Get selected appointments
      const selectedAppointments = appointments.filter((appt) =>
        selectedRows.includes(appt.id)
      );

      // Delete each appointment through the API
      const deletePromises = selectedAppointments.map(async (appointment) => {
        const response = await fetch(
          `https://appointment-system-backend-n8dk.onrender.com/api/document-requests/docs/${appointment.transactionNumber}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message ||
              `Failed to delete appointment ${appointment.transactionNumber}`
          );
        }
        return response;
      });

      await Promise.all(deletePromises);

      // Remove from archived appointments
      const updatedArchived = appointments.filter(
        (appt) => !selectedRows.includes(appt.id)
      );
      setAppointments(updatedArchived);
      localStorage.setItem(
        "archivedAppointments",
        JSON.stringify(updatedArchived)
      );

      // Remove from students table
      const studentsData = JSON.parse(
        localStorage.getItem("studentsData") || "[]"
      );
      const selectedTransactionNumbers = selectedAppointments.map(
        (appt) => appt.transactionNumber
      );
      const updatedStudents = studentsData.filter(
        (student) =>
          !selectedTransactionNumbers.includes(student.transactionNumber)
      );
      localStorage.setItem("studentsData", JSON.stringify(updatedStudents));

      // Clear selection and close modal
      setSelectedRows([]);
      closeBulkDeleteModal();
      setShowSuccessDelete(true);
    } catch (error) {
      console.error("Error deleting bulk appointments:", error);
      alert(
        error.message || "Failed to delete appointments. Please try again."
      );
    }
  };

  const retrieveBulkAppointments = () => {
    try {
      // Get selected appointments
      const selectedAppointments = appointments.filter((appt) =>
        selectedRows.includes(appt.id)
      );

      // Remove from archived appointments
      const updatedArchived = appointments.filter(
        (appt) => !selectedRows.includes(appt.id)
      );
      setAppointments(updatedArchived);
      localStorage.setItem(
        "archivedAppointments",
        JSON.stringify(updatedArchived)
      );

      // Add back to active appointments
      const activeAppointments = JSON.parse(
        localStorage.getItem("appointments") || "[]"
      );
      selectedAppointments.forEach((appointment) => {
        const { archived, archivedDate, ...appointmentData } = appointment;
        activeAppointments.push(appointmentData);
      });
      localStorage.setItem("appointments", JSON.stringify(activeAppointments));

      // Add back to students table
      const studentsData = JSON.parse(
        localStorage.getItem("studentsData") || "[]"
      );
      selectedAppointments.forEach((appointment) => {
        const studentData = {
          transactionNumber: appointment.transactionNumber,
          name: appointment.name,
          lastSY: appointment.lastSY,
          program: appointment.program,
          contact: appointment.contact,
          email: appointment.email,
          attachment: appointment.attachment,
          request: appointment.request,
          date: appointment.dateOfRequest,
        };
        studentsData.push(studentData);
      });
      localStorage.setItem("studentsData", JSON.stringify(studentsData));

      // Clear selection and close modal
      setSelectedRows([]);
      closeRetrieveModal();
      setShowSuccessRetrieve(true);
    } catch (error) {
      console.error("Error retrieving bulk appointments:", error);
      alert("Failed to retrieve appointments. Please try again.");
    }
  };

  const handleCheckboxChange = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === appointments.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(appointments.map((appt) => appt.id));
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownAction = (action) => {
    if (selectedRows.length === 0) {
      alert("Please select at least one appointment");
      return;
    }

    if (action === "delete") {
      setIsBulkDeleteModalOpen(true);
    } else if (action === "return") {
      setIsRetrieveModalOpen(true);
    }
    setIsDropdownOpen(false);
  };

  return {
    isSidebarOpen,
    appointments,
    isModalOpen,
    isBulkDeleteModalOpen,
    isRetrieveModalOpen,
    selectedAppointment,
    selectedRows,
    isDropdownOpen,
    toggleSidebar,
    openModal,
    closeModal,
    openBulkDeleteModal,
    closeBulkDeleteModal,
    openRetrieveModal,
    closeRetrieveModal,
    deleteAppointment,
    deleteBulkAppointments,
    retrieveBulkAppointments,
    handleCheckboxChange,
    handleSelectAll,
    toggleDropdown,
    handleDropdownAction,
    retrieveAppointment,
    showSuccessDelete,
    setShowSuccessDelete,
    showSuccessRetrieve,
    setShowSuccessRetrieve,
    closeSuccessDelete,
    closeSuccessRetrieve,
    // Add new pagination-related returns
    entriesPerPage,
    currentPage,
    totalFilteredEntries,
    calculatedTotalPages,
    startEntry,
    endEntry,
    pageNumbers,
    handleEntriesPerPageChange,
    handleNextPage,
    handlePreviousPage,
    handlePageChange,
    handleSearchChange,
    searchTerm,
    filteredAppointments,
  };
};

export default useArchived;
