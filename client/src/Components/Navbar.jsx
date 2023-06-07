import React, { useState } from "react";
import { SiAirbnb } from "react-icons/si";
import { FaBars, FaRegUserCircle } from "react-icons/fa";
import { BiLocationPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const userData = JSON.parse(localStorage.getItem("user"));

  const handelChange = () => {
    setNav(!nav);
  };

  const handelLogout = () => {
    logout();
    setNav(!nav);
  };
  return (
    <div className="w-full sticky top-0 z-10 bg-white border-b border-gray-300">
      <div className="max-w-[1240px] xl:mx-auto mx-10 h-[80px] pt-3">
        <div className="flex justify-between items-center space-x-4">
          <Link to="/" className="flex space-x-2 no-underline items-center">
            <SiAirbnb className="text-red-500 w-8 h-auto md:w-10" />
            <h1 className="text-red-500 font-semibold hidden md:block text-2xl">
              airbnb
            </h1>
          </Link>
          <div className="border border-gray-400 rounded-full px-4 py-2 shadow-md shadow-gray-200">
            <div className="flex justify-between items-center  font-semibold ">
              <Link className="no-underline" to="/">
                <span className="border-r-2 border-gray-300 px-2 hidden sm:block">
                  Detination
                </span>
              </Link>
              <Link className=" no-underline" to={`/userAcc/`}>
                <span className="border-r-2 border-gray-300 px-2">
                  My Profile
                </span>
              </Link>
              <Link className="no-underline" to="/userAcc/create">
                <span className="flex justify-center items-center px-2 space-x-2 ">
                  <span className="">Add Post </span>
                  <span className="bg-red-500 p-1 rounded-full">
                    <BiLocationPlus className=" text-white w-5 h-auto " />
                  </span>
                </span>
              </Link>
            </div>
          </div>

          <div class="group">
            <button
              onClick={handelChange}
              class="flex justify-between items-center hover:shadow-md hover:shadow-gray-400 text-black p-2 space-x-2 border border-gray-400 rounded-full"
            >
              <FaBars />
              {user === null ? (
                <FaRegUserCircle className="w-6 h-auto" />
              ) : (
                <img
                  className="aspect-square w-8 rounded-full h-auto object-cover "
                  src={user.data.photo.url}
                  alt=""
                />
              )}
            </button>
            <ul
              className={
                !nav
                  ? "hidden"
                  : "flex-col justify-between items-center absolute shadow shadow-gray-500 bg-white right-6 rounded-xl w-[200px] mt-2"
              }
            >
              {user && (
                <li className="">
                  <Link
                    onClick={handelLogout}
                    className="py-2 px-4 block no-underline"
                  >
                    Logout
                  </Link>
                </li>
              )}
            </ul>
            <ul
              className={
                !nav
                  ? "hidden"
                  : "flex-col justify-between items-center shadow shadow-gray-500 absolute bg-white right-6 rounded-xl w-[200px] mt-2"
              }
            >
              {!user && (
                <>
                  <li class="">
                    <Link
                      onClick={handelChange}
                      className="  py-2 px-4 block no-underline border-b-2 border-gray-400 "
                      to="/user/login"
                    >
                      Login
                    </Link>
                  </li>
                  <li class="">
                    <Link
                      onClick={handelChange}
                      className=" py-2 px-4 block no-underline"
                      to="/user/register"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* <Link
            to="/user/register"
            className="flex justify-between items-center text-black p-2 space-x-3 border border-gray-400 rounded-full "
          >
            <FaBars />
            <FaRegUserCircle className="w-6 h-auto" />
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
