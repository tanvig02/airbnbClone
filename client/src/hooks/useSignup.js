import React, { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signup = async (userName, email, password, photo) => {
    try {
      setError(null);

      const config = {
        headers: {
          "Content-type": "application/json",
          withCredentials: true,
        },
      };
      const res = await axios.post(
        "/user/register",
        JSON.stringify({
          userName,
          email,
          password,
          photo,
        }),
        config
      );

      console.log(res);

      if (res.status === 200) {
        //save the user to local storage
        localStorage.setItem("user", JSON.stringify(res.data, res.status));
        const user = JSON.parse(localStorage.getItem("user"));

        //update the auth context
        dispatch({
          type: "LOGIN",
          payload: {
            token: user.token,
            data: {
              name: user.user.userName,
              email: user.user.email,
              id: user.user._id,
              photo: user.user.photo,
            },
          },
        });
        setError(res.data.msg);
        setStatus(200);

        navigate("/");
      }
    } catch (e) {
      if (e.response?.status === 400) {
        setError(e.response?.data.msg);
        setStatus(400);
      }
    }
  };

  return { signup, error, status };
};
