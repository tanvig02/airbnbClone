import React from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "./hooks/useAuthContext";
import Hero from "./Components/Hero";
import Signup from "./Components/Signup.jsx";
import Login from "./Components/Login.jsx";
import Layout from "./Components/Layout.jsx";
import Form from "./PlaceBooking/Form";
import AccountNav from "./Components/AccountNav";
import PlacePage from "./PlaceBooking/PlacePage";
// import NotBook from "./BookingConfirm/NotBook";
import Book from "./PlaceBooking/Book";
import Payment from "./PlaceBooking/Payment.jsx";
import UserPosts from "./UserPages/UserPosts";
import UserBookings from "./UserPages/UserBookings";
import UpdateForm from "./PlaceBooking/UpdateForm";
import ProfilePage from "./UserPages/ProfilePage";

axios.defaults.baseURL = "https://airbnbclone-production-699f.up.railway.app/";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <userContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Hero />} />
            <Route path="/user/register" element={<Signup />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/userAcc/create" element={<Form />} />
            <Route path="/userAcc" element={<AccountNav />} />
            <Route path="/booking/:id" element={<PlacePage />} />
            <Route path="/bookPayment/confirm" element={<Book />} />
            {/* <Route path="/bookPayment/Notconfirm" element={<NotBook />} /> */}
            <Route path="/bookPayment/payment" element={<Payment />} />
            <Route path="/userAcc/allpost/:id" element={<UserPosts />} />
            <Route path="/booking/user/:id" element={<UserBookings />} />
            <Route path="/userAcc/upload/:id" element={<UpdateForm />} />
            <Route
              path="/userAcc/"
              element={user ? <ProfilePage /> : <Login />}
            />
          </Route>
        </Routes>
      </userContextProvider>
    </div>
  );
}

export default App;
