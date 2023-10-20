import Logo from "../images/users/Logo-color-noBackground.png";
import { Home, Login } from "../components/routes";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";

export default function Header({currentUserData}) {

  const Navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth).then(() => {
      Navigate(Login);
    });
  };

  return(
    <header>
      <div
        className="
             lg:px-6 py-2.5
             bg-gradient-to-r
             from-sky-500 to-red-500
             flex
             flex-row
             items-center
             mx-auto
             max-w-screen
             justify-between
             px-3
             "
      >
        <div className="flex items-center py-3 px-3 space-x-3">
          <a href={Home} className="flex items-center">
            <img
              src={Logo}
              className="
                 order-1
                 mr-3 h-6 sm:h-9
                 hover:transition-all
                 hover:ease-in-out
                 hover:scale-125
                 transition
                 ease-in-out
                 pr-4
                 overflow-visible
                 drop-shadow-2xl
                 hover:drop-shadow-2xl border-r
                "
              alt="InstaC"
            />
          </a>
          <Link
            to={`/p/${currentUserData.displayName}`}
            className="flex items-center transition ease-in-out hover:scale-125 "
          >
            <img
              src={currentUserData.photoURL}
              alt="user img"
              className="
                transition
                ease-in-out
                rounded-full
                w-10
                h-10
                "
            />
          </Link>
        </div>
        <div className="flex items-center space-x-5">
          <button
            onClick={handleSignOut}
            className="
              hover:scale-125
                rounded
                bg-transparent  
                text-white
                transition
                duration-100
                ease-in-out
                focus:outline-none
                focus:ring-0
                active:bg-transparent
                "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </button>
          <Link to={`/p/${currentUserData.displayName}`}
            className="
                hover:scale-125
                rounded
                bg-transparent  
                text-white
                transition
                duration-100
                ease-in-out
                focus:outline-none
                focus:ring-0
                active:bg-transparent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </header>

  );
}
