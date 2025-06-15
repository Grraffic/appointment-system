import { useState, useEffect, useCallback } from "react";

const useStudents = (apiUrl) => {
  // States for data fetching
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for pagination and search
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  // Filter appointments based on search term
  const filteredAppointments = appointments.filter((data) => {
    const searchString = searchTerm.toLowerCase();
    return (
      data.transactionNumber?.toLowerCase().includes(searchString) ||
      data.name?.toLowerCase().includes(searchString) ||
      data.lastSY?.toLowerCase().includes(searchString) ||
      data.program?.toLowerCase().includes(searchString) ||
      data.contact?.toLowerCase().includes(searchString) ||
      data.email?.toLowerCase().includes(searchString) ||
      data.request?.toLowerCase().includes(searchString)
    );
  });

  // Calculate pagination values
  const totalFilteredEntries = filteredAppointments.length;
  const calculatedTotalPages = Math.ceil(totalFilteredEntries / entriesPerPage);
  const startEntry = totalFilteredEntries > 0 ? (currentPage - 1) * entriesPerPage + 1 : 0;
  const endEntry = Math.min(currentPage * entriesPerPage, totalFilteredEntries);

  // Generate page numbers array
  const pageNumbers = [];
  if (calculatedTotalPages > 0) {
    for (let i = 1; i <= calculatedTotalPages; i++) {
      pageNumbers.push(i);
    }
  }

  // Handlers
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleEntriesPerPageChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setEntriesPerPage(value);
      setCurrentPage(1); // Reset to first page when changing entries per page
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

  // Fetch data
  useEffect(() => {
    if (!apiUrl) {
      setAppointments([]);
      setLoading(false);
      setError("API URL is not provided.");
      return;
    }

    const fetchStudentsData = async () => {
      setLoading(true);
      setError(null);
      setAppointments([]); // Clear previous data

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Get archived appointments from localStorage
        const archivedAppointments = JSON.parse(localStorage.getItem('archivedAppointments') || '[]');
        const archivedTransactionNumbers = new Set(archivedAppointments.map(appt => appt.transactionNumber));

        // Filter out archived appointments
        const filteredData = data.filter(student => !archivedTransactionNumbers.has(student.transactionNumber));
        
        setAppointments(filteredData);
      } catch (err) {
        console.error("Failed to fetch student data:", err);
        setError(err.message || "An error occurred while fetching data.");
        setAppointments([]); // Ensure appointments is empty on error
      } finally {
        setLoading(false);
      }
    };

    fetchStudentsData();

    // Set up auto-refresh every 30 seconds
    const refreshInterval = setInterval(fetchStudentsData, 30000);

    // Cleanup interval on unmount
    return () => clearInterval(refreshInterval);
  }, [apiUrl]);

  return {
    // Data states
    appointments,
    loading,
    error,
    
    // Pagination states
    currentPage,
    entriesPerPage,
    totalFilteredEntries,
    calculatedTotalPages,
    startEntry,
    endEntry,
    pageNumbers,
    
    // Filtered data
    filteredAppointments,
    
    // Handlers
    handleSearchChange,
    handleEntriesPerPageChange,
    handleNextPage,
    handlePreviousPage,
    handlePageChange,
    
    // Search state
    searchTerm,
    
     // Sidebar states and handlers
    isSidebarOpen,
    toggleSidebar,
  };
};

export default useStudents;
