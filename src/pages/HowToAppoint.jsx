import React, { useState } from "react";
import Buttons from "../components/Buttons";
const HowToAppoint = () => {
  return (
    <>
      <div className="max-w-[1440px] mx-auto h-full relative font-lato">
        {/* Header Section */}
        <div
          className="relative w-full h-[1000px] bg-cover  bg-center flex items-center justify-center text-white text-center"
          style={{
            backgroundImage: "url('/src/assets/image/BackGround.png')",
            filter: "brightness(1.5)",
          }}
        >
          <div className="absolute inset-0 bg-custom-gradient_howtoappoint z-10 pb-10"></div>

          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 px-4 max-w-[900px] tracking-widest">
            <h1 className="text-[50px]  font-semibold uppercase mb-4 border-b-8 border-white pb-6 w-[800px]">
              Wisdom Based on the Truth is Priceless
            </h1>
            <p className="text-[30px] ">
              Well-known for offering quality education with a focus on
              Christian values, moral development, and academic excellence.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Buttons />

        {/* Appointment Steps */}
        <div className="bg-[#161F55] text-white py-12 px-4 flex justify-around h-[800px]">
          <div className=" flex flex-col justify-center w-[500px] tracking-widest leading-normal">
            <h2 className="text-[50px] font-semibold text-center ">
              APPOINTMENT SCHEDULING
            </h2>
            <span className=" border-b-[10px] border-[#F3BC62] my-4"></span>
            <p className="text-center text-[30px]">
              How to schedule an appointment in 5 easy steps
            </p>
          </div>

          {/* Steps */}
          <div className="flex justify-center items-center">
            <div className="space-y-6 tracking-wider leading-10 text-[20px] pt-10">
              {/* Step 1 */}
              <div className="flex items-center pb-2 ">
                <span className="text-5xl font-bold">01.</span>
                <span className="border-r-[8px] border-[#F3BC62] h-20 mx-5"></span>
                <div>
                  <h3 className="uppercase text-3xl font-bold ">Step 1:</h3>
                  <p className="text-1xl ">Click the appointment button</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-center pb-2">
                <span className="text-5xl font-bold">02.</span>
                <span className="border-r-[8px] border-[#F3BC62] h-20 mx-5"></span>
                <div>
                  <h3 className="uppercase text-3xl font-bold  gap-4">
                    Step 2:
                  </h3>
                  <p className="text-1xl ">Fill out the request form</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-center pb-2">
                <span className="text-5xl font-bold ">03.</span>
                <span className="border-r-[8px] border-[#F3BC62] h-20 mx-5"></span>
                <div>
                  <h3 className="uppercase text-3xl font-bold ">Step 3:</h3>
                  <p className="text-1xl ">Upload the necessary requirements</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-center pb-2">
                <span className="text-5xl font-bold ">04.</span>
                <span className="border-r-[8px] border-[#F3BC62] h-20 mx-5"></span>
                <div>
                  <h3 className="uppercase text-3xl font-bold ">Step 4:</h3>
                  <p className="text-1xl ">Choose an appointment date</p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex items-center pb-2">
                <span className="text-5xl font-bold ">05.</span>
                <span className="border-r-[8px] border-[#F3BC62] h-20 mx-5"></span>
                <div>
                  <h3 className="uppercase text-3xl font-bold ">Step 5:</h3>
                  <p className="text-1xl ">
                    Submit and wait for an email of approval
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowToAppoint;
