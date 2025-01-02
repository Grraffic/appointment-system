import { useState } from "react";
import { Link } from "react-router";

const DataPrivacy = ({ onNext }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckBox = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center "
      style={{
        backgroundImage:
          "url('/src/assets/image/la_verdad_christian_school_apalit_pampanga_cover.jpeg')",
      }}
    >
      <div className="bg-[#EEF2F7] p-10 rounded-lg shadow-lg max-w-xl w-full relative my-20 ">
        <h2 className="text-[35px] font-LatoBold text-[#161F55] mb-5 text-center ">
          DATA PRIVACY NOTICE
        </h2>
        <div className="absolute mx-[70px] w-[22rem] h-1 bg-[#F3BC62]"></div>
        <p className="text-[16px] text-justify mb-6 mt-12 text-[#161F55] font-LatoRegular">
          In compliance with data privacy laws such as, but not limited to,
          Republic Act No. 10173 (Data Privacy Act of 2012) and its implementing
          rules and regulations, we within the Organization of La Verdad
          Christian College (LVCC), collect and process your personal
          information in this survey form for Research Subject purposes only,
          keeping them securely and with confidentiality using our
          organizational, technical, and physical security measures, and retain
          them in accordance with our retention policy. We don’t share them with
          any external group without your consent unless otherwise stated in our
          privacy notice.
        </p>
        <p className="text-[16px] text-justify mb-6  text-[#161F55] font-LatoRegular">
          You have the right to be informed, to object, to access, to rectify,
          to erase, or to block the processing of your personal information, as
          well as your right to data portability, to file a complaint, and to be
          entitled to damages for violation of your rights under this data
          privacy.
        </p>
        <p className="text-[16px] text-justify mb-6  text-[#161F55] text-LatoRegular">
          For your data privacy inquiries, you may reach our Data Protection
          Officer through: <br />
          Email:{" "}
          <a
            href="mailto:dpo@laverdad.edu.ph"
            className="text-[#161f55] font-LatoBold underline"
          >
            dpo@laverdad.edu.ph
          </a>
        </p>
        <form className="mb-6">
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="agree"
              onChange={handleCheckBox}
              className=" w-4 h-4 mt-1 border-[#161F55] border-2 checked:border-[#161f55] "
            />
            <label
              htmlFor="agree"
              className="text-[16px] text-justify mb-6  text-[#161F55] text-LatoRegular"
            >
              I have read and agree to the{" "}
              <span className=" font-LatoBold">Data Privacy Notice </span>of
              LVCC AppointEase.
              <p className="pt-4 font-LatoRegular">
                By ticking “I Agree,” I voluntarily give my consent to LVCC in
                collecting, processing, recording, using, and retaining my
                personal information for the above-mentioned purpose in
                accordance with this Privacy Notice.
              </p>
            </label>
          </div>
        </form>
        <div className="flex justify-between">
          <button className="px-4 py-2 text-white bg-[#161f55] rounded hover:bg-blue-700">
            <Link to="/home">Back</Link>
          </button>
          <button
            onClick={onNext}
            className={`px-4 py-2 text-white bg-[#161f55] rounded ${
              isChecked ? "hover:bg-blue-700" : ""
            }`}
            disabled={!isChecked}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataPrivacy;
