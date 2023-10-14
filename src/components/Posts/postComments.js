import { useState } from "react"
import {formatDistance} from "date-fns"
import { Link } from "react-router-dom"
import {v4 as uuidv4} from "uuid"
import AddComment from "./addComment";


export default function PostComment ({docId , comments: totalComments , createdAt , commentInput }) {
    const [comments  , setComments] = useState(totalComments)
    return (
        <div className="items-center rounded-b-lg w-full bg-gradient-to-r from-sky-400 to-red-500">
            <p className="upperCase px-2 text-gray-100">Comments</p>
            {comments.length >= 4 && (
                <p className="px-2 text-sm mb-1 cursor-pointer uppercase text-gray-300">
                    View all {comments.length} comments
                </p>
            )}
            {comments.slice(0 , 3 ).map(comment =>(
                <p key={uuidv4()} className=" px-2 mb-1">
                    <Link to={`/p/${comment.displayName}`} className="space-x-1">
                        <span className="font-bold">{comment.displayName} :</span>
                        <span>{comment.comment}</span>
                    </Link>
                </p>
            ))}
            <p className="px-2 mb-2 text-xs text-gray-200 uppercase">{formatDistance(createdAt.seconds , createdAt.nanoseconds , new Date())} ago</p>
            <AddComment 
            docId={docId}
            comments={comments}
            setComments={setComments}
            commentInput={commentInput}
             />
        </div>
    )
}