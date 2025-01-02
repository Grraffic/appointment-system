import Buttons from "../components/Buttons";
import Carousel from "../components/Carousel";

const Announcement = () => {
  const calendar = (day, hours) => {
    return (
      <div className="relative min-w-[450px] h-[450px] flex-shrink-0 borders font-LatoRegular">
        <img
          src="src/assets/image/calendar.png"
          alt="calendar icon"
          className="w-full h-full"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-70 p-2 rounded-md">
          <div className="text-center p-1 pt-20 w-[350px] text-[#161F55] tracking-wide">
            <h3 className="text-[32px] font-bold">{day}</h3>
            <div className="border-b-4 border-[#F3BC62] w-full my-4 "></div>
            <p className="text-[50px]">{hours}</p>
          </div>
        </div>
      </div>
    );
  };

  const mobile = () => {
    return (
      <div className="absolute top-[130px] right-0 w-[1500px] z-50 pl-[900px] pointer-events-none">
        <img
          src="src/assets/image/mobile.png"
          alt="mobile icon"
          className="w-full object-contain"
        />
      </div>
    );
  };
  return (
    <>
      <div className="max-w-[1440px] mx-auto font-LatoRegular">
        <div
          className="relative w-full min-h-screen h-[1000px] bg-cover bg-center flex items-end justify-center text-white text-center pb-28"
          style={{
            backgroundImage:
              "url('/src/assets/image/JPampangaBarangays0646dfvf_11.JPG')",
          }}
        >
          <div className="absolute inset-0 bg-custom-gradient_announcement z-10 pb-10"></div>
          <section className="absolute left-20 text-start z-20 pb-20">
            <h1 className=" text-[60px]  tracking-widest font-bold w-[900px]">
              LA VERDAD CHRISTIAN COLLEGE
            </h1>
            <div className="border-b-8 border-white w-90 h-1 my-5"></div>
            <p className="text-[30px] mb-10 w-[900px]">
              Simplifying appointment scheduling. Stay organized, save time, and
              never miss an appointment. Easy, fast, and hassle-free
            </p>
          </section>
        </div>
        <Buttons />
        <div>
          <Carousel />
        </div>
        <div className=" flex items-center justify-center min-h-screen max-w-[1440px]  mx-auto p-8">
          <div className="text-center">
            <div>
              <h2 className=" font-normal text-[#161F55] text-[35px]">
                Face-to-Face Transaction
              </h2>
              <div className="w-[500px] h-1 bg-yellow-500 mx-auto my-2"></div>
              <h1 className="text-[50px] font-bold text-[#161F55] mb-8">
                REGISTRAR OFFICE HOURS
              </h1>
            </div>

            <div className="flex flex-col items-center mx-auto ml-10">
              <div className="flex justify-center items-center gap-20">
                <div>{calendar("MONDAY", "7:00 AM to 4:00 PM")}</div>
                <div>{calendar("TUESDAY - FRIDAY", "8:00 AM to 5:00 PM")}</div>
              </div>
            </div>

            <p className="text-[#161F55] italic text-[25px] pt-20 text-start">
              Note: The registrar's office hours of operation may be subject to
              change due to unforeseen circumstances or institutional events.
              Please check the announcement board for updates.
            </p>
          </div>
        </div>
        <div className="text-white h-[500px] relative">
          <div className="relative w-full h-[400px]">
            <div
              className="absolute inset-0 bg-cover bg-center h-[500px]"
              style={{
                backgroundImage:
                  "url('/src/assets/image/la_verdad_christian_school_apalit_pampanga_cover.jpeg')",
              }}
            >
              <div className="absolute inset-0 bg-[#0D1858] opacity-30"></div>
            </div>

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col items-start justify-center max-w-[900px] pl-10 pt-[95px] z-10">
              <h1 className="text-[40px] font-bold text-center tracking-[5px]">
                REGISTRAR OFFICE APPOINTMENT
              </h1>
              <p className="text-[30px] text-start mt-4">
                For a more secure and efficient process of requesting and
                claiming student's credentials for everyone
              </p>
            </div>
          </div>

          <div>{mobile()}</div>
        </div>

        {/* Second Section */}
        <div className="bg-[#161F55] h-[600px] text-white text-[30px] flex items-start justify-center flex-col relative z-0 text-left">
          <div className="max-w-[900px] pl-[90px] p-10 ">
            <h2 className="mb-8 tracking-[7px] text-start">
              VISIT OUR FACEBOOK PAGE FOR LATEST UPDATES AND INFORMATION
            </h2>
            <a
              href="https://www.facebook.com/lvcc.apalit"
              target="_blank"
              className="underline text-blue-300 z-50 relative pr-70"
            >
              https://www.facebook.com/lvcc.apalit
            </a>
            <div className="border-b-8 border-[#F3BC62] h-1 w-full pt-20"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Announcement;
