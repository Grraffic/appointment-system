import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [activeLink, setActiveLink] = useState("/home");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <main className="bg-Bbackground py-4">
      <div className="max-w-[1440px] h-14 mx-auto w-full flex justify-between items-center px-4">
        <h2 className="flex items-center">
          <img
            src="/src/assets/image/LV_Logo.png"
            alt="LV logo"
            className="w-16 h-16 mr-2 mb-1"
          />
          <span className="font-regular text-2xl text-LBackground font-tolkien">
            LVCC
          </span>
          <span className="font-Lato-Bold text-2xl text-LBackground pl-2 mb-1">
            AppointEase
          </span>
        </h2>

        <nav>
          <ul className="flex space-x-10 text-[#000] relative left-40">
            {["/home", "/about", "/faqs", "/contact"].map((link) => (
              <li key={link} className="text-lg font-LatoRegular">
                <Link
                  to={link}
                  onClick={() => handleLinkClick(link)}
                  className={`hover:text-LBackground ${
                    activeLink === link ? "border-b-2 border-orange-500" : ""
                  }`}
                >
                  {link.replace("/", "").toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button className="px-6 py-3 bg-[#252F6A] text-[#FAFAFA] text-sm uppercase rounded-[10px] hover:bg-blue-700 relative right-3">
          Appoint Now
        </button>
      </div>
    </main>
  );
};

export default Header;
