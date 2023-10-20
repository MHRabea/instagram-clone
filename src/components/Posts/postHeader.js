import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
export default function PostHeader({photosData}) {

  return (
    <div className=" rounded-t-lg items-center bg-gradient-to-r from-sky-400 to-red-500 w-full transition ease-in-out">
        <Link
        key={uuidv4()}
          to={`/p/${photosData.displayName}`}
          className="flex items-center transition ease-in-out py-3 px-2  hover:translate-x-1">
          <img
            src={photosData.photoURL}
            alt="user img"
            className="rounded-full w-14 h-14"/>
          <div
            className="flex flex-col items-center text-xs pl-3">
            <p
              className="font-bold">
              {photosData.displayName}
            </p>
          </div>
        </Link>
    </div>
  );
}
