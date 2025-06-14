import Sidebar from "/src/components/Sidebar";
import Header from "/src/features/admin/components/Header";
import Footer from "/src/features/admin/components/Footer";
import useStudents from "./hooks/useStudents";
import { FaSearch } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

const Students = () => {
  const API_URL = `${
    import.meta.env.VITE_API_URL
  }/api/document-requests/docs-with-details`;

  // Custom CSS for tooltips
  const tooltipStyle = `
  /* The parent element (now the <td>) needs to be the positioning context */
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
    handleEntriesPerPageChange,
    handleNextPage,
    handlePreviousPage,
    handlePageChange,

    // Search state
    searchTerm,

    // Sidebar states and handlers
    isSidebarOpen,
    toggleSidebar,
  } = useStudents(API_URL);

  return (
    <div className="flex h-screen font-LatoRegular">
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
            title="Students/Alumni's Records Request"
          />
          <section className="min-h-[calc(100vh-160px)] z-10 bg-white p-5 my-5">
            <div className="bg-[#D9D9D9] h-52 m-4 pt-2 rounded-md">
              <div className="text-[#161F55] px-3 pt-2 ml-3">
                <h2 className="text-3xl font-bold tracking-[5px] pt-1">
                  LIST OF STUDENTS/ALUMNI'S RECORDS REQUEST
                  <div className="border-b-4 border-[#F3BC62] w-[900px] my-3"></div>
                </h2>
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
                    id="search"
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
              className="text-[15px] w-[97%] border-collapse text-[#161F55] mt-8 mx-auto"
              style={{ tableLayout: "fixed" }}
            >
              <thead>
                <tr className="bg-gray-200 text-center">
                  <th className="border p-5 w-[12%]">TRANSACTION NO.</th>
                  <th className="border p-5 w-[15%]">NAME</th>
                  <th className="border p-5 w-[10%]">LAST S.Y. ATTENDED</th>
                  <th className="border p-5 w-[12%]">
                    PROGRAM/GRADE/
                    <br />
                    STRAND
                  </th>
                  <th className="border p-5 w-[10%]">CONTACT NO.</th>
                  <th className="border p-5 w-[13%]">EMAIL ADDRESS</th>
                  <th className="border p-5 w-[12%]">PURPOSE</th>
                  <th className="border p-5 w-[10%]">ATTACHMENT PROOF</th>
                  <th className="border p-5 w-[8%]">REQUEST</th>
                  <th className="border p-5 w-[8%]">DATE OF REQUEST</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="11" className="text-center p-5">
                      Loading student records...
                    </td>
                  </tr>
                )}
                {error && (
                  <tr>
                    <td colSpan="11" className="text-center p-5 text-red-500">
                      Error: {error}
                    </td>
                  </tr>
                )}
                {!loading && !error && filteredAppointments.length === 0 && (
                  <tr>
                    <td colSpan="11" className="text-center p-5">
                      {searchTerm
                        ? "No matching records found."
                        : "No student records found."}
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
                    .map((data, index) => {
                      const charLimit = 20;
                      const isTransactionLong =
                        data.transactionNumber?.length > charLimit;
                      const isNameLong = data.name?.length > charLimit;
                      const isLastSYLong = data.lastSY?.length > charLimit;
                      const isProgramLong = data.program?.length > charLimit;
                      const isContactLong = data.contact?.length > charLimit;
                      const isEmailLong = data.email?.length > charLimit;
                      const isPurposeLong = data.purpose?.length > charLimit;
                      const isRequestLong = data.request?.length > charLimit;
                      const formattedDate = new Date(
                        data.date
                      ).toLocaleDateString();

                      return (
                        <tr
                          key={data.transactionNumber || index}
                          className={`${
                            index % 2 === 0 ? "bg-gray-100" : ""
                          } text-center`}
                        >
                          <td
                            className="border p-5 text-[#354CCE] font-bold"
                            data-tooltip={
                              isTransactionLong ? data.transactionNumber : null
                            }
                          >
                            <div
                              className={isTransactionLong ? "truncate" : ""}
                            >
                              {data.transactionNumber}
                            </div>
                          </td>
                          <td
                            className="border p-5"
                            data-tooltip={isNameLong ? data.name : null}
                          >
                            <div className={isNameLong ? "truncate" : ""}>
                              {data.name}
                            </div>
                          </td>
                          <td
                            className="border p-5"
                            data-tooltip={isLastSYLong ? data.lastSY : null}
                          >
                            <div className={isLastSYLong ? "truncate" : ""}>
                              {data.lastSY}
                            </div>
                          </td>
                          <td
                            className="border p-5"
                            data-tooltip={isProgramLong ? data.program : null}
                          >
                            <div className={isProgramLong ? "truncate" : ""}>
                              {data.program}
                            </div>
                          </td>
                          <td
                            className="border p-5"
                            data-tooltip={isContactLong ? data.contact : null}
                          >
                            <div className={isContactLong ? "truncate" : ""}>
                              {data.contact}
                            </div>
                          </td>
                          <td
                            className="border p-5"
                            data-tooltip={isEmailLong ? data.email : null}
                          >
                            <div className={isEmailLong ? "truncate" : ""}>
                              {data.email}
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
                            <div className={isPurposeLong ? "truncate" : ""}>
                              {data.purpose || "No purpose specified"}
                            </div>
                          </td>
                          <td className="border p-5">
                            {data.attachment &&
                            data.attachment !== "No attachments" ? (
                              <div className="flex flex-col gap-1">
                                {data.attachment
                                  .split(", ")
                                  .map((filename, fileIndex) => {
                                    const isFilenameLong = filename.length > 15;
                                    return (
                                      <div
                                        key={fileIndex}
                                        data-tooltip={
                                          isFilenameLong ? filename : null
                                        }
                                        className="relative"
                                      >
                                        <div
                                          className={`${
                                            isFilenameLong ? "truncate" : ""
                                          } text-blue-600 hover:underline cursor-pointer text-sm`}
                                        >
                                          {filename}
                                        </div>
                                      </div>
                                    );
                                  })}
                              </div>
                            ) : (
                              <span className="text-gray-500 text-sm">
                                No attachments
                              </span>
                            )}
                          </td>
                          <td
                            className="border p-5"
                            data-tooltip={isRequestLong ? data.request : null}
                          >
                            <div className={isRequestLong ? "truncate" : ""}>
                              {data.request}
                            </div>
                          </td>
                          <td className="border p-5">
                            <div>{formattedDate}</div>
                          </td>
                        </tr>
                      );
                    })}
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

      {/* Tooltips */}
      <Tooltip id="email-tooltip" />
      <Tooltip id="purpose-tooltip" />
    </div>
  );
};

export default Students;
