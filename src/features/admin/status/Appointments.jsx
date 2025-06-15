import Header from "/src/features/admin/components/Header";
import Footer from "/src/features/admin/components/Footer";
import { LuCircleCheckBig } from "react-icons/lu";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa6";
import Sidebar from "/src/components/Sidebar";
import { FaSearch } from "react-icons/fa";
import { BsTrash3 } from "react-icons/bs";
import { Tooltip } from "react-tooltip";
import useAppointment from "./hooks/useAppointment";
import { useState } from "react";

// Custom Tooltip Component for multi-line text
const CustomTooltip = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e) => {
    if (text) {
      const rect = e.target.getBoundingClientRect();
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
      });
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="relative">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cursor-help"
      >
        {children}
      </div>
      {showTooltip && (
        <div
          className="fixed z-50 bg-gray-800 text-white p-3 rounded-lg shadow-lg max-w-sm text-sm whitespace-pre-wrap break-words leading-relaxed"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: "translate(-50%, -100%)",
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

const Appointments = () => {
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
      <div className={`${isSidebarOpen ? "w-[300px]" : "w-[100px]"}`}>
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
                        <option value="Filter by">Filter by</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Completed">Completed</option>
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
                <table className="text-[18px] w-full">
                  <thead>
                    <tr className="bg-gray-200 text-center">
                      <th className="border p-4">STATUS</th>
                      <th className="border p-4">
                        TRANSACTION
                        <br />
                        NUMBER
                      </th>
                      <th className="border p-4">REQUEST</th>
                      <th className="border p-4">
                        EMAIL <br />
                        ADDRESS
                      </th>
                      <th className="border p-4">PURPOSE</th>
                      <th className="border p-4">
                        DATE OF
                        <br />
                        APPOINTMENT
                      </th>
                      <th className="border p-4">TIME SLOT</th>
                      <th className="border p-4">
                        DATE OF
                        <br />
                        REQUEST
                      </th>
                      <th className="border p-4">ACTIONS</th>
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
                        .map((data, index) => (
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
                            <td className="border p-4">
                              <div className="flex flex-col text-center">
                                <span
                                  className={`font-bold ${getTransactionNumberColor(
                                    data.status
                                  )}`}
                                >
                                  {data.transactionNumber}
                                </span>
                              </div>
                            </td>
                            <td className="border p-4">{data.request}</td>
                            <td className="border p-4 max-w-0">
                              <div className="truncate">
                                {data.emailAddress &&
                                data.emailAddress !== "No email specified" ? (
                                  <CustomTooltip text={data.emailAddress}>
                                    <span className="block truncate">
                                      {data.emailAddress}
                                    </span>
                                  </CustomTooltip>
                                ) : (
                                  <span className="text-gray-500 text-sm">
                                    No email
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="border p-4 max-w-0">
                              <div className="truncate">
                                {data.purpose && data.purpose !== "N/A" ? (
                                  <CustomTooltip text={data.purpose}>
                                    <span className="block truncate">
                                      {data.purpose}
                                    </span>
                                  </CustomTooltip>
                                ) : (
                                  <span className="text-gray-500 text-sm">
                                    No purpose specified
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="border p-4">
                              {data.dateOfAppointment}
                            </td>
                            <td className="border p-4">{data.timeSlot}</td>
                            <td className="border p-4">
                              {new Date(
                                data.dateOfRequest
                              ).toLocaleDateString()}
                            </td>
                            <td className="border p-4">
                              <div className="flex gap-2 justify-center">
                                {/* Approve Button - show for Pending and Rejected statuses */}
                                {(data.status === "PENDING" ||
                                  data.status === "REJECTED") && (
                                  <div
                                    data-tooltip-id="approve-tooltip"
                                    data-tooltip-content="Approve"
                                    className="bg-[#3A993D] p-2 rounded cursor-pointer hover:bg-green-700"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      approveAppointment(data);
                                    }}
                                  >
                                    <FaThumbsUp className="text-white" />
                                  </div>
                                )}

                                {/* Complete Button - show for Pending and Approved statuses */}
                                {(data.status === "PENDING" ||
                                  data.status === "APPROVED") && (
                                  <div
                                    data-tooltip-id="complete-tooltip"
                                    data-tooltip-content="Complete"
                                    className="bg-[#354CCE] p-2 rounded cursor-pointer hover:bg-blue-700"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      completeAppointment(data);
                                    }}
                                  >
                                    <LuCircleCheckBig className="text-white" />
                                  </div>
                                )}

                                {/* Reject Button - show for Pending and Approved statuses */}
                                {(data.status === "PENDING" ||
                                  data.status === "APPROVED") && (
                                  <div
                                    data-tooltip-id="reject-tooltip"
                                    data-tooltip-content="Reject"
                                    className="bg-[#D52121] p-2 rounded cursor-pointer hover:bg-red-700"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      rejectAppointment(data);
                                    }}
                                  >
                                    <FaThumbsDown className="text-white transform scale-x-[-1]" />
                                  </div>
                                )}

                                {/* Delete Button - show for all statuses */}
                                <div
                                  data-tooltip-id="delete-tooltip"
                                  data-tooltip-content="Delete"
                                  className="bg-[#6F6F6F] p-2 rounded cursor-pointer hover:bg-gray-700"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    openModal(data);
                                  }}
                                >
                                  <BsTrash3 className="text-white" />
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
              {calculatedTotalPages > 0 && (
                <div className="flex justify-between items-center mt-10 text-[18px] px-4">
                  <span className="text-[#161F55]">
                    SHOWING {startEntry} TO {endEntry} OF {totalFilteredEntries}{" "}
                    ENTRIES
                  </span>
                  {calculatedTotalPages > 1 && (
                    <div className="flex items-center">
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

          {/* Tooltips */}
          <Tooltip id="approve-tooltip" />
          <Tooltip id="complete-tooltip" />
          <Tooltip id="reject-tooltip" />
          <Tooltip id="delete-tooltip" />
        </main>
      </div>
    </div>
  );
};

export default Appointments;
