import { React, useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../Components/AccountNav";
import { useParams } from "react-router-dom";

const UserBookings = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(`/booking/user/${id}`);

    data.map((booking) => {
      return console.log(booking._id);
    });

    await setBooking(data);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!booking) {
    // return 0;
    console.log("no booking");
  }

  return (
    <div className="w-full">
      <AccountNav />
      <div className="max-w-[1240px] xl:mx-auto mx-10 ">
        <h1 className="text-2xl font-semibold m-2">Your Bookings</h1>
        <div className="grid gap-x-8 gap-y-8 grid-cols-1 md:grid-cols-2">
          {booking.length > 0 &&
            booking.map((data, index) => {
              return (
                <div className="w-full h-fit m-2 p-2 flex space-x-6 border border-gray-800 rounded-lg">
                  <img
                    className="rounded-2xl object-cover w-52 h-40 aspect-square"
                    src={data.place.photos[0]}
                    alt=""
                  />
                  <div className="flex flex-col">
                    <p className="text-black font-semibold">
                      {data.place.title}
                    </p>

                    <p>
                      Total amt
                      <span className="font-semibold"> {data.price}</span>{" "}
                    </p>
                    <p>
                      No. of guests{" "}
                      <span className="font-semibold">
                        {" "}
                        {data.numberOfGuests}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default UserBookings;
