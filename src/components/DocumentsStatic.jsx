import { useState } from "react";
const DocumentsStatic = () => {
  const [openDropdowns, setOpenDropdowns] = useState([]);

  const dropdowns = [
    {
      id: 1,
      Title: "Certificate of Enrollment",
      ProcessingDays: "1 working day",
      Conditions: [
        "A maximum of 3 request per school year is allowed.",
        "Must attach proof indicating where the certificate will be used (e.g., scholarship applications, transfer requirements. etc.).",
      ],
    },
    {
      id: 2,
      Title: "Good Moral Certificate",
      ProcessingDays: "2 working days",
      Conditions: [
        "This document can only be requested once.",
        "Must attach a request letter when submitting their application",
      ],
    },
    {
      id: 3,
      Title: "Certified True Copy of Documents",
      ProcessingDays: "Immediately",
      Conditions: [
        "No limitations on the number of requests.",
        "Provide a photocopy of the document that needs to be certified.",
      ],
    },
    {
      id: 4,
      Title: "Certificates",
      ProcessingDays: "2 working days",
      Conditions: [
        "Applies to various certificates such as academic awards. etc.",
        "Must attach proof indicating where certificate be used (e g. scholarship applications).",
      ],
    },
    {
      id: 5,
      Title: "Form 137",
      ProcessingDays: "7 working days",
      Conditions: [
        "This document can only be requested once.",
        "Must attach a request letter when submitting their application.",
        "In case or loss, a notarized Affidavit of Loss must be submitted before a replacement can be issued.",
      ],
    },
    {
      id: 6,
      Title: "Transcript of Records",
      ProcessingDays: "7 working days",
      Conditions: [
        "Must be officially requested for transfer, or employment purposes.",
        {
          main: "The TOR can be requested once for the following purposes:",
          subtopics: [
            "PRC Licensure Examination - must attach proof.",
            "Employment - must attach proof.",
            "Transfer - A request letter must be provided for processing.",
            "Continuing studies - A request letter must be provided for processing.",
          ],
        },
        "Students who have recently graduated may request their TOR 20 days after the date of graduation.",
      ],
    },
    {
      id: 7,
      Title: "Education Service Contracting (ESC) Certificate",
      ProcessingDays: "Half a working day",
      Conditions: ["A request letter must be provided for processing."],
    },
  ];

  const toggleDropdown = (id) => {
    setOpenDropdowns((prev) =>
      prev.includes(id) ? prev.filter((openId) => openId !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <section className="bg-[#161F55] w-full flex justify-center flex-col text-center relative">
        <div className="w-full max-w-md mx-auto mt-2 mb-32 flex flex-col items-center">
          {dropdowns.map((dropdown) => (
            <div key={dropdown.id} className="mb-8">
              <div
                onClick={() => toggleDropdown(dropdown.id)}
                className={`flex justify-between items-center text-3xl w-[900px] p-4 border-[3px] cursor-pointer ${
                  openDropdowns.includes(dropdown.id)
                    ? "bg-[#D9D9D9] text-[#161f55] font-LatoBold"
                    : "hover:bg-white hover:text-black hover:font-LatoBold "
                }`}
              >
                <span className="flex text-start">{dropdown.Title}</span>
                <span className="text-[35px]">
                  {openDropdowns.includes(dropdown.id) ? "−" : "+"}
                </span>
              </div>

              {openDropdowns.includes(dropdown.id) && (
                <div className="text-white p-8 border-2 cursor-pointer text-start">
                  <p className="text-[24px]  mb-4">
                    <strong>Processing Days:</strong> {dropdown.ProcessingDays}
                  </p>
                  <p className="text-[24px]  mb-4">
                    <strong>Conditions:</strong>
                  </p>
                  <ul className="list-disc list-inside">
                    {dropdown.Conditions.map((condition, index) => (
                      <li key={index} className="text-[24px]">
                        {typeof condition === "string" ? (
                          <>
                            {condition.includes("3 request per school year") ? (
                              <>
                                A maximum of{" "}
                                <strong>3 requests per school year</strong> is
                                allowed.
                              </>
                            ) : condition.includes("once") ? (
                              <>
                                This document can only be requested{" "}
                                <strong>once</strong>.
                              </>
                            ) : condition.includes("request letter") &&
                              dropdown.Title !== "Form 137" &&
                              dropdown.Title !==
                                "Education Service Contracting (ESC) Certificate" ? (
                              <>
                                Must attach a <strong>request letter</strong>{" "}
                                when submitting their application.
                              </>
                            ) : condition.includes(
                                "notarized Affidavit of Loss"
                              ) && dropdown.Title === "Form 137" ? (
                              <>
                                In case of loss, a{" "}
                                <strong>notarized Affidavit of Loss</strong>{" "}
                                must be submitted before a replacement can be
                                issued.
                              </>
                            ) : condition.includes("No limitations") ? (
                              <>
                                <strong>No limitations</strong> on the number of
                                requests.
                              </>
                            ) : condition.includes(
                                "TOR 20 days after the date of graduation"
                              ) ? (
                              <>
                                Students who have recently graduated may request
                                their{" "}
                                <strong>
                                  TOR 20 days after the date of graduation
                                </strong>
                                .
                              </>
                            ) : (
                              condition
                            )}
                          </>
                        ) : (
                          <>
                            {condition.main}
                            <ul className="list-disc list-inside ml-8">
                              {condition.subtopics.map((subtopic, subIndex) => (
                                <li key={subIndex} className="text-[24px]">
                                  {subtopic.includes(
                                    "PRC Licensure Examination"
                                  ) ? (
                                    <>
                                      <strong>PRC Licensure Examination</strong>{" "}
                                      - must attach proof.
                                    </>
                                  ) : subtopic.includes("Employment") ? (
                                    <>
                                      <strong>Employment</strong> - must attach
                                      proof.
                                    </>
                                  ) : subtopic.includes(
                                      "Continuing studies"
                                    ) ? (
                                    <>
                                      <strong>Continuing studies</strong> - A
                                      request letter must be provided for
                                      processing.
                                    </>
                                  ) : subtopic.includes("Transfer") ? (
                                    <>
                                      <strong>Transfer</strong> - A request
                                      letter must be procided for processing.
                                    </>
                                  ) : (
                                    subtopic
                                  )}
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DocumentsStatic;
