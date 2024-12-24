
const Header = () => {
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
                HOME
              </li>
              <li className="text-lg font-LatoRegular hover:text-LBackground">
                ABOUT
              </li>
              <li className="text-lg font-LatoRegular hover:text-LBackground">
                FAQs
              </li>
              <li className="text-lg font-LatoRegular hover:text-LBackground relative">
                CONTACT
                <span className="absolute bottom-[-5px] left-0 w-full h-1 bg-[#F3BC62]"></span>
              </li>
            </ul>
          </nav>

          {/* Button */}
          <button className="px-6 py-3 bg-[#252F6A] text-[#FAFAFA] text-sm uppercase rounded-[10px] hover:bg-blue-700 relative right-3">
            Appoint Now
          </button>
        </div>
      </main>
    </>
  );
};

export default Header;
