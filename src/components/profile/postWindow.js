import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import add from "../../images/addAvatar.png";
import {storage , db} from "../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import useUserData from "../../data/currentUserData";
import {v4  as uuidv4} from "uuid";

const PostWindow = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [err, setErr] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const [progress, setProgress] = useState(0);

  const currentUserData = useUserData();



  const handleSubmit = (e) => {
    e.preventDefault();
    const files = e.target[0].files[0];
    const caption = e.target[1].value;

    try {
        const storageRef = ref(storage, caption);
        const uploadTask = uploadBytesResumable(storageRef, files);

        uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("upload is" + percentage + "% done");
          setProgress(percentage);
        },
        (err) => {
          setErr(true);
          console.log(err);
        },
        () =>{
            const uuid = uuidv4()
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                await setDoc(doc(db, "photos", uuid), {
              photoId: uuid,
              userId: currentUserData.userId,
              imageSrc: [downloadURL],
              photoURL: currentUserData.photoURL,
              displayName: currentUserData.displayName,
              caption: caption,
              likes: [],
              comments: [
              ],
              userLatitude: "",
              userLongitude: "",
              dateCreated: serverTimestamp(),
            });
            setShowForm(true)
            setImage(null)
            setCaption("")
            setUploadedFile(null)
            window.location.reload(true)
            })
        })
    } catch (error) {
      console.log("err uploading post", error , err);
      setImage("");
      setCaption("");
      setShowForm(false);
    }
    if (files) {
      setUploadedFile(files);
    }

    // Do something with the image and caption, like sending them to an API
    console.log("Image:", image);
    console.log("Caption:", caption);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const handleFormClose = () => {
    setShowForm(false);
    // Reset the form
    setImage("");
    setCaption("");
  };

  return (
    <div className=" transition ease-in-out hover:scale-105 max-w-md mx-auto p-4 bg-transparent rounded-3xl shadow-lg hover:shadow-2xl shadow-gray-600 hover:shadow-gray-200 items-center justify-center text-white cursor-pointer">
      {!showForm ? (
        <button className=" " onClick={() => setShowForm(true)}>
          Add Post
        </button>
      ) : (
        <AnimatePresence>
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.3 }}
            className="items-center flex flex-col"
          >
            <motion.h2
              className="text-lg font-medium mb-4 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Create a Post
            </motion.h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 flex flex-col items-center justify-center">
                <label
                  htmlFor="image"
                  className="cursor-pointer block mb-2 text-sm font-medium text-white"
                >
                  <img src={add} alt="" />
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="hidden w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                  onChange={handleImageChange}
                  required
                />
                {image && (
                  <motion.img
                    src={image}
                    alt="Preview"
                    className="mt-2 rounded-md"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>
              <div className="mb-4 flex flex-col items-center justify-center">
                <label
                  htmlFor="caption"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  write Something
                </label>
                {uploadedFile && (
            <motion.div
              className="
            relative
            mb-8
            mt-5
            "
            >
              <motion.div
                className="
            w-full bg-gray-200 rounded-full dark:bg-gray-700
             "
              >
                <motion.div
                  className="
                 bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                  style={{
                    width: `${progress}%`,
                    transition: "width 0.5s ease-in-out",
                  }}
                >
                  Uploading Image ...{progress}%
                </motion.div>
              </motion.div>
            </motion.div>
          )}
                <textarea
                  id="caption"
                  name="caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-3 py-2  rounded-md bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                  placeholder="Enter the caption"
                  rows={4}
                  required
                />
              </div>
              <div className="flex items-center justify-center space-x-3">
                <motion.button
                  type="submit"
                  className=" hover:translate-y-1 bg-transparent shadow-lg shadow-gray-300 text-white font-medium py-2 px-4 rounded-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Post
                </motion.button>
                <motion.button
                  type="button"
                  className=" hover:translate-y-1 bg-transparent shadow-lg shadow-gray-300 text-white font-medium py-2 px-4 rounded-md"
                  onClick={handleFormClose}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default PostWindow;
