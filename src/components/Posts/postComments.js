import { useState } from "react"
import {formatDistance} from "date-fns"
import { Link } from "react-router-dom"
 

export default function PostComment ({docId , comments: totalComments , posted , commentInput }) {
    const [comments  , setComments] = useState(totalComments)
    return (
        <div className="items-center px-2 py-1 w-full">
            {comments.length >= 1 && (
                <p className="text-sm mb-1 cursor-pointer">
                    View all {comments.length} comments
                </p>
            )}
            {comments.slice(0 , 3 ).map(comment =>(
                <p key={comment.comment - comment.displayName} className="mb-1">
                    <Link to={`/p/${comment.displayName}`} className="space-x-1">
                        <span>{comment.displayName} :</span>
                        <span>{comment.comment}</span>
                    </Link>
                </p>
            ))}
        </div>
    )
}