import { useEffect, useState } from "react";
import { db } from "/firebase.js";
import { collection, getDocs } from "firebase/firestore";

const Documents = () => {
  const [dropdowns, setDropdowns] = useState([]);
  const [openDropdowns, setOpenDropdowns] = useState([]); // Array to track open dropdowns

  // Fetch dropdown data from Firestore
  useEffect(() => {
    const fetchDropdowns = async () => {
      const querySnapshot = await getDocs(collection(db, "documents"));
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

  const renderConditions = (conditions) => {
    if (Array.isArray(conditions)) {
      return (
        <ul className="list-disc pl-6">
          {conditions.map((condition, index) => (
            <li key={index} className="text-[24px]">
              {condition}
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <>
      <section className="bg-[#161F55] w-full flex justify-center flex-col text-center relative">
        <div className="w-full max-w-md mx-auto mt-2 mb-32 flex flex-col items-center">
          {dropdowns.map((dropdown) => (
            <div key={dropdown.id} className="mb-8">
              <div
                onClick={() => toggleDropdown(dropdown.id)}
                className={`flex justify-between items-center text-3xl w-[900px] text-white p-4 border-[3px] cursor-pointer ${
                  openDropdowns.includes(dropdown.id)
                    ? "bg-[#d9d9d9] text-[#161f55] font-LatoBold"
                    : "hover:bg-white hover:text-black hover:font-LatoBold "
                }`}
              >
                <span className="flex text-start">{dropdown.Title}</span>
                <span className="text-[35px] ">
                  {openDropdowns.includes(dropdown.id) ? "−" : "+"}
                </span>
              </div>

              {openDropdowns.includes(dropdown.id) && (
                <div className="text-white p-8 border-2 cursor-pointer text-start h-[25rem] flex items-start justify-center flex-col">
                  <p className="text-[24px]">
                    <span className="font-bold">Processing Days:</span>{" "}
                    {dropdown.ProcessingDays}
                  </p>
                  <p className="text-[24px] my-2">Conditions: </p>
                  {dropdown.Conditions && renderConditions(dropdown.Conditions)}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Documents;
