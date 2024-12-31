import Buttons from "../components/Buttons";
import Documents from "../components/Documents";
const Guidelines = () => {
  return (
    <div className="max-w-[1440px] mx-auto font-lato">
      <div
        className="relative w-full h-[1000px] bg-fit bg-center flex items-end justify-center text-white text-center pb-28"
        style={{
          backgroundImage: "url('src/assets/image/guidelines_bg.JPG')",
        }}
      >
        <div className="absolute inset-0 bg-custom-gradient_guidelines z-0 pb-10"></div>
        <section className="absolute text-center z-20 bottom-60">
          <h1 className=" text-[60px]  tracking-widest font-bold w-[900px]">
            LA VERDAD CHRISTIAN COLLEGE
          </h1>
          <div className="border-b-8 border-white my-4"></div>
          <p className="text-[30px] mb-20  w-[900px]">
            Promotes a holistic approach to education, emphasizing the
            development of the intellectual, emotional, social, and spiritual
            aspects of students
          </p>
        </section>
      </div>
      <Buttons />
      <div className="h-[650px] flex justify-center items-center flex-col bg-[#161F55] text-white ">
        <div className="max-w-[1100px] tracking-[0.5px] text-center">
          <h1 className="text-[35px] font-bold">
            REQUESTING AND RELEASING OF DOCUMENTS GENERAL GUIDELINES
          </h1>
          <div className="border-b-8 border-[#F3BC62] h-1 w-full my-4"></div>
          <p className="text-[34px]">
            To ensure efficient and orderly processing of document requests, the
            following regulations have been established for both Basic Education
            and Higher Education. Please be guided accordingly
          </p>
        </div>
      </div>
      {/* Third Section */}
      <div className="py-20 min-h-screen max-w-[1200px] mx-auto">
        {/* Section 1 */}
        <div className="flex items-center mb-20 ">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center w-[110px] h-[110px] bg-[#161F55] text-white font-bold rounded-lg text-[60px] mr-5">
              1
            </div>
          </div>
          <div className="ml-10 text-[#161F55] text-[30px] flex items-center justify-center">
            <p>
              All document requests{" "}
              <span className="font-extrabold">must be submitted </span>to the
              Office of the Registrar via the designated request forms.
            </p>
          </div>
        </div>
        {/* Section 2 */}
        <div className="flex items-center mb-20 ">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center  w-[110px] h-[110px] bg-[#161F55] text-white font-bold rounded-lg text-[60px] mr-5">
              2
            </div>
          </div>
          <div className="ml-10 text-[#161F55] text-[30px] flex items-center justify-center">
            <p>
              All document requests{" "}
              <span className="font-extrabold">must be submitted </span> to the
              Office of the Registrar via the designated request forms.
            </p>
          </div>
        </div>
        {/* Section 3 */}
        <div className="flex items-center mb-20 ">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center  w-[110px] h-[110px] bg-[#161F55] text-white font-bold rounded-lg text-[60px] mr-5">
              3
            </div>
          </div>
          <div className="ml-10 text-[#161F55] text-[30px] flex items-center justify-center">
            <p>
              The Registrar reserves the right to extend processing times during
              peak periods such as enrollment and graduation seasons.
            </p>
          </div>
        </div>
        {/* Section 4 */}
        <div className="flex items-center mb-20 ">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center  w-[110px] h-[110px] bg-[#161F55] text-white font-bold rounded-lg text-[60px] mr-5">
              4
            </div>
          </div>
          <div className="ml-10 text-[#161F55] text-[30px] flex items-center justify-center">
            <p>
              It is recommended that requests be submitted well in advance of
              any deadlines to ensure timely processing.
            </p>
          </div>
        </div>
        {/* Section 5 */}
        <div className="flex items-center mb-20 ">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center  w-[110px] h-[110px] bg-[#161F55] text-white font-bold rounded-lg text-[60px] mr-5">
              5
            </div>
          </div>
          <div className="ml-10 text-[#161F55] text-[30px] flex items-center justify-center">
            <p>
              Students are required to meet specific requirements before their
              requests can be processed. Failure to comply with the requirements
              may result in delays or non-issuance of the requested documents.
            </p>
          </div>
        </div>
        {/* Section 6 */}
        <div className="flex items-center mb-20 ">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center  w-[110px] h-[110px] bg-[#161F55] text-white font-bold rounded-lg text-[60px] mr-5">
              6
            </div>
          </div>
          <div className="ml-10 text-[#161F55] text-[30px] flex items-center justify-center">
            <p>
              A student who is a minor cannot process their own document
              request. Only a parent or designated guardian can make the request
              on their behalf.
            </p>
          </div>
        </div>
        {/* Section 7 */}
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center  w-[110px] h-[110px] bg-[#161F55] text-white font-bold rounded-lg text-[60px] mr-5">
              7
            </div>
          </div>
          <div className="ml-10 text-[#161F55] text-[30px]">
            <p>
              Students of legal age can process their own document requests. If
              a student or alumnus (if of legal age) cannot process the document
              personally, only an authorized person can transact on their
              behalf.
              <br /> The following must be provided:
            </p>
            <ul className="list-disc list-inside mt-8">
              <li>
                Authorization Letter indicating the name of the person
                authorized
              </li>
              <li>
                Photocopy of Valid ID (front and back) of both the
                student/alumnus, with 3 signatures.
              </li>
              <li>
                Photocopy of Valid ID (front and back) of the authorized person
                processing the request, with 3 signatures.
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Last Section */}
      <div className="bg-[#161F55] min-h-screen text-white">
        <div className="max-w-[1000px] mx-auto pt-[100px]">
          <h2 className="text-[36px] text-center ">
            CONDITIONS AND PROCESSING DAY(S) OF EACH DOCUMENTS
          </h2>
          <div className="w-[400px] h-1 bg-[#F3BC62] mx-auto my-8"></div>
        </div>
        <Documents />
      </div>
    </div>
  );
};

export default Guidelines;
