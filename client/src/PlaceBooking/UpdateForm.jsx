import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FileBase64 from "react-file-base64";
import axios from "axios";
import AccountNav from "../Components/AccountNav";
import { useAuthContext } from "../hooks/useAuthContext";
import { IconCloudUpload, IconTrash } from "@tabler/icons-react";

export default function UpdateForm() {
  const { id } = useParams();
  const location = useLocation();
  const { update } = location.state;
  // const [placeData, setPlaceData] = useState();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // const getData = async () => {
  //   const { data } = await axios.get(`/booking/${id}`);

  //   console.log("data", data);
  //   await setPlaceData(data);
  //   console.log("place", placeData);
  // };
  // useEffect(() => {
  //   getData();
  // }, []);

  // useEffect(() => {
  //   axios.get(`/booking/${id}`).then(
  //     (response) => {
  //       setPlaceData(response.data);
  //       console.log(response);
  //       console.log(placeData);
  //       // console.log(places[0].imgLink);
  //     },
  //     {
  //       headers: { "Content-type": "application/json" },
  //     }
  //   );
  // }, []);

  const userId = update[0].owner._id;
  const ownerData = update[0].owner;
  const [title, setTitle] = useState(update[0].title);
  const [address, setAddress] = useState(update[0].address);
  const [description, setDescription] = useState(update[0].description);
  const [checkOut, setCheckOut] = useState(update[0].checkOut);
  const [checkIn, setCheckIn] = useState(update[0].checkIn);
  const [maxGuest, setMaxGuest] = useState(update[0].maxGuest);
  const [price, setPrice] = useState(update[0].price);
  const [addedPhotos, setAddedPhotos] = useState(update[0].photos);
  const [error, setError] = useState("");

  const savePlace = async (event) => {
    event.preventDefault();

    try {
      if (!user) {
        return;
      }
      const placeData = {
        ownerData,
        userId,
        title,
        address,
        description,
        checkIn,
        checkOut,
        maxGuest,
        price,
        addedPhotos,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const res = await axios.patch(`/userAcc/upload/${id}`, placeData, config);
      console.log(placeData);
      console.log("done");

      navigate("/");
    } catch (e) {
      if (e.response?.status === 400) {
        setError(e.response?.data.msg);
      }
    }
  };

  const handleImageUpload = (files) => {
    setAddedPhotos([...addedPhotos, ...files.map((file) => file.base64)]);
  };

  // const addField = (event) => {
  //   event.preventDefault();
  //   setAddedPhotos([...addedPhotos, photoLink]);
  //   setPhotoLink("");
  // };

  return (
    <div className="w-full sticky top-0 z-10 bg-white border-b border-gray-300">
      <AccountNav />
      <div className="max-w-[1240px] xl:mx-auto mx-10 pt-3">
        <form
          action="userAcc/upload"
          method="POST"
          encType="multipart/form-data"
          onSubmit={savePlace}
          className="flex flex-col justify-between space-y-4"
        >
          <label className="font-semibold"> Title</label>
          <input
            type="text"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            className="p-2 border border-gray-800 rounded-lg w-full"
            placeholder="title, for example: My lovely apt"
          />
          <label className="font-semibold">
            Address, Address to this place
          </label>
          <input
            type="text"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
            className="p-2 border border-gray-800 rounded-lg w-full"
            placeholder="address"
          />
          <label className="font-semibold">Photos, more = better</label>
          {/* <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
            <input
              name="img"
              value={photoLink}
              className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
              placeholder="Enter Image Links and add many"
              onChange={(e) => {
                setPhotoLink(e.target.value);
              }}
            />
          </div> */}

          {/* <button
            className="outline-none border-none bg-black text-white m-2 p-2 w-fit"
            onClick={addField}
          >
            Add More Link
          </button> */}

          {/* //Upload image */}
          <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2  mt-2 mb-3">
            {addedPhotos.length > 0 &&
              addedPhotos.map((photo, index) => (
                <div className=" relative " key={index}>
                  <img
                    className="aspect-square w-full rounded-lg h-full object-cover"
                    src={photo.url}
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

          <label className="font-semibold">
            Description, description of the place
          </label>
          <textarea
            rows="3"
            value={description}
            className="p-2 border border-gray-800 rounded-lg w-full"
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <label className="font-semibold">
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
              <h3 className="mt-2 -mb-1 font-semibold">Check out time</h3>
              <input
                type="date"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
                className="p-2 border border-gray-800 rounded-lg w-full"
                placeholder="11"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1 font-semibold">Max number of guests</h3>
              <input
                type="number"
                value={maxGuest}
                className="p-2 border border-gray-800 rounded-lg w-full"
                onChange={(ev) => setMaxGuest(ev.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1 font-semibold">Price per night</h3>
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
