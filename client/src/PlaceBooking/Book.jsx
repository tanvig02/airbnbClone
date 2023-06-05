import React, { useEffect } from "react";
import { GoThumbsup } from "react-icons/go";

const Book = () => {
  useEffect(() => {
    // const res = axios.get("user");
  }, []);
  return (
    <div>
      <div className="w-full h-[468px] bg-white border-b border-gray-300  flex justify-center items-center align-middle">
        <div className="max-w-[1240px] xl:mx-auto mx-10  pt-3 ">
          <div className="flex flex-col justify-centerer items-center space-y-3">
            <GoThumbsup className="text-red-500 w-20 h-auto pb-4" />
            <h1 className="text-3xl font-bold">
              Your Booking is Successfully Confirmed 😁!!
            </h1>
            <h1 className="text-lg font-semibold">
              Thank You For Booking with Us!
            </h1>
            <p className="text-lg">
              You will shortly receive a confirmation mail with attached
              Details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
