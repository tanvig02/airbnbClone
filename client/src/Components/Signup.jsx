import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import FileBase64 from "react-file-base64";
import { IconCloudUpload, IconTrash } from "@tabler/icons-react";
import axios from "axios";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");

  const { signup, error, status } = useSignup();

  const handlePhoto = async (files) => {
    console.log(files);
    setPhoto(files.base64);
  };

  const RegisterUser = async (event) => {
    event.preventDefault();

    await signup(userName, email, password, photo);
  };

  return (
    <>
      <div className="w-full">
        <div className="max-w-[1240px] xl:mx-auto mx-10 pt-3">
          <div className="flex flex-col justify-between items-center">
            <h1 className="m-4 text-2xl font-semibold">Register to Airbnb</h1>
            <form
              action=""
              // onSubmit={RegisterUser}
              className="flex flex-col justify-between items-center space-y-2 w-[300px] sm:w-[500px]"
            >
              <div className="flex">
                {photo === "" ? (
                  <></>
                ) : (
                  <div className=" relative ">
                    <img
                      className="aspect-square w-36 rounded-full h-auto object-cover "
                      src={photo}
                      alt=""
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setPhoto("");
                      }}
                      className="absolute bottom-1 right-1 text-black rounded-md p-1 text-[10px] bg-gray-300 hover:text-primary"
                    >
                      <IconTrash size={15} />
                    </button>
                  </div>
                )}

                <label
                  className={
                    photo === ""
                      ? "border bg-transparent rounded-lg p-8 text-gray-500 flex items-center flex-col justify-center aspect-auto cursor-pointer"
                      : "hidden"
                  }
                >
                  <div className="hidden">
                    <FileBase64
                      multiple={false}
                      // onDone={(base64) => {
                      //   setPhoto(base64.base64);
                      //   console.log(photo);
                      // }}
                      onDone={handlePhoto}
                    />
                    {/* <input
                      type="file"
                      onChange={(e) => {
                        setPassword(e.target.files[0]);
                      }}
                    />
                    <button onClick={submitPhoto}>Submit</button> */}
                  </div>
                  <IconCloudUpload size={40} className="mb-1" />
                  Upload
                </label>
              </div>

              <input
                type="text"
                name="userName"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                className="p-2 border border-gray-800 rounded-lg w-full"
                placeholder="userName"
              />
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="p-2 border border-gray-400 rounded-lg w-full"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="p-2 border border-gray-400 rounded-lg w-full"
                placeholder="password"
              />
              <button
                className="bg-red-500 text-white p-2 rounded-3xl w-full mt-4"
                onClick={RegisterUser}
                // disabled={isloading}
              >
                Register
              </button>
              {error && (
                <div
                  className={
                    status === 400
                      ? "p-2 border-2 border-red-400 w-full rounded-lg text-red-600 bg-red-200"
                      : "p-2  border-2 border-green-400 w-full rounded-lg text-green-600 bg-green-200"
                  }
                >
                  {error}
                </div>
              )}
              <div>
                <span>Already a Member? </span>
                <Link
                  to="/user/login"
                  className="font-semibold underline text-blue-600"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
