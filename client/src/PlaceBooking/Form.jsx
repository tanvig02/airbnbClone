import { useState } from "react";
import axios from "axios";
import AccountNav from "../Components/AccountNav";
import { useNavigate } from "react-router-dom";
import FileBase64 from "react-file-base64";
import { useAuthContext } from "../hooks/useAuthContext";
import { IconCloudUpload, IconTrash } from "@tabler/icons-react";

export default function Form() {
  const [owner, setOwner] = useState("");
  const [title, setTitle] = useState("my home");
  const [address, setAddress] = useState("pune");
  const [description, setDescription] = useState("hii");
  const [checkOut, setCheckOut] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [maxGuest, setMaxGuest] = useState("5");
  const [price, setPrice] = useState("1000");
  const [error, setError] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");

  const { user } = useAuthContext();

  const navigate = useNavigate();

  const savePlace = async (event) => {
    event.preventDefault();
    console.log("hii");

    try {
      console.log(user);
      if (!user) {
        return;
      }

      const userId = user.data.id;
      setOwner(userId);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const placeData = {
        userId,
        title,
        address,
        description,
        checkIn,
        checkOut,
        maxGuest,
        price,
        // imgLink,
        addedPhotos,
      };
      console.log(placeData);
      const res = await axios.post("/userAcc/create", placeData, config);
      console.log(res);

      setError(res.data);

      // Navigate;
      navigate("/");
    } catch (e) {
      if (e.response?.status === 400) {
        // setIsLoading(false);
        setError(e.response?.data.msg);
      }
    }
  };

  const handleImageUpload = (files) => {
    setAddedPhotos([...addedPhotos, ...files.map((file) => file.base64)]);
  };

  const addField = (event) => {
    event.preventDefault();
    // let newField = {};
    // setImgLink([...imgLink, newField]);
    setAddedPhotos([...addedPhotos, photoLink]);
    setPhotoLink("");
  };

  return (
    <div className="w-full sticky top-0 z-10 bg-white border-b border-gray-300">
      <AccountNav />
      <div className="max-w-[1240px] xl:mx-auto mx-10 pt-3">
        <form
          action="userAcc/upload"
          method="POST"
          encType="multipart/form-data"
          onSubmit={savePlace}
          className="flex flex-col justify-between space-y-2"
        >
          <label> Title</label>
          <input
            type="text"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            className="p-2 border border-gray-800 rounded-lg w-full"
            placeholder="title, for example: My lovely apt"
          />
          <label>Address, Address to this place</label>
          <input
            type="text"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
            className="p-2 border border-gray-800 rounded-lg w-full"
            placeholder="address"
          />
          <label>Photos, more = better</label>
          <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
            <input
              name="img"
              value={photoLink}
              className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
              placeholder="Enter Image Links and add many"
              onChange={(e) => {
                setPhotoLink(e.target.value);
              }}
            />
          </div>
          <button
            className="outline-none border-none bg-black text-white m-2 p-2 w-fit"
            onClick={addField}
          >
            Add More Link
          </button>
          <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2  mt-2 mb-3">
            {addedPhotos.length > 0 &&
              addedPhotos.map((photo, index) => (
                <div className=" relative " key={index}>
                  <img
                    className="aspect-square w-full rounded-lg h-full object-cover"
                    src={addedPhotos[index]}
                    alt=""
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setAddedPhotos(addedPhotos.filter((p) => p !== photo));
                    }}
                    className="absolute bottom-1 right-1 text-black rounded-md p-1 text-[10px] bg-gray-300 hover:text-primary"
                  >
                    <IconTrash size={15} />
                  </button>
                </div>
              ))}
            <label className="border bg-transparent rounded-lg p-8 text-gray-500 flex items-center  flex-col justify-center aspect-square cursor-pointer">
              <div className="hidden">
                <FileBase64 multiple={true} onDone={handleImageUpload} />
              </div>
              <IconCloudUpload size={20} className="mb-1" />
              Upload
            </label>
          </div>
          {/* <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} /> */}
          {/* <FileBase64
            multiple={true}
            onDone={({ base64 }) => {
              console.log(base64);
            }}
          /> */}
          {/* <label htmlFor="">Add Photos</label>
          <input type="file" multiple={true} onChange={handleImage} /> */}
          <label>Description, description of the place</label>
          <textarea
            value={description}
            className="p-2 border border-gray-800 rounded-lg w-full"
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <label>
            Check in&out times, add check in and out times, remember to have
            some time window for cleaning the room between guests
          </label>
          <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mt-2 -mb-1">Check in time</h3>
              <input
                type="date"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
                className="p-2 border border-gray-800 rounded-lg w-full"
                placeholder="14"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check out time</h3>
              <input
                type="date"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
                className="p-2 border border-gray-800 rounded-lg w-full"
                placeholder="11"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Max number of guests</h3>
              <input
                type="number"
                value={maxGuest}
                className="p-2 border border-gray-800 rounded-lg w-full"
                onChange={(ev) => setMaxGuest(ev.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Price per night</h3>
              <input
                type="number"
                value={price}
                className="p-2 border border-gray-800 rounded-lg w-full"
                onChange={(ev) => setPrice(ev.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button className="bg-red-500 text-white p-2 rounded-3xl w-20 m-4">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
