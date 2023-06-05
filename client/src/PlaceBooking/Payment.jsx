import React from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLocation, useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  console.log(location);
  const { amount } = location.state;
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handlePayment = async () => {
    const res = await axios.get("/bookpayment/getkey");

    const config = {
      headers: {
        "Content-type": "application/json",
        withCredentials: true,
      },
    };

    console.log(amount, "amount");
    const res2 = await axios.post("/bookpayment/payment", { amount }, config);
    const key = res.data.key;
    console.log(res2);

    const options = {
      key, // Enter the Key ID generated from the Dashboard
      amount: "1000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Airbnb Tanvi", //your business name
      description: "Test Transaction",
      image:
        "https://avatars.githubusercontent.com/u/111691108?s=400&u=a8c450eab29afe82fbe69661e81ce9d4d3cd6f56&v=4",
      order_id: res2.data.order.id,
      callback_url: "/booking/verify",
      // handler: function (response) {
      //   alert(response.razorpay_payment_id);
      //   alert(response.razorpay_order_id);
      //   alert(response.razorpay_signature);
      // },
      prefill: {
        name: user.UserName, //your customer's name
        email: user.email,
        contact: "9000090000",
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

    navigate("/bookPayment/confirm");
  };

  return (
    <div className="w-full max-h-screen">
      <div className="max-w-[1450px] xl:mx-auto mx-10 p-6">
        <h1>Confirm and pay</h1>
        {/* <h1>{`${data}`}</h1> */}
        <h4>Amount: {`${amount}`}</h4>
        <button
          className="bg-red-500 flex text-white p-2 rounded-lg w-fit mt-4"
          onClick={handlePayment}
        >
          Make Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
