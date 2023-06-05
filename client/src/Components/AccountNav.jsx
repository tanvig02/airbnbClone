import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { BsBuildings } from "react-icons/bs";

export default function AccountNav() {
  const { pathname } = useLocation();
  const { user } = useAuthContext();

  const userId = user.data.id;
  // console.log(userId);

  let subpage = pathname.split("/")?.[2];
  console.log(subpage);
  if (subpage === undefined) {
    subpage = "allpost";
  }
  function linkClasses(type = null) {
    let classes = "inline-flex gap-1 py-2 px-6 rounded-full no-underline";
    if (type === subpage) {
      classes += " bg-red-500 text-white";
    } else {
      classes += " bg-gray-200";
    }
    return classes;
  }
  return (
    <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
      <Link
        className={linkClasses(`${`allpost`}`)}
        to={`/userAcc/allpost/${userId}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
        My Posts
      </Link>
      <Link className={linkClasses(`user`)} to={`/booking/user/${userId}`}>
        <BsBuildings className="w-6 h-auto" />
        My accommodations
      </Link>
      <Link className={linkClasses("create")} to={"/userAcc/create"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
          />
        </svg>
        Add Post
      </Link>
    </nav>
  );
}
