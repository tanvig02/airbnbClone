import React, { useEffect, useState } from "react";
import { IconCloudUpload, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import FileBase64 from "react-file-base64";
import axios from "axios";
import AccountNav from "../Components/AccountNav";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const ProfilePage = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();

  const [userName, setUserName] = useState(user.data.name);
  const [email, setEmail] = useState(user.data.email);
  const userId = user.data.id;
  const [photo, setPhoto] = useState(user.data.photo);

  const UpdateUser = async (event) => {
    event.preventDefault();
    console.log("update");

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const res = await axios.patch(
      "/user/update",
      { userName, email, photo, userId },
      config
    );
    console.log(res);
    console.log("updated");

    window.alert("Profile upated susscessfully");

    navigate("/");
  };

  const handelDeleteAcc = async () => {
    console.log("hey");
    if (window.confirm("Do you really want to Delete your Account?")) {
      const res = await axios.delete(`/user/delete/${user.data.id}`);
      logout();
      navigate("/");
      // window.alert("user account deleted");
    }
  };

  return (
    <div className="w-full ">
      <AccountNav />
      <div className="max-w-[1240px] xl:mx-auto mx-10 h-[80px]">
        <div className="flex flex-col justify-center items-center space-y-4">
          <h1 className="text-2xl font-semibold">My Profile</h1>
          <form
            action=""
            // onSubmit={UpdateUser}
            className="flex flex-col justify-between items-center space-y-2 w-[300px] sm:w-[500px]"
          >
            <div className="flex">
              {photo === "" ? (
                <></>
              ) : (
                <div className=" relative ">
                  <img
                    className="aspect-square w-36 rounded-lg h-auto object-cover "
                    src={photo.url || photo}
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
                    onDone={(base64) => {
                      setPhoto(base64.base64);
                      console.log(photo);
                    }}
                  />
                </div>
                <IconCloudUpload size={40} className="mb-1" />
                Upload
              </label>
            </div>
            <input
              className="p-2 border border-gray-400 rounded-lg w-full font-bold"
              type="text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <input
              className="p-2 border border-gray-400 rounded-lg w-full font-semibold"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <div className="space-x-4 flex w-full">
              <button
                onClick={UpdateUser}
                className="p-2 bg-green-500 text-white rounded-lg w-full "
              >
                Update
              </button>
              <button
                onClick={logout}
                className="p-2 bg-green-500 text-white rounded-lg w-full"
              >
                Logout
              </button>
            </div>
          </form>
          <button
            onClick={handelDeleteAcc}
            className="p-2 bg-red-500 text-white rounded-lg w-[500px]"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
