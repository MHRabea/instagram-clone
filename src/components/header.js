import { useContext } from "react";
import Logo from "../images/users/Logo-black-nobackground.jpg";
import { Home, Login } from "../components/routes";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authcontext";
import { Link } from "react-router-dom";

export default function Header() {
  const { currentUser } = useContext(AuthContext);

  // console.log(currentUser);
  const Navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth).then(() => {
      Navigate(Login);
    });
  };

  return (
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
                 hover:scale-125
                 transition
                 ease-in-out
                 hover:translate-y-1
                 hover:scale-
                 pr-4
                 overflow-visible
                 drop-shadow-2xl
                 hover:drop-shadow-2xl
                "
                alt="InstaC"
              />
            </a>
            <Link to={`/p/${currentUser.displayName}`} className="flex items-center transition ease-in-out hover:scale-110 ">
              <img
                src={currentUser.photoURL}
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

          {/* <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                    <li>
                        <a href="/" className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Home</a>
                    </li>
                    <li>
                        <a href="/" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Company</a>
                    </li>
                    <li>
                        <a href="/" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Marketplace</a>
                    </li>
                    <li>
                        <a href="/" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Features</a>
                    </li>
                    <li>
                        <a href="/" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Team</a>
                    </li>
                    <li>
                        <a href="/" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                    </li>
                </ul>
            </div> */}
        </div>
      </header>
    </div>
  );
}
