import Header from "/src/features/admin/components/Header";
import Footer from "/src/features/admin/components/Footer";
import { LuCircleCheckBig } from "react-icons/lu";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa6";
import Sidebar from "/src/components/Sidebar";
import { FaSearch } from "react-icons/fa";
import { BsTrash3 } from "react-icons/bs";
import { Tooltip } from "react-tooltip";
import SuccessModal from "../../../components/SuccessModal";
import useAppointment from "./hooks/useAppointment";

const Appointments = () => {
  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper function to format time slot - now displays actual dynamic time slots
  const formatTimeSlot = (timeSlot) => {
    if (!timeSlot) return "";
    // Return the actual time slot as stored (e.g., "8:00 AM - 11:00 AM")
    return timeSlot;
  };

  // Custom CSS for tooltips on truncated table data
  const tooltipStyle = `
    /* The parent element (the <td>) needs to be the positioning context */
    [data-tooltip] {
      position: relative;
    }
    
    /* The cursor should only change to a pointer if a tooltip exists */
    [data-tooltip][data-tooltip]:hover {
      cursor: pointer;
    }

    [data-tooltip]::before {
      content: attr(data-tooltip);
      position: absolute;
      background: rgba(0, 0, 0, 0.85);
      color: #fff;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 12px;
      white-space: pre-line;
      max-width: 300px;
      width: max-content;
      z-index: 1000;

      /* Initially hidden and non-interactive */
      opacity: 0;
      pointer-events: none;

      /* Positioning - show below the element */
      top: 105%;
      left: 50%;
      transform: translateX(-50%);

      /* Smooth transition */
      transition: opacity 0.2s ease-in-out;
    }

    /* Show on hover */
    [data-tooltip]:hover::before {
      opacity: 1;
    }
  `;

  const {
    // Data states
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
    handleFilterChange,
    handleEntriesPerPageChange,
    handleNextPage,
    handlePreviousPage,
    handlePageChange,

    // Search and filter states
    searchTerm,
    selectedFilter,

    // Modal states and handlers
    isModalOpen,
    selectedAppointment,
    openModal,
    closeModal,

    // Success modal states
    showSuccessModal,
    successMessage,
    setShowSuccessModal,

    // Status handlers
    deleteAppointment,
    approveAppointment,
    rejectAppointment,
    completeAppointment,

    // Style helpers
    getStatusColor,
    getTransactionNumberColor,

    // Sidebar states and handlers
    isSidebarOpen,
    toggleSidebar,
  } = useAppointment();

  return (
    <div className="flex h-screen font-LatoRegular">
      {/* Inject custom styles for data tooltips */}
      <style>{tooltipStyle}</style>

      <div
        className={`${
          isSidebarOpen ? "w-[300px]" : "w-[100px]"
        }transition-all duration-300 z-20`}
      >
        <Sidebar isSidebarOpen={isSidebarOpen} />
      </div>
      <div className="flex-1 overflow-y-auto">
        <main className="h-auto">
          <Header
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
            title="Appointments"
          />
          <div>
            <section className="min-h-[calc(100vh-160px)] z-10 bg-white p-5 my-5">
              <div className="bg-[#D9D9D9] h-48 m-4">
                <div className=" text-[#161F55] px-3 ml-3 pt-2">
                  <h2 className="text-3xl font-bold tracking-[5px] pt-1">
                    LIST OF APPOINTMENTS
                  </h2>
                  <div className="border-b-4 border-[#F3BC62] w-[450px] my-3"></div>
                </div>

                <div className="flex justify-between items-center mt-[78px] ml-4 mr-5">
                  <div className="text-[#161F55] font-semibold text-[18px]">
                    <label htmlFor="show-entries" className="mr-2">
                      SHOW
                    </label>
                    <select
                      id="show-entries"
                      name="show-entries"
                      value={entriesPerPage}
                      onChange={handleEntriesPerPageChange}
                      className="text-center w-20 p-2 border border-gray-400 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#161F55]"
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                      <option value="25">25</option>
                    </select>
                    <span className="ml-2">ENTRIES</span>
                  </div>
                  <div className="text-[#161F55] font-semibold text-[18px] flex gap-4">
                    <div>
                      <select
                        value={selectedFilter}
                        onChange={handleFilterChange}
                        className="bg-white border-2 border-gray-300 px-2 text-gray-400 py-2"
                      >
                        {" "}
                        <option value="PENDING">Pending</option>
                        <option value="APPROVED">Approved</option>
                        <option value="REJECTED">Rejected</option>
                        <option value="COMPLETED">Completed</option>
                      </select>
                    </div>
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        id="search"
                        type="search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="border-[#989898] py-2 bg-white text-[#161F55] pl-10 pr-3 rounded-md"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-y-auto m-4 mt-8">
                <table
                  className="text-[15px] w-full"
                  style={{ tableLayout: "fixed" }}
                >
                  <thead>
                    <tr className="bg-gray-200 text-center">
                      <th className="border p-4 w-[12%]">STATUS</th>
                      <th className="border p-4 w-[15%]">
                        TRANSACTION
                        <br />
                        NUMBER
                      </th>
                      <th className="border p-4 w-[15%]">REQUEST</th>
                      <th className="border p-4 w-[18%]">
                        EMAIL <br />
                        ADDRESS
                      </th>
                      <th className="border p-5 w-[12%]">PURPOSE</th>
                      <th className="border p-4 w-[12%]">
                        DATE OF
                        <br />
                        APPOINTMENT
                      </th>
                      <th className="border p-4 w-[10%]">TIME SLOT</th>
                      <th className="border p-4 w-[12%]">
                        DATE OF
                        <br />
                        REQUEST
                      </th>
                      <th className="border p-4 w-[15%]">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading && (
                      <tr>
                        <td colSpan="9" className="text-center p-5">
                          Loading appointments...
                        </td>
                      </tr>
                    )}
                    {error && (
                      <tr>
                        <td
                          colSpan="9"
                          className="text-center p-5 text-red-500"
                        >
                          Error: {error}
                        </td>
                      </tr>
                    )}
                    {!loading &&
                      !error &&
                      filteredAppointments
                        .slice(
                          (currentPage - 1) * entriesPerPage,
                          currentPage * entriesPerPage
                        )
                        .map((data) => {
                          const isTransactionLong =
                            data.transactionNumber?.length > 20;
                          const isRequestLong = data.request?.length > 25;
                          const isEmailLong = data.emailAddress?.length > 25;
                          const isPurposeLong = data.purpose?.length > 20;

                          return (
                            <tr key={data.id} className="even:bg-gray-100">
                              <td className="border p-4 text-center">
                                <span
                                  className={`inline-block w-[120px] text-center px-2 py-2 rounded text-white ${getStatusColor(
                                    data.status
                                  )}`}
                                >
                                  {data.status}
                                </span>
                              </td>
                              <td
                                className="border p-4 text-center"
                                data-tooltip={
                                  isTransactionLong
                                    ? data.transactionNumber
                                    : null
                                }
                              >
                                <div
                                  className={`font-bold ${getTransactionNumberColor(
                                    data.status
                                  )} ${isTransactionLong ? "truncate" : ""}`}
                                >
                                  {data.transactionNumber}
                                </div>
                              </td>
                              <td
                                className="border p-4"
                                data-tooltip={
                                  isRequestLong ? data.request : null
                                }
                              >
                                <div
                                  className={isRequestLong ? "truncate" : ""}
                                >
                                  {data.request}
                                </div>
                              </td>
                              <td
                                className="border p-4"
                                data-tooltip={
                                  isEmailLong ? data.emailAddress : null
                                }
                              >
                                <div className={isEmailLong ? "truncate" : ""}>
                                  {data.emailAddress}
                                </div>
                              </td>
                              <td
                                className="border p-5"
                                data-tooltip={
                                  isPurposeLong
                                    ? data.purpose?.replace(/(.{50})/g, "$1\n")
                                    : null
                                }
                              >
                                <div
                                  className={isPurposeLong ? "truncate" : ""}
                                >
                                  {data.purpose || "No purpose specified"}
                                </div>
                              </td>
                              <td className="border p-4 text-center">
                                {formatDate(data.dateOfAppointment)}
                              </td>
                              <td className="border p-4 text-center">
                                {formatTimeSlot(data.timeSlot)}
                              </td>
                              <td className="border p-4 text-center">
                                {new Date(
                                  data.dateOfRequest
                                ).toLocaleDateString()}
                              </td>
                              <td className="border p-4">
                                <div className="flex gap-2 justify-center">
                                  {/* Action buttons using react-tooltip */}
                                  {(data.status === "PENDING" ||
                                    data.status === "REJECTED") && (
                                    <div
                                      data-tooltip-id="approve-tooltip"
                                      data-tooltip-content="Approve"
                                      className="bg-[#3A993D] p-2 rounded cursor-pointer hover:bg-green-700"
                                      onClick={(e) =>
                                        approveAppointment(data, e)
                                      }
                                    >
                                      <FaThumbsUp className="text-white" />
                                    </div>
                                  )}
                                  {(data.status === "PENDING" ||
                                    data.status === "APPROVED") && (
                                    <div
                                      data-tooltip-id="complete-tooltip"
                                      data-tooltip-content="Complete"
                                      className="bg-[#354CCE] p-2 rounded cursor-pointer hover:bg-blue-700"
                                      onClick={(e) =>
                                        completeAppointment(data, e)
                                      }
                                    >
                                      <LuCircleCheckBig className="text-white" />
                                    </div>
                                  )}
                                  {(data.status === "PENDING" ||
                                    data.status === "APPROVED") && (
                                    <div
                                      data-tooltip-id="reject-tooltip"
                                      data-tooltip-content="Reject"
                                      className="bg-[#D52121] p-2 rounded cursor-pointer hover:bg-red-700"
                                      onClick={(e) =>
                                        rejectAppointment(data, e)
                                      }
                                    >
                                      <FaThumbsDown className="text-white transform scale-x-[-1]" />
                                    </div>
                                  )}
                                  <div
                                    data-tooltip-id="delete-tooltip"
                                    data-tooltip-content="Delete"
                                    className="bg-[#6F6F6F] p-2 rounded cursor-pointer hover:bg-gray-700"
                                    onClick={() => openModal(data)}
                                  >
                                    <BsTrash3 className="text-white" />
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              {calculatedTotalPages > 0 && (
                <div className="flex justify-between items-center mt-10 text-[18px] px-4">
                  <span className="text-[#161F55]">
                    SHOWING {startEntry} TO {endEntry} OF {totalFilteredEntries}{" "}
                    ENTRIES
                  </span>
                  {calculatedTotalPages > 1 && (
                    <div className="flex items-center">
                      {/* PREVIOUS BUTTON RESTORED */}
                      <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="border px-3 py-1 text-[#161F55] rounded-l-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      {pageNumbers.map((number) => (
                        <button
                          key={number}
                          onClick={() => handlePageChange(number)}
                          className={`border-t border-b px-3 py-1 ${
                            currentPage === number
                              ? "bg-[#161F55] text-white"
                              : "text-[#161F55] hover:bg-gray-100"
                          }`}
                        >
                          {number}
                        </button>
                      ))}
                      {/* NEXT BUTTON RESTORED */}
                      <button
                        onClick={handleNextPage}
                        disabled={currentPage === calculatedTotalPages}
                        className="border px-3 py-1 text-[#161F55] rounded-r-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>

          <Footer />

          {/* Delete Confirmation Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-70 z-50">
              <div className="bg-white p-20 rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4">
                  Are you sure you want to delete this appointment?
                </h2>
                <div className="flex justify-center gap-10 mt-10">
                  <button
                    className="bg-gray-300 text-[#161F55] px-10 py-2 rounded-2xl"
                    onClick={closeModal}
                  >
                    No
                  </button>
                  <button
                    className="bg-[#161F55] text-white px-10 py-2 rounded-2xl"
                    onClick={deleteAppointment}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Success Modal */}
          <SuccessModal
            show={showSuccessModal}
            message={successMessage}
            onClose={() => setShowSuccessModal(false)}
          />

          {/* Tooltips for Action Buttons (from react-tooltip) */}
          <Tooltip id="approve-tooltip" />
          <Tooltip id="complete-tooltip" />
          <Tooltip id="reject-tooltip" />
          <Tooltip id="delete-tooltip" />
          <Tooltip id="email-tooltip" />
          <Tooltip id="purpose-tooltip" />
        </main>
      </div>
    </div>
  );
};

export default Appointments;
