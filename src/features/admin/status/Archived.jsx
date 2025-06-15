import Header from "/src/features/admin/components/Header";
import Footer from "/src/features/admin/components/Footer";
import Sidebar from "/src/components/Sidebar";
import { FaSearch } from "react-icons/fa";
import { BsTrash3 } from "react-icons/bs";
import { TbReload } from "react-icons/tb";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Tooltip } from "react-tooltip"; // For tooltips
import useArchived from "./hooks/useArchived";

const Archived = () => {
  const {
    isSidebarOpen,
    appointments,
    isModalOpen,
    isBulkDeleteModalOpen,
    isRetrieveModalOpen,
    selectedRows,
    isDropdownOpen,
    toggleSidebar,
    openModal,
    closeModal,
    closeBulkDeleteModal,
    openRetrieveModal,
    closeRetrieveModal,
    deleteAppointment,
    deleteBulkAppointments,
    handleCheckboxChange,
    handleSelectAll,
    toggleDropdown,
    handleDropdownAction,
    retrieveAppointment,
    showSuccessDelete,
    showSuccessRetrieve,
    closeSuccessDelete,
    closeSuccessRetrieve,
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
    retrieveBulkAppointments,
  } = useArchived();

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
            title="Archived Appointments"
          />
          <div>
            <section className="h-[1200px] z-10 bg-white p-5 my-5">
              {/* Top section */}
              <div className="bg-[#D9D9D9] h-48 m-4">
                <div className=" text-[#161F55] px-3 ml-3 pt-2">
                  <h2 className="text-3xl font-bold tracking-[5px] pt-1">
                    LIST OF ARCHIVED APPOINTMENTS
                  </h2>
                  <div className="border-b-4 border-[#F3BC62] w-[650px] my-3"></div>
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

              {/* Table */}
              <div className="overflow-y-auto m-4 mt-8">
                <table className="text-[18px] w-full">
                  <thead>
                    <tr className="bg-gray-200 text-center">
                      <th className="border p-5">
                        <div className="flex items-center justify-center pl-4">
                          <input
                            type="checkbox"
                            checked={
                              selectedRows.length === appointments.length &&
                              appointments.length > 0
                            }
                            onChange={handleSelectAll}
                            className="w-5 h-5"
                          />
                          <div className="relative">
                            <button
                              onClick={toggleDropdown}
                              className="flex items-center justify-center"
                            >
                              <RiArrowDropDownLine className="text-[#161F55] text-2xl" />
                            </button>
                            {isDropdownOpen && (
                              <div className="absolute top-10 left-0 bg-white border border-gray-200 rounded-lg shadow-lg w-32 z-50">
                                <button
                                  onClick={() => handleDropdownAction("delete")}
                                  className="block w-full text-center px-4 py-2 text-[#161F55] hover:bg-gray-100"
                                >
                                  Delete
                                </button>
                                <button
                                  onClick={() => handleDropdownAction("return")}
                                  className="block w-full text-center px-4 py-2 text-[#161F55] hover:bg-gray-100"
                                >
                                  Retrieve
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </th>
                      <th className="border p-4 text-center">
                        TRANSACTION <br /> NUMBER
                      </th>
                      <th className="border p-4 text-center">REQUEST</th>
                      <th className="border p-4 text-center">
                        EMAIL <br /> ADDRESS
                      </th>
                      <th className="border p-4 text-center">
                        DATE OF <br /> APPOINTMENT
                      </th>
                      <th className="border p-4 text-center">TIME SLOT</th>
                      <th className="border p-4 text-center">
                        DATE OF <br /> REQUEST
                      </th>
                      <th className="border p-4 text-center">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments
                      .slice(
                        (currentPage - 1) * entriesPerPage,
                        currentPage * entriesPerPage
                      )
                      .map((data) => (
                        <tr
                          key={data.id}
                          className={`text-[18px] ${selectedRows.includes(data.id)
                            ? "bg-[#C2DBFF] !important"
                            : "even:bg-gray-100"
                            }`}
                        >
                          <td className="border p-4 text-center">
                            <div className="flex items-center justify-center">
                              <input
                                type="checkbox"
                                checked={selectedRows.includes(data.id)}
                                onChange={() => handleCheckboxChange(data.id)}
                                className="w-5 h-5"
                              />
                            </div>
                          </td>
                          <td className="border p-4 text-center font-bold">
                            {data.transactionNumber}
                          </td>
                          <td className="border p-4 text-center">
                            {data.request}
                          </td>
                          <td className="border p-4 text-center">
                            {data.emailAddress}
                          </td>
                          <td className="border p-4 text-center">
                            {data.dateOfAppointment}
                          </td>
                          <td className="border p-4 text-center">
                            {data.timeSlot}
                          </td>
                          <td className="border p-4 text-center">
                            {data.dateOfRequest}
                          </td>
                          <td className="border p-4 text-center">
                            <div className="flex gap-2 justify-center">
                              <div
                                data-tooltip-id="retrieve-tooltip"
                                data-tooltip-content="Retrieve"
                                className="bg-[#3A993D] p-2 rounded cursor-pointer hover:bg-green-700 transform scale-x-[-1]"
                                onClick={() => openRetrieveModal(data)}
                              >
                                <TbReload className="text-white" />
                              </div>
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
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {calculatedTotalPages > 0 && (
                <div className="flex justify-between items-center mt-10 text-[18px] px-4">
                  <span className="text-[#161F55]">
                    SHOWING {startEntry} TO {endEntry} OF {totalFilteredEntries} ENTRIES
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

          {/* Single Delete Modal */}
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

          {/* Single Retrieve Modal */}
          {isRetrieveModalOpen && !selectedRows.length && (
            <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-70 z-50">
              <div className="bg-white p-20 rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4">
                  Are you sure you want to retrieve this appointment?
                </h2>
                <div className="flex justify-center gap-10 mt-10">
                  <button
                    className="bg-gray-300 text-[#161F55] px-10 py-2 rounded-2xl"
                    onClick={closeRetrieveModal}
                  >
                    No
                  </button>
                  <button
                    className="bg-[#161F55] text-white px-10 py-2 rounded-2xl"
                    onClick={retrieveAppointment}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Success Delete Message */}
          {showSuccessDelete && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="relative">
                {/* Close Icon - outside the white box */}
                <img
                  src="/assets/icons/x_icon.svg"
                  alt="Close"
                  onClick={closeSuccessDelete}
                  className="w-10 h-10 absolute -top-6 -right-6 cursor-pointer"
                />

                {/* Modal Box */}
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <div className="flex flex-col items-center">
                    <img
                      src="/assets/icons/check_icon.svg"
                      alt="Check icon"
                      className="w-20 h-20 mb-8"
                    />
                    <p className="text-xl font-semibold text-center">
                      Appointment has been successfully deleted.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Success Retrieve Message */}
          {showSuccessRetrieve && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="relative">
                {/* Close Icon - outside the white box */}
                <img
                  src="/assets/icons/x_icon.svg"
                  alt="Close"
                  onClick={closeSuccessRetrieve}
                  className="w-10 h-10 absolute -top-6 -right-6 cursor-pointer"
                />

                {/* Modal Box */}
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <div className="flex flex-col items-center">
                    <img
                      src="/assets/icons/check_icon.svg"
                      alt="Check icon"
                      className="w-20 h-20 mb-8"
                    />
                    <p className="text-xl font-semibold text-center">
                      Appointment has been successfully retrieved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bulk Delete Modal */}
          {isBulkDeleteModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-70 z-50">
              <div className="bg-white p-20 rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4">
                  Are you sure you want to delete {selectedRows.length} selected appointment{selectedRows.length > 1 ? 's' : ''}?
                </h2>
                <div className="flex justify-center gap-10 mt-10">
                  <button
                    className="bg-gray-300 text-[#161F55] px-10 py-2 rounded-2xl"
                    onClick={closeBulkDeleteModal}
                  >
                    No
                  </button>
                  <button
                    className="bg-[#161F55] text-white px-10 py-2 rounded-2xl"
                    onClick={deleteBulkAppointments}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Bulk Retrieve Modal */}
          {isRetrieveModalOpen && selectedRows.length > 0 && (
            <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-70 z-50">
              <div className="bg-white p-20 rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4">
                  Are you sure you want to retrieve {selectedRows.length} selected appointment{selectedRows.length > 1 ? 's' : ''}?
                </h2>
                <div className="flex justify-center gap-10 mt-10">
                  <button
                    className="bg-gray-300 text-[#161F55] px-10 py-2 rounded-2xl"
                    onClick={closeRetrieveModal}
                  >
                    No
                  </button>
                  <button
                    className="bg-[#161F55] text-white px-10 py-2 rounded-2xl"
                    onClick={retrieveBulkAppointments}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tooltips */}
          <Tooltip id="retrieve-tooltip" />
          <Tooltip id="delete-tooltip" />
        </main>
      </div>
    </div>
  );
};

export default Archived;
