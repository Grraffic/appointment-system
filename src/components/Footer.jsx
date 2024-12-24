
const Footer = () => {
  return (
    <>
      <div>
        <footer className=" bg-Footer">
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
      </div>
    </>
  );
};

export default Footer;
