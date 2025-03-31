import { Link } from "react-router";

const LandingPage = () => {
  return (
    <>
      <main className="relative w-full h-screen flex flex-col items-center justify-center">
        {/* Background Image */}
        <div className="relative w-full h-full">
          <img
            src="/assets/image/la_verdad_christian_school_apalit_pampanga_cover.jpeg"
            alt="La Verdad Christian College"
            className="w-full h-full object-cover opacity-90 drop-shadow-2xl"
          />
          {/* Linear Shadow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#F3BC62]/40 to-[#252F6A]/80"></div>
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          {/* Header: Logo and AppointEase */}
          <div className="flex items-center absolute top-6 left-6 ">
            <img
              src="/assets/image/LV_logo.png"
              alt="LVCC Logo"
              className="w-14 h-14 sm:w-14 sm:h-14 md:w-20 md:h-20 mr-2 lg:w-24 lg:h-24 "
            />
            <div className="flex items-baseline">
              <span className="text-Bbackground text-2xl md:text-3xl font-regular">
                LVCC
              </span>
              <span className="text-Bbackground text-2xl md:text-3xl font-LatoBold pl-2">
                AppointEase
              </span>
            </div>
          </div>

          {/* Title: Main Content */}
          <div className="mt-10  relative flex flex-col items-center">
            <h1 className="text-white text-4xl md:text-6xl font-LatoBold uppercase w-[783px] tracking-wider">
              LA VERDAD CHRISTIAN COLLEGE
            </h1>
            <span className="absolute top-36 left-0 w-[770px] h-2 bg-[#EEF2F7] "></span>
            <p className="text-Fwhite text-sm md:text-[24px] max-w-2xl leading-relaxed mt-10 font-LatoRegular ">
              La Verdad Christian School provides students a high-quality and
              carefully defined educational program emphasizing Christian
              values, various skills, and vast creative activities.
            </p>
          </div>

          {/* Get Started Button */}
          <Link
            to="/home/announcement"
            className="mt-6 bg-LBackground hover:bg-blue-800 text-white py-3 px-6 rounded-md shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </main>
    </>
  );
};

export default LandingPage;
