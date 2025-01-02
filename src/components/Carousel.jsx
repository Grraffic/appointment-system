import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      title: "Requesting and releasing of documents general guidelines.",
      description:
        "To ensure efficient and orderly processing of document requests, the following regulations have been established for both Basic Education and Higher Education. Please be guided accordingly.",
    },
    {
      title: "Second Page",
      description: "This is the second page",
    },
    {
      title: "Third Page",
      description: "This is the third page",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full max-w-[1440px] h-[750px] mx-auto bg-[#2A3064] text-white p-6 flex flex-col items-center justify-center pt-10 font-lato">
      {/* Slide Content */}
      <div className="text-center max-w-[1000px] flex flex-col justify-center items-center h-screen">
        <h2 className="text-[36px] font-semibold w-[800px]">
          {slides[currentIndex].title}
        </h2>
        <div className=" border-b-4 border-[#F3BC62] w-[50%] my-5"></div>
        <p className="text-[30px] pb-10">{slides[currentIndex].description}</p>
        <button className="text-[25px] border border-white px-4 py-2 rounded hover:bg-white hover:text-[#2A3064] transition">
          See more
        </button>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl font-bold ">
        <button onClick={handlePrev}>
          <FaArrowLeft className="w-10 h-10" />
        </button>
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl font-bold ">
        <button onClick={handleNext}>
          <FaArrowRight className="w-10 h-10" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center">
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-6 h-6 rounded-full cursor-pointer mx-5 ${
              currentIndex === index ? "bg-white" : "bg-gray-500 hover:bg-white"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
