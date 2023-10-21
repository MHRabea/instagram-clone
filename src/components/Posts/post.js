import PostHeader from "./postHeader";
import PostImage from "./postImage";
import Actions from "./actions";
import { useRef } from "react";
import PostFooter from "./postFooter";
import PostComment from "./postComments";

export default function Post({ photosData}) {

  const comment = useRef(null);
  const handleFocus = () => comment.current.focus()
  return (
    <div className=" rounded  w-full mb-4">
      <PostHeader photosData = {photosData}/>
      <PostImage photosData={photosData} Image={photosData.imageSrc} />
       <Actions likedPhoto ={photosData.likedPhoto} userId = {photosData.userId} docId = {photosData.photoId}  totalLikes = {photosData.likes.length} handleFocus = {handleFocus} />
      <PostFooter caption= {photosData.caption} Name = {photosData.displayName}/>
      <PostComment docId = {photosData.photoId}  comments = {photosData.comments}  createdAt = {photosData.dateCreated} commentInput = {comment}/>
    </div>
  );
}
