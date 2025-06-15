import dayjs from "dayjs";
import Sidebar from "/src/components/Sidebar";
import Header from "/src/features/admin/components/Header";
import Footer from "/src/features/admin/components/Footer";
import useRegistrarHome from "./hooks/useRegistrarHome";

const RegistrarHome = () => {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    currentDate,
    toggleSidebar,
    daysInMonth,
    startOfMonth,
    monthName,
    year,
    holidays,
    currentMonthHolidays,
    events,
    handlePrevMonth,
    handleNextMonth,
    isWeekend,
    stats,
  } = useRegistrarHome();
  return (
    <div className="flex h-screen font-LatoRegular">
      {/* Sidebar */}
      <div
        className={`sidebar-container ${
          isSidebarOpen ? "w-[300px]" : "w-[100px]"
        } z-20`}
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      {/* Background Image with Dark Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url("/assets/image/BackGround.png")`,
        }}
      >
        <div className="absolute inset-0 bg-[#161f55] bg-opacity-90"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto z-10 relative">
        <Header
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          title="Registrar Office Dashboard"
        />

        <div className="p-6">
          <section className="h-auto bg-white max-w-[1300px] mx-auto p-5 my-5 rounded-lg shadow-lg">
            {/* Overview of the Month */}
            <div className="p-6">
              <h2 className="text-3xl font-LatoRegular tracking-[5px] text-[#000]">
                Overview of the Month
              </h2>
              <div className="border-b-4 border-[#F3BC62] w-[410px] my-3"></div>

              <div className="grid grid-cols-3 gap-6 mt-6">
                {/* Appointments Card */}
                <div className="bg-[#FFFFFF] border-2 border-[#DCE0E5] p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-center">
                    {/* Circle */}
                    <div className="w-32 h-32 rounded-full flex items-center justify-center bg-[#8BE68E] bg-opacity-60 text-[#299057] text-[30px] font-LatoBold">
                      {stats.APPROVED || 0}
                    </div>
                    {/* Appointments */}
                    <div className="ml-4 text-left">
                      <h3 className="text-[#299057] text-xl font-semibold">
                        Approved
                      </h3>
                      <div className="mt-2 text-sm">
                        <p className="text-[#000] text-[13px] font-LatoRegular">
                          <span className="text-[#299057] text-[16px] opacity-50">
                            ●
                          </span>{" "}
                          Morning{" "}
                          <span className="ml-4 font-LatoBold">
                            {stats.morning?.APPROVED || 0}
                          </span>
                        </p>
                        <p className="text-[#000] text-[13px] font-LatoRegular">
                          <span className="text-[#299057] text-[16px] opacity-50">
                            ●
                          </span>{" "}
                          Afternoon{" "}
                          <span className="ml-2 font-LatoBold">
                            {stats.afternoon?.APPROVED || 0}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pending Card */}
                <div className="bg-[#FFFFFF] border-2 border-[#DCE0E5] p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-center">
                    {/* Circle */}
                    <div className="w-32 h-32 rounded-full flex items-center justify-center bg-[#E5E68B] bg-opacity-60 text-[#A0A112] text-[30px] font-LatoBold">
                      {stats.PENDING || 0}
                    </div>
                    {/* Content */}
                    <div className="ml-4 text-left">
                      <h3 className="text-[#A0A112] text-xl font-semibold">
                        Pendings
                      </h3>
                      <div className="mt-2 text-sm">
                        <p className="text-[#000] text-[13px] font-LatoRegular">
                          <span className="text-[#E5E68B] text-[16px] ">●</span>{" "}
                          Morning{" "}
                          <span className="ml-4 font-LatoBold">
                            {stats.morning?.PENDING || 0}
                          </span>
                        </p>
                        <p className="text-[#000] text-[13px] font-LatoRegular">
                          <span className="text-[#E5E68B] text-[16px] ">●</span>{" "}
                          Afternoon{" "}
                          <span className="ml-2 font-LatoBold">
                            {stats.afternoon?.PENDING || 0}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Completed Card */}
                <div className="bg-[#FFFFFF] border-2 border-[#DCE0E5] p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-center">
                    {/* Circle */}
                    <div className="w-32 h-32 rounded-full flex items-center justify-center bg-[#354CCE] bg-opacity-60 text-[#354CCE] text-[30px] font-LatoBold">
                      {stats.COMPLETED || 0}
                    </div>
                    {/* Content */}
                    <div className="ml-4 text-left">
                      <h3 className="text-[#354CCE] text-xl font-semibold">
                        Completed
                      </h3>
                      <div className="mt-2 text-sm">
                        <p className="text-[#000] text-[13px] font-LatoRegular">
                          <span className="text-[#354CCE] text-[16px] ">●</span>{" "}
                          Morning{" "}
                          <span className="ml-4 font-LatoBold">
                            {stats.morning?.COMPLETED || 0}
                          </span>
                        </p>
                        <p className="text-[#000] text-[13px] font-LatoRegular">
                          <span className="text-[#354CCE] text-[16px] ">●</span>{" "}
                          Afternoon{" "}
                          <span className="ml-2 font-LatoBold">
                            {stats.afternoon?.COMPLETED || 0}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Calendar and Holidays Section */}
          <section className="bg-white max-w-[1300px] mx-auto p-5 my-5 rounded-lg shadow-lg grid grid-cols-3 gap-6">
            {/* Calendar Section */}
            <div className="col-span-2 p-5 border-2 border-[#161f55] rounded-lg">
              {/* Month Navigation */}
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-3xl font-LatoSemiBold tracking-[5px] text-[#161F55]">
                  {monthName} {year}
                  <div className="border-b-4 border-[#F3BC62]  my-3"></div>
                </h2>
                <div>
                  <button
                    onClick={handlePrevMonth}
                    className="px-4 py-2 mr-2 bg-[#161f55] text-white rounded hover:bg-blue-600"
                  >
                    &lt;
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="px-4 py-2 bg-[#161f55] text-white rounded hover:bg-blue-600"
                  >
                    &gt;
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-[1px] bg-[#161f55] text-center mt-6">
                {/* Days of the Week */}
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day, index) => (
                    <div
                      key={index}
                      className="font-bold text-[#161F55] text-lg bg-white"
                    >
                      {day}
                    </div>
                  )
                )}

                {/* Empty slots for start of the month */}
                {Array.from({ length: startOfMonth }).map((_, index) => (
                  <div key={index} className="bg-white"></div>
                ))}

                {/* Calendar Days */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const dayOfMonth = index + 1;
                  const dateStringForComparison = `${year}-${currentDate.format(
                    "MM"
                  )}-${String(dayOfMonth).padStart(2, "0")}`;
                  const isDayWeekend = isWeekend(dayOfMonth);

                  const holidayInfo = currentMonthHolidays.find(
                    (h) => h.date === dateStringForComparison
                  );

                  const eventInfo =
                    events[currentDate.format("YYYY-MM")]?.[dayOfMonth]; // 'events' is calendarDashboardEvents

                  let dayCellClasses =
                    "p-2 h-[90px] cursor-pointer relative hover:bg-blue-100"; // Base classes
                  let displayItem = null;
                  let itemColor = "";
                  let itemLabel = "";

                  // Determine background and label based on priority: Event > Holiday > Weekend
                  if (eventInfo) {
                    displayItem = "Event";
                    itemLabel = eventInfo.label; // This is the event title
                    itemColor = eventInfo.color;
                    dayCellClasses += " bg-white"; // Explicitly set to white if there's an event
                    // This will be overridden by current day highlight if applicable
                  } else if (holidayInfo) {
                    displayItem = "Holiday";
                    itemLabel = holidayInfo.name || "Holiday";
                    itemColor = "bg-purple-500"; // Standard Holiday color
                    dayCellClasses += " bg-purple-100"; // Background for holiday if no event
                  } else if (isDayWeekend) {
                    // No specific label/item for weekend unless it's also a holiday/event
                    dayCellClasses += " bg-gray-100"; // Background for weekend if no event/holiday
                  } else {
                    // Default for non-event, non-holiday, non-weekend days
                    dayCellClasses += " bg-white";
                  }

                  // Current day highlighting (this will override other bg-colors if it's the current day)
                  if (
                    currentDate.date() === dayOfMonth &&
                    currentDate.month() === dayjs().month() &&
                    currentDate.year() === dayjs().year()
                  ) {
                    // Remove previous background before applying current day highlight
                    dayCellClasses = dayCellClasses.replace(
                      /bg-(white|purple-100|gray-100)/g,
                      ""
                    ); // Remove other BGs
                    dayCellClasses +=
                      " bg-blue-300 font-bold ring-2 ring-blue-500";
                  }

                  return (
                    <div
                      key={`day-${dayOfMonth}`}
                      className={dayCellClasses.trim()} // Apply the constructed classes, trim for safety
                    >
                      {dayOfMonth}
                      {displayItem && ( // If there's a holiday or an event to display
                        <span
                          className={`absolute bottom-1 left-1 right-1 text-center text-xs text-white px-1 py-0.5 rounded ${itemColor}`}
                        >
                          {itemLabel}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Holidays Section */}
            <div className="p-5 border-2 border-[#161f55] rounded-lg">
              <h3 className="text-2xl font-bold tracking-[3px] text-[#161F55]">
                Holidays
              </h3>
              <div className="border-b-4 border-[#F3BC62] w-[120px] my-3"></div>
              {holidays.length > 0 ? (
                <ul className="space-y-2 text-lg max-h-[500px] overflow-y-auto pr-2">
                  {holidays
                    .slice()
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((holiday) => {
                      const displayDate = dayjs(holiday.date).format("MMM DD");

                      return (
                        <li
                          key={holiday.id}
                          className="text-[#161F55] text-base"
                        >
                          <span className="font-semibold">{displayDate}:</span>{" "}
                          {holiday.name}
                        </li>
                      );
                    })}
                </ul>
              ) : (
                <p className="text-gray-500 mt-2 text-base">
                  No holidays scheduled or fetched.
                </p>
              )}
            </div>
          </section>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default RegistrarHome;
