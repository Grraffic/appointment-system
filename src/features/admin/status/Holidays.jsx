import { BsTrash3 } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import Sidebar from "/src/components/Sidebar";
import Header from "/src/features/admin/components/Header";
import Footer from "/src/features/admin/components/Footer";
import { Tooltip } from "react-tooltip";
import useHolidays from "./hooks/useHolidays";
import { FaSearch } from "react-icons/fa";

const formatDateToYyyyMmDd = (dateString) => {
  if (!dateString || typeof dateString !== "string") {
    return "";
  }
  try {
    const parts = dateString.split("-");
    if (parts.length === 3) {
      const [year, month, day] = parts;
      if (
        year.length === 4 &&
        month.length === 2 &&
        day.length === 2 &&
        !isNaN(parseInt(year)) &&
        !isNaN(parseInt(month)) &&
        !isNaN(parseInt(day))
      ) {
        return `${year}/${month}/${day}`;
      }
    }
    const dateObj = new Date(
      dateString.includes("T") ? dateString : dateString + "T00:00:00"
    );
    if (isNaN(dateObj.getTime())) {
      return "Invalid Date";
    }
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  } catch (e) {
    console.error("Error formatting date:", e, "Input:", dateString);
    return "Invalid Date";
  }
};

const Holidays = () => {
  const {
    isSidebarOpen,
    isAddModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    newHoliday,
    holidays,
    fieldErrors,
    addModalError,
    editModalError,
    toggleSidebar,
    openAddModal,
    closeAddModal,
    openEditModal,
    closeEditModal,
    handleInputChange,
    addHolidays,
    updateHolidays,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
    totalFilteredEntries,
    searchTerm,
    handleSearchChange,
    currentPage,
    entriesPerPage,
    calculatedTotalPages,
    handleNextPage,
    handlePreviousPage,
    handlePageChange,
    handleEntriesPerPageChange,
  } = useHolidays();

  const startEntry =
    totalFilteredEntries > 0 ? (currentPage - 1) * entriesPerPage + 1 : 0;
  const endEntry = Math.min(currentPage * entriesPerPage, totalFilteredEntries);

  const pageNumbers = [];
  if (calculatedTotalPages > 0) {
    for (let i = 1; i <= calculatedTotalPages; i++) {
      pageNumbers.push(i);
    }
  }

  return (
    <div className="flex h-screen font-LatoRegular">
      <div className={`${isSidebarOpen ? "w-[300px]" : "w-[100px]"}`}>
        <Sidebar isSidebarOpen={isSidebarOpen} />
      </div>

      <div className="flex-1 overflow-y-auto ">
        <main className="h-auto">
          <Header
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
            title="Holidays Record"
          />
          <section className="min-h-[calc(100vh-160px)] z-10 bg-white p-5 my-5">
            <div className="bg-[#D9D9D9] h-52 m-4 pt-2 rounded-md">
              <div className="text-[#161F55] flex justify-between px-3 pt-2 ml-3">
                <h2 className="text-3xl font-bold tracking-[5px] pt-1">
                  LIST OF HOLIDAYS
                  <div className="border-b-4 border-[#F3BC62] w-[330px] my-3"></div>
                </h2>
                <div>
                  <button
                    className="bg-[#161F55] text-white px-5 py-1 mt-2 mr-2 rounded-md hover:bg-blue-800"
                    onClick={openAddModal}
                  >
                    + ADD
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center mt-16 ml-4 mr-5">
                <div className="text-[#161F55] font-semibold text-[18px] flex items-center">
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
                    id="search-holidays"
                    type="search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="border-[#989898] py-2 bg-white text-[#161F55] pl-10 pr-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#161F55]"
                    placeholder="Search"
                  />
                </div>
              </div>
            </div>

            <table
              className="text-[18px] w-[97%] border-collapse text-[#161F55] mt-8 mx-auto"
              style={{ tableLayout: "fixed" }}
            >
              <thead>
                <tr className="bg-gray-200 text-center">
                  <th className="border p-5 w-[10%]">NO.</th>
                  <th className="border p-5 w-[25%]">DATE</th>
                  <th className="border p-5 w-[45%]">DESCRIPTION</th>
                  <th className="border p-5 w-[20%]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {holidays.length > 0 ? (
                  holidays.map((holiday, index) => (
                    <tr
                      key={holiday.id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : ""
                      } text-center`}
                    >
                      <td className="border p-5">
                        {(currentPage - 1) * entriesPerPage + index + 1}
                      </td>
                      <td className="border p-5">
                        {formatDateToYyyyMmDd(holiday.date)}
                      </td>
                      <td className="border p-5 text-center">
                        {holiday.description}
                      </td>
                      <td className="border p-5">
                        <div className="flex gap-2 justify-center">
                          <div
                            data-tooltip-id="edit-tooltip"
                            data-tooltip-content="Edit"
                            className="bg-[#CF5824] p-2 rounded cursor-pointer hover:bg-orange-700"
                            onClick={() => openEditModal(holiday)}
                          >
                            <FaEdit className="text-white" />
                          </div>
                          <div
                            data-tooltip-id="delete-tooltip"
                            data-tooltip-content="Delete"
                            className="bg-[#6F6F6F] p-2 rounded cursor-pointer hover:bg-gray-700"
                            onClick={() => openDeleteModal(holiday.id)}
                          >
                            <BsTrash3 className="text-white" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-10 text-gray-500">
                      {searchTerm
                        ? "No holidays match your search."
                        : "No holidays to display."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {calculatedTotalPages > 0 && (
              <div className="flex justify-between items-center mt-10 text-[18px] px-4 mx-auto w-[97%]">
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
          <Footer />
        </main>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-50 z-50">
          <div className="bg-white p-10 sm:p-20 rounded-xl shadow-md w-11/12 max-w-lg">
            <h2 className="text-xl font-bold mb-4 uppercase">Add Holiday</h2>
            <div className="border-b-2 border-[#F3BC62] w-full max-w-xs my-2"></div>
            <div className="w-full">
              <label htmlFor="add-date" className="block mb-1">
                DATE
              </label>
              <input
                id="add-date"
                name="date"
                type="date"
                value={newHoliday.date}
                onChange={handleInputChange}
                className={`border w-full p-2 mb-2 ${
                  fieldErrors.date ? "border-red-500" : ""
                }`}
              />
              <label htmlFor="add-description" className="block mb-1">
                DESCRIPTION
              </label>
              <input
                id="add-description"
                name="description"
                type="text"
                value={newHoliday.description}
                onChange={handleInputChange}
                placeholder="Description"
                className={`border w-full p-2 mb-4 ${
                  fieldErrors.description ? "border-red-500" : ""
                }`}
              />
            </div>
            {/* Placeholder for error message to prevent button movement */}
            <div className="mt-4 h-6 text-center">
              {addModalError && (
                <p className="text-red-500 text-sm">{addModalError}</p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
              <button
                className="bg-gray-300 text-black px-8 py-2 rounded-2xl w-full sm:w-auto"
                onClick={closeAddModal}
              >
                Cancel
              </button>
              <button
                className="bg-[#161f55] text-white px-8 py-2 rounded-2xl w-full sm:w-auto"
                onClick={addHolidays}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-70 z-50">
          <div className="bg-white p-10 sm:p-20 rounded-xl shadow-md w-11/12 max-w-lg">
            <h2 className="text-xl font-bold mb-4 uppercase">Update Holiday</h2>
            <div className="border-b-2 border-[#F3BC62] w-full max-w-xs my-2"></div>
            <div className="w-full">
              <label htmlFor="edit-date" className="block mb-1">
                Date
              </label>
              <input
                id="edit-date"
                name="date"
                type="date"
                value={newHoliday.date}
                onChange={handleInputChange}
                className={`border w-full p-2 mb-2 ${
                  fieldErrors.date ? "border-red-500" : ""
                }`}
              />
              <label htmlFor="edit-description" className="block mb-1">
                Description
              </label>
              <input
                id="edit-description"
                name="description"
                type="text"
                value={newHoliday.description}
                onChange={handleInputChange}
                placeholder="Description"
                className={`border w-full p-2 mb-4 ${
                  fieldErrors.description ? "border-red-500" : ""
                }`}
              />
            </div>
            {/* Placeholder for error message to prevent button movement */}
            <div className="mt-4 h-6 text-center">
              {editModalError && (
                <p className="text-red-500 text-sm">{editModalError}</p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
              <button
                className="bg-gray-300 text-black px-8 py-2 rounded-2xl w-full sm:w-auto"
                onClick={closeEditModal}
              >
                Cancel
              </button>
              <button
                className="bg-[#161f55] text-white px-8 py-2 rounded-2xl w-full sm:w-auto"
                onClick={updateHolidays}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-70 z-50">
          <div className="bg-white p-10 rounded-md shadow-md text-center w-11/12 max-w-md">
            <h2 className="text-lg font-bold mb-4">
              Are you sure you want to delete this Holiday?
            </h2>
            <div className="flex flex-col sm:flex-row justify-end mt-8 gap-4">
              <button
                className="bg-[#C9C9C9] text-[#161F55] px-6 py-1 rounded-[20px] w-full sm:w-auto"
                onClick={closeDeleteModal}
              >
                No
              </button>
              <button
                className="bg-[#161F55] text-white px-6 py-1 rounded-[20px] w-full sm:w-auto"
                onClick={confirmDelete}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      <Tooltip id="edit-tooltip" />
      <Tooltip id="delete-tooltip" />
    </div>
  );
};

export default Holidays;
