import React from "react";
import { GoThumbsup } from "react-icons/go";

const NotBook = () => {
  return (
    <div>
      <div className="w-full h-[468px] bg-white border-b border-gray-300  flex justify-center items-center align-middle">
        <div className="max-w-[1240px] xl:mx-auto mx-10  pt-3 ">
          <div className="flex flex-col justify-centerer items-center">
            <GoThumbsup className="text-red-500 w-20 h-auto pb-4 rotate-180" />
            <h1>Sorry ☹️, Fetal Error!!</h1>
            <h1>Your Booing is Failed!</h1>
            <p>
              There must be some network issue, please try again after some
              time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotBook;
