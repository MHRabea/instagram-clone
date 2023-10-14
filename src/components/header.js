import Logo from "../images/users/Logo-black-nobackground.jpg";
import { Home, Login } from "../components/routes";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useUserData from "../data/currentUserDataWithLoading";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Header() {
  const { currentUserData, isLoaing } = useUserData();

  // console.log(currentUser);
  const Navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth).then(() => {
      Navigate(Login);
    });
  };

  return !isLoaing ? (
    <div>
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
             hover:scale-105 transition ease-in-out
             "
        >
          <div className="flex items-center  py-3 px-3">
            <a href={Home} className="flex items-center">
              <img
                src={Logo}
                className="
                 order-1
                 scale-125
                 mr-3 h-6 sm:h-9
                 hover:transition-all
                 hover:ease-in-out
                 hover:scale-150
                 transition
                 ease-in-out
                 pr-4
                 overflow-visible
                 drop-shadow-2xl
                 hover:drop-shadow-2xl
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
          <div className="flex items-center">
            <button
              onClick={handleSignOut}
              className="
                flex
                transform
                hover:translate-y-1
                hover:scale-110
                rounded
                bg-transparent px-6 pb-2 pt-2.5 text-xs
                font-medium
                uppercase
                leading-normal
                text-white
                transition
                duration-100
                ease-in-out
                hover:bg-transparent
                focus:bg-transparent
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
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </div>
  ) : (
    <header>
      <div
        className=" lg:px-6 py-2.5
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
        <SkeletonTheme baseColor="#df3b3b" highlightColor="#ddb1b1">
          <div className="flex items-center space-x-2">
            <Skeleton count={1} className=" w-14 h-14" />
            <div className="flex flex-col">
              <Skeleton count={1} className=" w-14 h-6" />
              <Skeleton count={1} className=" w-14 h-2" />
            </div>
            <Skeleton count={1} className="h-14 w-14 rounded-full" />
          </div>
          <Skeleton count={1} className="w-8 h-8" />
        </SkeletonTheme>
      </div>
    </header>
  );
}
