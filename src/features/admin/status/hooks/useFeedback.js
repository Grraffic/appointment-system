import { useState, useEffect, useCallback } from "react";

const useFeedback = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved !== null ? JSON.parse(saved) : true;
  });
  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(6);
  const [sortOrder, setSortOrder] = useState("newest");

  const fetchFeedback = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://appointment-system-backend-n8dk.onrender.com/api/feedback?sort=${sortOrder}`);
      if (!response.ok) {
        throw new Error("Failed to fetch feedback");
      }
      const data = await response.json();
      setFeedback(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [sortOrder]);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Calculate pagination values
  const totalEntries = feedback.length;
  const calculatedTotalPages = Math.ceil(totalEntries / entriesPerPage);
  const startEntry =
    totalEntries > 0 ? (currentPage - 1) * entriesPerPage + 1 : 0;
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries);

  // Generate page numbers array
  const pageNumbers = [];
  if (calculatedTotalPages > 0) {
    for (let i = 1; i <= calculatedTotalPages; i++) {
      pageNumbers.push(i);
    }
  }

  // Get current page feedback
  const currentFeedback = feedback.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  // Pagination handlers
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

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  };

  return {
    isSidebarOpen,
    toggleSidebar,
    setIsSidebarOpen,
    currentPage,
    totalEntries,
    calculatedTotalPages,
    startEntry,
    endEntry,
    pageNumbers,
    handleNextPage,
    handlePreviousPage,
    handlePageChange,
    handleSortChange,
    sortOrder,
    currentFeedback,
    loading,
    error,
  };
};

export default useFeedback;
