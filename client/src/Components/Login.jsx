import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, status } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  });

  const LoginUserbtn = async (event) => {
    event.preventDefault();

    await login(email, password);
  };

  return (
    <>
      <div className="w-full ">
        <div className="max-w-[1240px] xl:mx-auto mx-10 pt-3">
          <div className="flex flex-col justify-between items-center">
            <h1 className="m-4 text-2xl font-semibold">Login to Airbnb</h1>
            <form
              action=""
              onSubmit={LoginUserbtn}
              className="flex flex-col justify-between items-center space-y-2 w-[300px] sm:w-[500px]"
            >
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="p-2 border border-gray-400 rounded-lg w-full"
                placeholder="Email"
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="p-2 border border-gray-400 rounded-lg w-full"
                placeholder="Password"
              />
              <button
                className="bg-red-500 text-white p-2 rounded-3xl w-full mt-4"
                // disabled={isloading}
              >
                Login
              </button>
              {error && (
                <div
                  className={
                    status === 400
                      ? "p-2 border-2 border-red-400 w-full rounded-lg text-red-600"
                      : "p-2  border-2 border-green-400 w-full rounded-lg text-green-600"
                  }
                >
                  {error}
                </div>
              )}
              <div>
                <span>Don't have an Account? </span>
                <Link
                  to="/user/register"
                  className="font-semibold underline text-blue-600"
                >
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
