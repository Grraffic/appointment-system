import { useEffect, useState } from "react";
import { Link } from "react-router";
import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";

const Faqs = () => {
  const [dropdowns, setDropdowns] = useState([]);
  const [openDropdowns, setOpenDropdowns] = useState([]); // Array to track open dropdowns

  // Fetch dropdown data from Firestore
  useEffect(() => {
    const fetchDropdowns = async () => {
      const querySnapshot = await getDocs(collection(db, "faqs"));
      const dropdownData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDropdowns(dropdownData);
    };

    fetchDropdowns();
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdowns((prev) =>
      prev.includes(id) ? prev.filter((openId) => openId !== id) : [...prev, id]
    ); // Add/remove ID from the list of open dropdowns
  };

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
              <li className="text-lg font-LatoRegular hover:text-LBackground ">
                <Link to="/about">ABOUT</Link>
              </li>
              <li className=" relative text-lg font-LatoRegular hover:text-LBackground">
                <Link>FAQs</Link>
                <span className="absolute bottom-[-5px] left-0 w-full h-1 bg-[#F3BC62]"></span>
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

      <section className=" bg-[#161F55] w-full flex justify-center flex-col text-center relative  ">
        <h2 className=" text-Fwhite font-LatoBold text-[60px] mb-8 mt-24 tracking-widest ">
          FAQs
        </h2>
        <div className="w-[400px] h-1 bg-[#F3BC62] mx-auto mb-8"></div>
        <p className=" mx-auto font-LatoRegular text-Bbackground text-[30px] tracking-wider w-[900px] mb-20">
          Find answers to common questions here. For anything else, feel free to
          contact us!
        </p>

        {/* QUESTIONS AND ANSWERS */}
        <div className="w-full max-w-md mx-auto mt-2 mb-32 flex flex-col items-center">
          {dropdowns.map((dropdown) => (
            <div key={dropdown.id} className="mb-8">
              {/* Dropdown Header */}
              <div
                onClick={() => toggleDropdown(dropdown.id)}
                className={`flex justify-between items-center text-3xl w-[900px] text-Fwhite p-4 border-[3px] cursor-pointer ${
                  openDropdowns.includes(dropdown.id)
                    ? "bg-[#d9d9d9] text-[#161f55] font-LatoBold"
                    : "hover:bg-Fwhite hover:text-black hover:font-LatoBold "
                }`}
              >
                <span className="flex text-start">{dropdown.Title}</span>
                <span className="text-[35px] ">
                  {openDropdowns.includes(dropdown.id) ? "−" : "+"}
                </span>
              </div>

              {/* Dropdown Content */}
              {openDropdowns.includes(dropdown.id) && (
                <div className="text-Fwhite p-4 border-2 cursor-pointer h-[10rem] ">
                  <p className=" text-[24px] flex justify-center items-center mb-20">
                    {dropdown.Content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer className=" bg-Footer ">
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

export default Faqs;
