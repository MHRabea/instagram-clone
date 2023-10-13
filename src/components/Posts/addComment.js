import { useState } from "react";
import { db } from "../../firebase/config";
import useUserData from "../../data/currentUserData";
import { updateDoc , doc , arrayUnion } from "firebase/firestore";

export default function AddComment({
  docId,
  comments,
  setComments,
  commentInput,
}) {
  const [comment, setComment] = useState("");
  const currentUser = useUserData();
  const displayName= currentUser.displayName 

  const handleComment = (e) => {
    e.preventDefault();

    setComments([{displayName , comment } , ...comments ])
    setComment('')

    const userRef = doc(db , "users" , docId)

    return updateDoc(userRef , {
        comments: arrayUnion({displayName , comment})
    })
  };

  return (
    <div className="hover:scale-105 rounded-b-lg focus:scale-105 transition ease-in-out flex w-full bg-gradient-to-r from-sky-300 to-red-400 rounded-sm">
      <form
        method="POST"
        className="flex rounded-b-lg focus:scale-105 w-full bg-gradient-to-r from-sky-300 to-red-400"
        onSubmit={(e) =>
          comment.length >= 1 ? handleComment(e) : e.preventDefault()
        }
      >
        <input
          ref={commentInput}
          onChange={({ target }) => setComment(target.value)}
          type="text"
          aria-label="Add a Comment"
          autoComplete="off"
          placeholder="Add a Comment"
          className="py-2 rounded-b-lg placeholder:text-gray-100 bg-gradient-to-r from-sky-300 to-red-400 px-2 rounded-sm text-sm text-gray-600 w-full focus:outline-none transition ease-in-out  "
          name="add-comment"
          value={comment}
        />
        <button 
         className={` text-black outline-none pr-2 hover:scale-105 transition ease-in-out cursor-pointer font-bold ${!comment && "opacity-25"}`}
         type="button"
         disabled={comment.length < 1}
         onClick={handleComment}
        >Post</button>
      </form>
    </div>
  );
}
