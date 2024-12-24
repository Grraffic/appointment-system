import { Link } from "react-router";

const About = () => {
  return (
    <>
      <main className=" bg-Bbackground py-4">
        <div className="max-w-[1440px] h-14 mx-auto w-full flex justify-between items-center px-4">
          {/* Logo and Title */}
          <h2 className="flex items-center">
            <img
              src="/src/assets/image/LV_Logo.png"
              alt="LV logo"
              className="w-16 h-16 mr-2 mb-1"
            />
            <span className="font-regular text-2xl text-LBackground">LVCC</span>
            <span className="font-Lato-Bold text-2xl text-LBackground pl-2 mb-1">
              AppointEase
            </span>
          </h2>

          {/* Navigation */}
          <nav>
            <ul className="flex space-x-10 text-[#000] relative left-40">
              <li className="text-lg font-LatoRegular hover:text-LBackground">
                <Link>HOME</Link>
              </li>
              <li className="text-lg font-LatoRegular hover:text-LBackground relative">
                <Link>ABOUT</Link>
                <span className="absolute bottom-[-5px] left-0 w-full h-1 bg-[#F3BC62]"></span>
              </li>
              <li className="text-lg font-LatoRegular hover:text-LBackground">
                <Link to="/faqs">FAQs</Link>
              </li>

              <li className="text-lg font-LatoRegular hover:text-LBackground relative">
                <Link to="/contact">CONTACT</Link>
              </li>
            </ul>
          </nav>

          {/* Button */}
          <button className="px-6 py-3 bg-[#252F6A] text-[#FAFAFA] text-sm uppercase rounded-[10px] hover:bg-blue-700 relative right-3">
            Appoint Now
          </button>
        </div>
      </main>

      {/* CONTENT */}
      <section className="mx-auto bg-[#161F55] flex flex-col items-center  ">
        <div className="mt-20  ">
          <h2 className="text-[48px] font-LatoBold text-Bbackground tracking-widest relative mb-8 text-center ">
            ABOUT US
          </h2>
          <div className="w-[400px] h-1 bg-[#F3BC62] mx-auto mb-8"></div>

          <p className="font-LatoRegular text-Bbackground text-[35px] tracking-widest w-[1190px] text-center">
            The La Verdad Christian College or LVCC is a private non-stock,
            non-sectarian educational institution established in Apalit,
            Pampanga, Philippines. It is the first private school in the
            Philippines that
            <span className=" font-LatoBold text-Gold mx-2">
              GRANTS FULL SCHOLARSHIP PROGRAM
            </span>
            to deserving students by providing tuition-free education and no
            miscellaneous fees. It is one of the best schools in Pampanga, up to
            regional and national levels.
          </p>
        </div>

        {/* VISION */}
        <div className=" mt-40 relative flex flex-col items-center w-full">
          <div className=" relative w-full">
            <img
              src="/src/assets/image/about.png"
              alt=""
              className=" w-full max-w[1440px] h-[750px] mx-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F3BC62]/20 to-[#252F6A]/30"></div>
            <h2 className="text-[48px] font-LatoBold text-Bbackground tracking-widest mb-8  justify-center flex absolute inset-[35%] ">
              VISION
            </h2>
            <div className="w-[400px] h-1 bg-[#F3BC62] mx-auto absolute inset-x-0 top-[50%] "></div>

            <p className=" absolute inset-x-0 top-[57%] text-[35px] font-LatoBold text-Bbackground text-center tracking-widest w-[60rem] m-auto">
              The institution that ensures quality learning and biblical moral
              standards.
            </p>
          </div>
        </div>

        {/* MISSION */}

        <div className="mt-32 h-[550px]">
          <h2 className="text-[48px] font-LatoBold text-Bbackground tracking-widest relative mb-8 text-center ">
            MISSION
          </h2>
          <div className="w-[400px] h-1 bg-[#F3BC62] mx-auto mb-8"></div>

          <p className="font-LatoBold text-Bbackground text-[35px] tracking-widest w-[986px] text-center">
            To be the frontrunner in providing academic excellence and normally
            upright principles.
          </p>
        </div>
      </section>

      <footer className=" bg-Footer">
        <div className="flex justify-between items-center h-[130px] px-12">
          <p className="font-regular ml-12 text-[24px] text-LBackground ">
            LA VERDAD CHRISTIAN COLLEGE
          </p>
          <div className="flex flex-col items-center space-y-3 ">
            <p className="font-LatoRegular mr-2 text-[24px] text-LBackground ">
              CONTACT US
            </p>
            <p className=" text-[22px] font-LatoRegular text-LBackground">
              support@laverdad.edu.ph
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default About;
