import { Link } from "react-router";
import PropTypes from "prop-types";
import useDataPrivacy from "./hooks/useDataPrivacy";

const DataPrivacy = ({ onNext }) => {
  const { isChecked, highlight, textRef, handleCheckBox, handleNext } =
    useDataPrivacy(onNext);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('/assets/image/la_verdad_christian_school_apalit_pampanga_cover.jpeg')",
      }}
    >
      <div className="bg-[#EEF2F7] p-10 rounded-lg shadow-lg max-w-xl w-full ">
        <h2 className="text-[35px] font-LatoBold text-[#161F55] mb-5 text-center tracking-wider">
          DATA PRIVACY NOTICE
        </h2>
        <div className=" mx-auto w-[24rem] h-1 bg-[#F3BC62]"></div>
        <p className="text-[16px] mb-6 mt-6 text-justify text-[#161F55] font-LatoRegular leading-relaxed">
          In compliance with data privacy laws such as, but not limited to,
          Republic Act No. 10173 (Data Privacy Act of 2012) and its implementing
          rules and regulations, we within the Organization of La Verdad
          Christian College (LVCC), collect and process your personal
          information in this survey form for the Research Subject purposes
          only, keeping them securely and with confidentiality using our
          organizational, technical, and physical security measures, and retain
          them in accordance with our retention policy. We don’t share them to
          any external group without your consent, unless otherwise stated in
          our privacy notice. You have the right to be informed, to object, to
          access, to rectify, to erase or to block the processing of your
          personal information, as well as your right to data portability, to
          file a complaint and be entitled to damages for violation of your
          rights under this data privacy.
          <br />
          <br />
          For your data privacy inquiries, you may reach our Data Protection
          Officer through:
          <br />
          Email:{" "}
          <span className="underline text-[#161F55] font-bold cursor-pointer">
            <a
              href="mailto:dpo@laverdad.edu.ph"
              target="_blank"
              rel="noopener noreferrer"
            >
              dpo@laverdad.edu.ph
            </a>
          </span>
        </p>

        <form className="mb-6">
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="agree"
              onChange={handleCheckBox}
              className={`w-4 h-4 mt-1 border-2 ${
                highlight && !isChecked
                  ? "border-[#B50A0A] border-8"
                  : "border-[#161F55]"
              }`}
              aria-label="Agree to the terms and conditions"
            />
            <label
              htmlFor="agree"
              className={`text-[16px] text-justify text-[#161F55] font-LatoRegular ${
                highlight && !isChecked ? "text-[#B50A0A]" : "text-[#161F55]"
              }`}
            >
              I have read and agree to the{" "}
              <span className="font-LatoBold">Data Privacy Notice</span> of LVCC
              AppointEase.
            </label>
          </div>
        </form>
        <p
          ref={textRef} // Reference to the important text
          className={`text-[16px] text-justify mb-6 font-LatoRegular ${
            highlight && !isChecked ? "text-[#B50A0A]" : "text-[#161F55]"
          }`}
        >
          <p className="font-LatoRegular w-[450px] mx-auto">
            By ticking “I Agree,” I voluntarily give my consent to LVCC in
            collecting, processing, recording, using, and retaining my personal
            information for the above-mentioned purpose in accordance with this
            Privacy Notice.
          </p>
        </p>

        <div className="flex justify-end gap-5">
          <button className="px-8 py-2 text-white bg-[#161f55] rounded hover:bg-blue-700">
            <Link to="/home">Back</Link>
          </button>
          <button
            onClick={handleNext}
            className="px-8 py-2 text-white bg-[#161f55] rounded hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
DataPrivacy.propTypes = {
  onNext: PropTypes.func,
};

export default DataPrivacy;
