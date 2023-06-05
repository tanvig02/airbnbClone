import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Protected = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  const { user } = useAuthContext();
  //   console.log("Protected useEffect");

  useEffect(() => {
    console.log("Protected useEffect");
    if (user === null) {
      navigate("/user/login");
      console.log("Protected useEffect");
    }
  }, []);
  return (
    <>
      <Component />
    </>
  );
};

export default Protected;
