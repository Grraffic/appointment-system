import Sidebar from "../../../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useFeedback from "./hooks/useFeedback";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Feedback = () => {
  const {
    isSidebarOpen,
    toggleSidebar,
    currentPage,
    calculatedTotalPages,
    pageNumbers,
    handleNextPage,
    handlePreviousPage,
    handlePageChange,
    handleSortChange,
    sortOrder,
    currentFeedback,
    loading,
    error,
  } = useFeedback();

  const getInitials = (name) =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();

  const getRandomColor = (name) => {
    const colors = [
      "bg-green-500",
      "bg-blue-500",
      "bg-red-500",
      "bg-purple-500",
      "bg-yellow-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-orange-500",
      "bg-teal-500",
    ];
    const index = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  return (
    <div className="flex h-screen font-LatoRegular">
      <main className="flex-1 flex flex-row">
        {/* Sidebar */}
        <div className={`${isSidebarOpen ? "w-[300px]" : "w-[100px]"} z-20`}>
          <Sidebar isSidebarOpen={isSidebarOpen} />
        </div>

        {/* Background Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url("/assets/image/BackGround.png")` }}
        >
          <div className="absolute inset-0 bg-[#161f55] bg-opacity-90"></div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto z-10 ">
          <div className="h-auto ">
            <Header
              toggleSidebar={toggleSidebar}
              isSidebarOpen={isSidebarOpen}
              title="User Feedback"
            />
            <section className="min-h-[calc(100vh-160px)] z-10 rounded-md shadow-md max-w-[1600px] mx-auto">
              {/* Header */}
              <div
                className="bg-white my-6 rounded-md py-10 p-6"
                style={{ minHeight: "120px" }}
              >
                <div className="text-[#161F55] mb-6">
                  <h2 className="text-3xl tracking-[5px] mb-2">
                    User Feedback
                  </h2>
                  <div className="border-b-4 border-[#F3BC62] w-[260px]" />
                </div>

                {/* Sorting and Pagination */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <label htmlFor="sort" className="text-sm text-[#000]">
                      Sort by:
                    </label>
                    <select
                      id="sort"
                      value={sortOrder}
                      onChange={handleSortChange}
                      className="text-sm border border-[#000] rounded-sm text-[#000]"
                    >
                      <option value="newest">Newest</option>
                      <option value="oldest">Oldest</option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <button
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      className="border px-3 py-1 text-[#161F55] rounded-l-md hover:bg-gray-100 disabled:opacity-50"
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
                      className="border px-3 py-1 text-[#161F55] rounded-r-md hover:bg-gray-100 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>

              {/* Feedback List */}
              <div className="bg-white rounded-lg shadow-lg mb-8">
                <div className="p-6 min-h-[400px] flex flex-col">
                  {loading ? (
                    <div className="text-center flex-1 flex items-center justify-center">
                      Loading feedback...
                    </div>
                  ) : error ? (
                    <div className="text-center text-red-500 flex-1 flex items-center justify-center">
                      {error}
                    </div>
                  ) : currentFeedback.length === 0 ? (
                    <div className="text-center flex-1 flex items-center justify-center">
                      No feedback available
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                      {currentFeedback.map((fb) => (
                        <div
                          key={fb._id}
                          className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm max-w-xl mx-auto"
                        >
                          {/* Container for initials, name, divider, and stars horizontally */}
                          <div className="flex items-center justify-center gap-6">
                            {/* Initials */}
                            <div
                              className={`w-16 h-16 flex items-center justify-center rounded-full text-white text-xl font-bold ${getRandomColor(
                                fb.name
                              )}`}
                            >
                              {getInitials(fb.name)}
                            </div>

                            {/* Name */}
                            <div className="text-[#1A2341] font-semibold text-base leading-5 text-center whitespace-nowrap">
                              <div>{fb.name.split(" ")[0]}</div>
                              <div>{fb.name.split(" ").slice(1).join(" ")}</div>
                            </div>

                            {/* Divider Line (vertical divider) */}
                            <div className="border-l-4 border-[#F3BC62] h-16"></div>

                            {/* Ratings (vertical stack inside horizontal container) */}
                            <div className="flex flex-col gap-2">
                              {Object.entries(fb.ratings).map(
                                ([category, rating]) => {
                                  const formattedLabel = category
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, (str) => str.toUpperCase());

                                  return (
                                    <div
                                      key={category}
                                      className="flex items-center gap-2 justify-center whitespace-nowrap"
                                    >
                                      <span className="text-[#1A2341] text-sm w-28 text-right">
                                        {formattedLabel}
                                      </span>
                                      <div className="flex gap-[2px]">
                                        {[...Array(5)].map((_, i) => (
                                          <FaStar
                                            key={i}
                                            className={`text-sm ${
                                              i < rating
                                                ? "text-[#2B4EFF]"
                                                : "text-gray-300"
                                            }`}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pagination Arrows */}
                <div className="flex justify-end items-center p-4 border-t">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      className="p-2 text-white bg-[#161F55] hover:bg-blue-500 rounded-full disabled:cursor-not-allowed"
                    >
                      <IoIosArrowBack className="text-2xl" />
                    </button>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === calculatedTotalPages}
                      className="p-2 text-white bg-[#161F55] hover:bg-blue-500 rounded-full disabled:cursor-not-allowed"
                    >
                      <IoIosArrowForward className="text-2xl" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Feedback;
