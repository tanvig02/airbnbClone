import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Hero = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/").then(
      (response) => {
        setPlaces(response.data);
        console.log(places);
      },
      {
        headers: { "Content-type": "application/json" },
      }
    );
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="max-w-[1240px] xl:mx-auto mx-10 ">
          <div className="mt-8 grid gap-x-8 gap-y-8 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {places.map((place, index) => (
              <div className=" group cursor-pointer ">
                <div className=" transition-all duration-300 group-hover:scale-110 ">
                  <Link
                    key={index}
                    className="text-black no-underline"
                    to={"/booking/" + place._id}
                  >
                    {/* Image */}
                    <div className="bg-gray-500 mb-2 rounded-2xl h-auto flex relative ">
                      <img
                        className="rounded-2xl object-cover w-full h-auto aspect-square "
                        src={place.photos[0].url}
                        alt=""
                      />

                      <div className="absolute left-2 bottom-2 bg-gray-50 p-2 rounded-xl">
                        <img
                          src={place.owner.photo.url}
                          alt=""
                          className="aspect-square w-10 rounded-full h-auto object-cover "
                        />
                      </div>
                    </div>

                    <h2 className="text-lg">{place.address}</h2>
                    <h3 className="text-base font-semibold text-gray-500">
                      {place.title}
                    </h3>
                    <div className="mt-1">
                      <span className="font-bold">₹{place.price}</span> per
                      night
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
