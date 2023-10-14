import PostHeader from "./postHeader";
import PostImage from "./postImage";
import Actions from "./actions";
import { useRef } from "react";
import PostFooter from "./postFooter";
import PostComment from "./postComments";

export default function Post({ followedUser}) {

  const comment = useRef(null);
  const handleFocus = () => comment.current.focus()
  return (
    <div className=" rounded  w-full mb-4">
      <PostHeader followedUser={followedUser} />
      <PostImage followedUser={followedUser} Images={followedUser.imageSrc} />
      <Actions likedPhoto ={followedUser.likedPhoto} userId = {followedUser.userId} docId = {followedUser.photoId}  totalLikes = {followedUser.likes.length} handleFocus = {handleFocus} />
      <PostFooter caption= {followedUser.caption} Name = {followedUser.userName}/>
      <PostComment docId = {followedUser.photoId}  comments = {followedUser.comments}  createdAt = {followedUser.dateCreated} commentInput = {comment}/>
    </div>
  );
}
