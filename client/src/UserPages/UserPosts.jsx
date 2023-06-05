import { React, useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../Components/AccountNav";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { MdEditLocationAlt } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

const UserPosts = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const { user } = useAuthContext();
  const userId = user.data.id;
  // const [updatedData, setUpdatedData] = useState();

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get(`/userAcc/allpost/${userId}`).then(
      (response) => {
        console.log(response);
        setPost(response.data);
        console.log(post);
      },
      {
        headers: { "Content-type": "application/json" },
      }
    );
  }, [id]);

  const getData = async () => {
    await axios.get(`/userAcc/${userId}`).then(
      (response) => {
        setPost(response.data);
      },
      {
        headers: { "Content-type": "application/json" },
      }
    );
  };

  const handelDelete = async (id) => {
    console.log(id);
    const res = await axios.delete(`/userAcc/${id}`, {
      headers: { "Content-type": "application/json" },
    });
    getData();

    console.log(res);

    if (res.status === 200) {
      alert("post deleted Succesfully");
    } else {
      alert("post cannot be deleted");
    }
  };

  // if (!places) return "";

  return (
    <div className="w-full max-h-full">
      <AccountNav />
      <div className="max-w-[1240px] xl:mx-auto mx-10 ">
        <h1 className="text-2xl font-semibold m-4">Your Posts</h1>
        <div className="grid gap-x-8 gap-y-8 grid-cols-1 md:grid-cols-2">
          {post.map((place, index) => {
            return (
              <div className="w-full h-fit m-2 p-2 flex justify-between border border-gray-300 rounded-lg">
                <div className="flex space-x-4">
                  <img
                    className="rounded-2xl object-cover w-40 aspect-square"
                    src={place.photos[0].url}
                    alt=""
                  />
                  <p className="text-black font-semibold">{place.title}</p>
                </div>
                <div className="flex flex-col space-y-4 ">
                  <button
                    className=" border-2 border-red-300 flex justify-center text-white rounded-lg"
                    onClick={() => handelDelete(place._id)}
                  >
                    <AiFillDelete className="text-red-500 w-6 h-auto" />
                  </button>

                  <button className=" border-2 border-green-300  flex justify-center text-white rounded-lg">
                    <Link
                      to={`/userAcc/upload/${place._id}`}
                      state={{ update: post }}
                    >
                      <MdEditLocationAlt className="text-green-500 w-12 h-12 p-2" />
                    </Link>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserPosts;
