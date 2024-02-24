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
    <div className="rounded-lg w-[24rem] sm:w-[30rem] md:w-[40rem] lg:w-[45rem] xl:w-[58rem] 2xl:w-[60rem] mb-4 flex flex-col flex-wrap border-2 border-black
    mt-3">
      <PostHeader photosData = {photosData}/>
      <PostImage photosData={photosData} Image={photosData.imageSrc} />
       <Actions likedPhoto ={photosData.likedPhoto} userId = {photosData.userId} docId = {photosData.photoId}  totalLikes = {photosData.likes.length} handleFocus = {handleFocus} />
      <PostFooter caption= {photosData.caption} Name = {photosData.displayName}/>
      <PostComment docId = {photosData.photoId}  comments = {photosData.comments}  createdAt = {photosData.dateCreated} commentInput = {comment}/>
    </div>
  );
}
