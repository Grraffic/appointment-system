import { BsTrash3 } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import Sidebar from "/src/components/Sidebar";
import Header from "/src/features/admin/components/Header";
import Footer from "/src/features/admin/components/Footer";
import { Tooltip } from "react-tooltip";
import useSchedule from "./hooks/useSchedule";
import { FaSearch } from "react-icons/fa";

const Schedule = () => {
  const {
    isSidebarOpen,
    isAddModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    newSchedule,
    schedules,
    toggleSidebar,
    openAddModal,
    closeAddModal,
    openEditModal,
    closeEditModal,
    handleInputChange,
    addSchedule,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
    handleUpdateSchedule,
    editModalError,
    addModalError,
    fieldErrors,
  } = useSchedule();

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
            title="Schedule Records"
          />
          <section className="h-[1200px] z-10 bg-white p-5 my-5">
            {/* ... (rest of your table and other UI) ... */}
            <div className="bg-[#D9D9D9] h-52 m-4 pt-2">
              <div className="text-[#161F55] flex justify-between px-3 pt-2 ml-3">
                <h2 className="text-3xl font-bold tracking-[5px] pt-1">
                  LIST OF SCHEDULES
                  <div className="border-b-4 border-[#F3BC62] w-[360px] my-3"></div>
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

              <div className="flex justify-between items-center mt-16 ml-4">
                <div className="text-[#161F55] font-semibold text-[18px]">
                  <label htmlFor="show" className="mr-2">
                    SHOW
                  </label>
                  <input
                    id="show"
                    name="show"
                    type="number"
                    min="1"
                    max="10"
                    defaultValue="1"
                    className="text-center always-show-spinner"
                  />
                  <span className="ml-2">ENTRIES</span>
                </div>
                <div className="relative">
                  <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="search"
                    type="search"
                    className="border-[#989898] py-2 bg-white text-[#161F55] mr-5 pl-8"
                    placeholder="Search"
                  />
                </div>
              </div>
            </div>
            <table className="text-[18px] w-[97%] border-collapse text-[#161F55] mt-8 mx-auto">
              <thead>
                <tr className="bg-gray-200 text-center">
                  <th className="border p-4">NO.</th>
                  <th className="border p-4">
                    SLOTS
                    <br />
                    (Available / Total)
                  </th>
                  <th className="border p-4">DATE</th>
                  <th className="border p-4">START TIME</th>
                  <th className="border p-4">END TIME</th>
                  <th className="border p-4">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {/* Ensure schedules is populated before mapping, or handle empty/loading state */}
                {schedules && schedules.length > 0
                  ? schedules.slice(0, 9).map((schedule, rowIndex) => (
                      <tr
                        key={schedule?.id || rowIndex}
                        className={`${
                          rowIndex % 2 === 0 ? "bg-gray-100" : ""
                        } text-center`}
                      >
                        <td className="border p-5">
                          {schedule?.no || rowIndex + 1}
                        </td>{" "}
                        {/* Display row number or actual 'no' */}
                        <td
                          className={`border p-5 ${
                            parseInt(schedule?.availableSlots || 0) === 0
                              ? "bg-red-100 text-red-700 font-semibold"
                              : parseInt(schedule?.availableSlots || 0) <= 2
                              ? "bg-yellow-100 text-yellow-700 font-semibold"
                              : ""
                          }`}
                        >
                          {schedule?.availableSlots || "0"} /{" "}
                          {schedule?.slots || "0"}
                          {parseInt(schedule?.availableSlots || 0) === 0 && (
                            <span className="block text-xs text-red-600">
                              Fully Booked
                            </span>
                          )}
                        </td>
                        <td className="border p-5">{schedule?.date || ""}</td>
                        <td className="border p-5">
                          {schedule?.startTime || ""}
                        </td>
                        <td className="border p-5">
                          {schedule?.endTime || ""}
                        </td>
                        <td className="border p-5">
                          <div className="flex gap-2 justify-center">
                            <div
                              data-tooltip-id="edit-tooltip"
                              data-tooltip-content="Edit"
                              className="bg-[#CF5824] p-2 rounded cursor-pointer hover:bg-orange-700"
                              onClick={() => openEditModal(rowIndex)}
                            >
                              <FaEdit className="text-white" />
                            </div>
                            <div
                              data-tooltip-id="delete-tooltip"
                              data-tooltip-content="Delete"
                              className="bg-[#6F6F6F] p-2 rounded cursor-pointer hover:bg-gray-700"
                              onClick={() => openDeleteModal(rowIndex)}
                            >
                              <BsTrash3 className="text-white" />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  : Array.from({ length: 9 }).map((_, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className={`${
                          rowIndex % 2 === 0 ? "bg-gray-100" : ""
                        } text-center`}
                      >
                        <td className="border p-5 h-[69px]" colSpan={6}>
                          {" "}
                          {/* Adjust height and colSpan as needed */}
                          {rowIndex === 0 &&
                          (!schedules || schedules.length === 0)
                            ? "No schedules available"
                            : ""}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-10 text-[18px] pl-4">
              <span className="text-[#161F55]">
                SHOWING 1 TO {schedules ? Math.min(schedules.length, 10) : 0} OF{" "}
                {schedules ? schedules.length : 0} ENTRIES{" "}
                {/* Dynamic counts */}
              </span>
              <div className="mr-6">
                <button className="border p-1 text-[#161F55]">Previous</button>
                <button className="border bg-[#161F55] text-[#D9D9D9] w-[40px] h-[35px]">
                  1
                </button>
                <button className="border p-1 text-[#161F55]">Next</button>
              </div>
            </div>
          </section>
          <Footer />
        </main>
      </div>

      {/* ADD MODAL (no changes needed here for this specific request) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-50 z-50">
          <div className="bg-white p-20 rounded-xl shadow-md">
            <h2 className="text-xl tracking-wider font-LatoBold text-[#161f55] mb-2">
              ADD SCHEDULE
            </h2>
            <div className="border-b-4 border-[#F3BC62] w-[170px] my-2"></div>
            <div className="w-96 mt-4">
              <p>SLOTS</p>
              <input
                name="slots"
                type="number"
                value={newSchedule.slots}
                onChange={handleInputChange}
                placeholder="Enter number of slots"
                className={`border w-full p-2 mb-2 ${
                  fieldErrors.slots ? "border-red-500" : ""
                }`}
              />
              <p>DATE</p>
              <input
                name="date"
                type="date"
                value={newSchedule.date}
                onChange={handleInputChange}
                placeholder="Date"
                className={`border w-full p-2 mb-2 ${
                  fieldErrors.date ? "border-red-500" : ""
                }`}
              />
              <p>START TIME</p>
              <input
                name="startTime"
                type="time"
                value={newSchedule.startTime}
                onChange={handleInputChange}
                placeholder="Start Time"
                className={`border w-full p-2 mb-2 ${
                  fieldErrors.startTime ? "border-red-500" : ""
                }`}
              />
              <p>END TIME</p>
              <input
                name="endTime"
                type="time"
                value={newSchedule.endTime}
                onChange={handleInputChange}
                placeholder="End Time"
                className={`border w-full p-2 mb-2 ${
                  fieldErrors.endTime ? "border-red-500" : ""
                }`}
              />
            </div>
            {/* Placeholder for error message to prevent button movement */}
            <div className="mt-4 h-6 text-center">
              {addModalError && (
                <p className="text-red-500 text-sm">{addModalError}</p>
              )}
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                className="bg-gray-300 text-black px-8 py-2 rounded-2xl"
                onClick={closeAddModal}
              >
                Cancel
              </button>
              <button
                className="bg-[#161f55] text-white px-8 py-2 rounded-2xl"
                onClick={addSchedule}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-70 z-50">
          <div className="bg-white p-20 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4 uppercase">
              Update Schedule
            </h2>{" "}
            {/* Consider consistent styling with ADD SCHEDULE */}
            <div className="border-b-2 border-[#F3BC62] w-60 my-2"></div>
            <div className="w-96">
              <p>Edit Slots</p>
              <input
                name="slots"
                type="number"
                value={newSchedule.slots}
                onChange={handleInputChange}
                placeholder="Enter number of slots"
                className={`border w-full p-2 mb-2 ${
                  fieldErrors.slots ? "border-red-500" : ""
                }`}
              />
              <p>Date</p>
              <input
                name="date"
                type="date"
                value={newSchedule.date}
                onChange={handleInputChange}
                placeholder="Date"
                className={`border w-full p-2 mb-2 ${
                  fieldErrors.date ? "border-red-500" : ""
                }`}
              />
              <p>Start Time</p>
              <input
                name="startTime"
                type="time"
                value={newSchedule.startTime}
                onChange={handleInputChange}
                placeholder="Start Time"
                className={`border w-full p-2 mb-2 ${
                  fieldErrors.startTime ? "border-red-500" : ""
                }`}
              />
              <p>End Time</p>
              <input
                name="endTime"
                type="time"
                value={newSchedule.endTime}
                onChange={handleInputChange}
                placeholder="End Time"
                className={`border w-full p-2 mb-2 ${
                  fieldErrors.endTime ? "border-red-500" : ""
                }`}
              />
            </div>
            {/* Placeholder for error message to prevent button movement */}
            <div className="mt-4 h-6 text-center">
              {editModalError && (
                <p className="text-red-500 text-sm">{editModalError}</p>
              )}
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="bg-gray-300 text-black px-8 py-2 rounded-2xl"
                onClick={closeEditModal}
              >
                Cancel
              </button>
              <button
                className="bg-[#161f55] text-white px-8 py-2 rounded-2xl"
                onClick={handleUpdateSchedule}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL (no changes needed here for this specific request) */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-70 z-50">
          <div className="bg-white p-12 rounded-md shadow-md text-center">
            <h2 className="text-lg font-bold mb-4">
              Are you sure you want to delete this Schedule?
            </h2>
            <div className="flex justify-end mt-8 gap-4">
              <button
                className="bg-[#C9C9C9] text-[#161F55] px-8 py-1 rounded-[20px]"
                onClick={closeDeleteModal}
              >
                No
              </button>
              <button
                className="bg-[#161F55] text-white px-8 py-1 rounded-[20px]"
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

export default Schedule;
