import { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Datepicker from "react-tailwindcss-datepicker";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [amount, setAmount] = useState("");
  const [placeData, setPlaceData] = useState();
  const { user } = useAuthContext();
  const { id } = useParams();
  const [value, setValue] = useState({
    startDate: new Date().getDate,
    endDate: new Date().setMonth(11),
  });

  useEffect(() => {
    if (user) {
      setName(user.data.email);
      console.log(name);
    }
    // else {
    // }
  }, [user]);

  const handleValueChange = (newValue) => {
    setValue(newValue);
    setCheckIn(newValue.startDate);
    setCheckOut(newValue.endDate);
  };

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const bookThisPlace = async (event) => {
    event.preventDefault();

    try {
      if (!user) {
        return;
      }
      const customerId = user.data.id;
      setAmount(numberOfNights * place.price);

      const config = {
        headers: {
          "Content-type": "application/json",
          withCredentials: true,
        },
      };
      const config2 = {
        headers: {
          "Content-type": "application/json",
          withCredentials: true,
        },
      };

      const res = await axios.get("/bookpayment/getkey");

      const res2 = await axios.post(
        "/bookpayment/payment",
        { amount },
        config2
      );
      const key = res.data.key;
      console.log(res2);

      const options = {
        key, // Enter the Key ID generated from the Dashboard
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Airbnb Tanvi", //your business name
        description: "Test Transaction",
        image:
          "https://avatars.githubusercontent.com/u/111691108?s=400&u=a8c450eab29afe82fbe69661e81ce9d4d3cd6f56&v=4",
        order_id: res2.data.order.id,
        callback_url: "/booking/verify",
        prefill: {
          name: user.UserName, //your customer's name
          email: user.email,
          contact: phone,
        },
        notes: {
          address: "Airbnb Corporate Office",
        },
        theme: {
          color: "#EF4444",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();

      const response = await axios.post(
        `/booking/${id}`,
        {
          customerId,
          name,
          phone,
          checkIn,
          checkOut,
          numberOfGuests,
          place: place._id,
          price: numberOfNights * place.price,
        },
        config
      );
      setPlaceData(response);
      setError(response.data.msg);

      // navigate("/bookPayment/confirm");
    } catch (e) {
      if (e.response?.status === 400) {
        setError(e.response?.data.msg);
      }
    }
  };

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ₹{place.price} / per night
      </div>
      <div className="border-2 border-gray-400 rounded-2xl mt-4">
        <div className="">
          <div className="py-3 px-4">
            <label>Select your Dates</label>
            <Datepicker
              primaryColor={"rose"}
              value={value}
              onChange={handleValueChange}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t border-gray-400">
          <label>Number of guests:</label>
          <input
            type="number"
            className="border-2 border-gray-800 rounded-lg m-2 p-1"
            value={numberOfGuests}
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
          />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t border-gray-400">
            <label>Your full name:</label>
            <input
              type="text"
              className="border-2 border-gray-800 rounded-lg m-2 p-1"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label>Phone number:</label>
            <input
              type="tel"
              className="border-2 border-gray-800 rounded-lg m-2 p-1"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
          </div>
        )}
      </div>
      <div>
        <p>
          {numberOfNights > 0 && <span> ₹{numberOfNights * place.price}</span>}
        </p>
        <button
          className="bg-red-500 flex text-white p-2 rounded-lg w-fit mt-4"
          onClick={bookThisPlace}
        >
          Book this place
        </button>
      </div>
    </div>
  );
}
