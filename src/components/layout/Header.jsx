import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-Bbackground py-4 sticky top-0 z-50">
      <div className="max-w-[1440px] h-14 mx-auto w-full flex justify-between items-center px-4">
        <div className="flex items-center group hover:opacity-80 transition-opacity">
          <a
            href="https://www.facebook.com/lvcc.apalit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <img
              src="/assets/image/LV_logo.png"
              alt="LV logo"
              className="w-20 h-20 mr-2 mb-1 hover:scale-105 transition-transform"
            />
          </a>
          <Link to="/home/announcement" className="flex items-center">
            <span className="font-regular text-2xl text-LBackground">LVCC</span>
            <span className="font-LatoRegular text-[26px] text-[#252F6A] pl-2 mb-1 ">
              AppointEase
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-10 text-[26px] text-[#000] relative left-[14rem]">
            <li
              className={`text-lg font-LatoRegular hover:text-LBackground ${
                location.pathname.startsWith("/home")
                  ? "border-b-4 border-Gold"
                  : ""
              }`}
            >
              <Link to="/home/announcement">HOME</Link>
            </li>
            <li
              className={`text-lg font-LatoRegular hover:text-LBackground ${
                location.pathname.startsWith("/about")
                  ? "border-b-4 border-Gold"
                  : ""
              }`}
            >
              <Link to="/about">ABOUT</Link>
            </li>
            <li
              className={`text-lg font-LatoRegular hover:text-LBackground ${
                location.pathname.startsWith("/faqs")
                  ? "border-b-4 border-Gold"
                  : ""
              }`}
            >
              <Link to="/faqs">FAQs</Link>
            </li>
            <li
              className={`text-lg font-LatoRegular hover:text-LBackground ${
                location.pathname.startsWith("/contact")
                  ? "border-b-4 border-Gold"
                  : ""
              }`}
            >
              <Link to="/contact">CONTACT</Link>
            </li>
          </ul>
        </nav>

        {/* Button */}
        <button className="px-6 py-3 bg-[#252F6A] text-[#FAFAFA] text-sm uppercase rounded-[10px] hover:bg-blue-700 relative right-3">
          <Link to="/appointmentForm?step=1">Appoint Now</Link>
        </button>
      </div>
    </header>
  );
};

export default Header;
