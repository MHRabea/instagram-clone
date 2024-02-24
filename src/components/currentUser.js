import { Link } from "react-router-dom";
import { memo } from "react";



function CurrentUser({ userName, fullName, userId, photoURL }) {

  return (
    <div
      className="hidden
        md:flex
        mb-5
        w-full
        px-3
        border-b-2
        border-b-indigo-900
        hover:border-sky-50
        transition
        ease-in-out
        duration-100
        items-center
        pb-5 basis-1/4
       
        "
    >
      <div
        className="flex items-center
        flex-col
      transition
      ease-in-out
      hover:scale-110 mx-auto
      "
      >
        <Link
          to={`/p/${fullName}`}
          className="flex items-center mb-5 mt-5 flex-col"
        >
          <img
            src={photoURL}
            alt="user img"
            className="
                transition
                ease-in-out
                rounded-full
                w-12
                h-12
                "
          />
          <div className="flex
          flex-col
          items-center
          ">
            <p
              className="
            transition
            ease-in-out
            subpixel-antialiased
            font-bold
            "
            >
              {userName}
            </p>
            <p
              className="
            transition
            subpixel-antialiased
            ease-in-out
            text-xs
            text-opacity-20
            font-medium
            pl-2
              "
            >
              {fullName}
            </p>
          </div>
        </Link>
       
      </div>
    </div>
  );
}



export default memo(CurrentUser);