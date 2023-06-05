import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BookingWidget from "../PlaceBooking/BookingWidget";

export default function PlacePage() {
  const { id } = useParams();
  console.log(id);
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/booking/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  const GmailComposeLink = ({ email, children }) => {
    const composeUrl = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(
      email
    )}`;

    return (
      <a href={composeUrl} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  };

  return (
    <div className="w-full bg-gray-100">
      <div className="max-w-[1240px] xl:mx-auto mx-10 pt-8">
        <div className="space-y-4 ">
          <h1 className="text-3xl">{place.title}</h1>
          <p>{place.address}</p>
          <div className="flex space-x-4">
            {place.photos.map((photo) => (
              <div className="bg-gray-500 mb-2 rounded-2xl ">
                <img
                  className="rounded-2xl object-cover w-[300px] h-[250px] "
                  src={photo.url}
                  alt=""
                />
              </div>
            ))}
          </div>
          <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr] p-4">
            <div>
              <div className="flex justify-between">
                <span className="font-semibold text-xl ">
                  Hosted by ~ {place.owner.userName}
                </span>
                <img
                  className="w-14 h-auto aspect-square object-cover rounded-md"
                  src={place.owner.photo.url}
                  alt=""
                />
              </div>
              <GmailComposeLink email={place.owner.email}>
                {place.owner.email}
              </GmailComposeLink>

              {/* <span className="font-semibold text-xl"></span> */}
              <div className="my-4">
                <h2 className="font-semibold text-2xl">Description</h2>
                {place.description}
              </div>
              <span className="font-mono"> Check-in: {place.checkIn}</span>
              <br />
              <span className="font-mono"> Check-out: {place.checkOut}</span>
              <br />
              <span className="font-mono">
                Max number of guests: {place.maxGuests}
              </span>
              <br />
              <div className="my-4">
                <h2 className="font-semibold text-2xl">Extra info</h2>
                {place.description}
              </div>
            </div>
            <div>
              <BookingWidget place={place} />
            </div>
          </div>
          {/* <div className="bg-white -mx-8 px-8 py-8 border-t">
            <div></div>
            <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
              {place.extraInfo}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
