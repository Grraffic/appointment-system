import Buttons from "../components/Buttons";
import Carousel from "../components/Carousel";

const Announcement = () => {
  const calendar = (day, hours) => {
    return (
      <div className="relative min-w-[420px] h-[420px] flex-shrink-0 borders font-LatoRegular">
        <img
          src="/assets/image/calendar.png"
          alt="calendar icon"
          className="w-full h-full"
        />
        <div className="absolute inset-0 flex  justify-center bg-opacity-70 p-2 rounded-md">
          <div className="text-center p-1 w-[350px] text-[#161F55] tracking-wide  bg-[#E4E4E4] absolute top-[140px] h-[58%] bg-opacity-40 rounded-3xl">
            <h3 className="text-[32px] font-bold">{day}</h3>
            <div className="border-b-8 border-[#F3BC62] w-[250px] my-4 text-center mx-auto"></div>
            <p className="text-[50px]">{hours}</p>
          </div>
        </div>
      </div>
    );
  };

  // Facebook Embed Component with Mobile Phone Design
  const facebookEmbed = () => {
    return (
      <div className="absolute top-[300px] right-[80px] w-[420px] z-20">
        {/* Mobile Phone Frame */}
        <div className="relative bg-gray-900 rounded-[35px] p-3 shadow-2xl">
          {/* Phone Screen */}
          <div className="bg-black rounded-[25px] p-1">
            <div className="rounded-[20px] overflow-hidden h-[650px] relative">
              {/* Status Bar - Floating over Facebook content */}
              <div className="bg-black text-white text-xs px-4 py-2 flex justify-between items-center absolute top-0 left-0 right-0 z-10">
                <span className="font-semibold">9:41</span>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-2 border border-white rounded-sm">
                    <div className="w-3 h-1 bg-white rounded-sm m-0.5"></div>
                  </div>
                </div>
              </div>

              {/* Facebook Embed - Full Screen */}
              <div className="w-full h-full relative overflow-hidden bg-white">
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Flvcc.apalit&tabs=timeline&width=400&height=650&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false&appId"
                  width="400"
                  height="650"
                  style={{
                    border: "none",
                    overflow: "hidden",
                    position: "absolute",
                    top: "-20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100%",
                    maxWidth: "420px",
                    height: "650px",
                  }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="Facebook Page"
                  className="w-full h-full rounded-[20px]"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="font-LatoRegular">
        <div
          className="relative w-full h-[900px] bg-cover bg-center flex items-center justify-center text-white text-center"
          style={{
            backgroundImage:
              "url('/assets/image/JPampangaBarangays0646dfvf_11.JPG')",
          }}
        >
          <div className="absolute inset-0 bg-custom-gradient_announcement z-10 pb-10"></div>
          <div className="relative z-10 px-4 max-w-[900px] ">
            <h1
              className="text-[50px] font-LatoSemiBold
             uppercase tracking-widest"
            >
              La Verdad <br />
              Christian College
            </h1>
            <div className="border-b-8 border-white my-4"></div>
            <p className="text-[30px] ">
              Simplifying appointment scheduling. <br />
              Stay organized, save time, and never miss an appointment. <br />
              Easy, fast, and hassle-free.
            </p>
          </div>
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
              Note: The registrar&#39;s office hours of operation may be subject
              to change due to unforeseen circumstances or institutional events.
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
                  "url('/assets/image/la_verdad_christian_school_apalit_pampanga_cover.jpeg')",
              }}
            >
              <div className="absolute inset-0 bg-[#0D1858] opacity-50"></div>
            </div>

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col items-start justify-center max-w-[900px] pl-10 pt-[95px] z-10">
              <h1 className="text-[40px] font-bold text-center tracking-[5px]">
                REGISTRAR OFFICE APPOINTMENT
              </h1>
              <p className="text-[30px] text-start mt-4">
                For a more secure and efficient process of requesting and
                claiming student&#39;s credentials for everyone
              </p>
            </div>
          </div>

          <div>{facebookEmbed()}</div>
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
              className="underline text-white z-50 relative pr-70 hover:text-[#F3BC62]"
            >
              La Verdad Christian College Apalit Pampanga
            </a>
            <div className="border-b-8 border-[#F3BC62] h-1 w-full pt-20"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Announcement;
