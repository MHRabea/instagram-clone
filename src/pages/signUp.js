import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoColor from "../images/users/Logo-color-noBackground.jpg";
import { Login, Home } from "../components/routes";
import Add from "../images/addAvatar.png";
import { Link } from "react-router-dom";
import { auth, storage, db } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";

export default function Register() {
  const [userImg, setUserImg] = useState();
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [passsword, setPasssword] = useState("");
  const [err, setErr] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const isInvalid =
    passsword === "" ||
    emailAddress === "" ||
    userName === "" ||
    fullName === "";
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const userName = e.target[0].value;
    const fullName = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;
    const file = e.target[4].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, userName);
      const uploadTask = uploadBytesResumable(storageRef, file);

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
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName: fullName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              userId: res.user.uid,
              userName,
              displayName: fullName,
              following: [],
              followers: [],
              email,
              photoURL: downloadURL,
              photoId: res.user.uid,
              imageSrc: [downloadURL],
              caption: "",
              likes: [],
              comments: [
                {
                  displayName: "",
                  comment: "",
                },
              ],
              userLatitude: "",
              userLongitude: "",
              dateCreated: serverTimestamp(),
            });
            await setDoc(doc(db, "photos", res.user.uid), {
              photoId: res.user.uid,
              userId: res.user.uid,
              imageSrc: [downloadURL],
              photoURL: downloadURL,
              displayName: fullName,
              caption: "",
              likes: [],
              comments: [
                {
                  displyName: "",
                  comment: "",
                },
              ],
              userLatitude: "",
              userLongitude: "",
              dateCreated: serverTimestamp(),
            });
            // setUrl(downloadURL);
            navigate(Home);
          });
        }
      );
    } catch (err) {
      setErr(true);
      console.log("Erroe Logging in :", err);
      setEmailAddress("");
      setPasssword("");
      setFullName("");
      setUserName("");
      setUserImg(null);
    }
    if (file) {
      setUploadedFile(file);
    }
  };

  useEffect(() => {
    document.title = "Sign_up-Insta";
  }, []);

  return (
    <div
      className="
    bg-gradient-to-r from-sky-500 to-red-400
    overflow-visible
    flex
    flex-row
    w-full
    max-w-fit
    container
    mx-auto
    h-screen
    bg-gray-200
    justify-center
    items-center
    "
    >
      <div className="flex flex-row w-1/3">
        <img
          src={LogoColor}
          alt="logo img"
          className="
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
        />
      </div>
      <div
        className="
      hover:translate-y-1
      hover:scale-110
      transition
      duration-75
      bg-gradient-to-r from-sky-500 to-red-500
      block
      max-w-sm
      rounded-lg
      p-6
      flex-col
      basis-1/2
      hover:shadow-[0_8px_5px_-4px_rgba(248,113,113,1),5px_4px_18px_2px_rgba(248,113,113)]
      "
      >
        <div
          className="
        relative mb-6
        flex
        justify-center
        text-black-400
        hover:translate-y-1 hover:scale-110
        "
        >
          Sign_Up
        </div>
        <form onSubmit={handleSignUp} method="POST">
          <div className="relative mb-9">
            <input
              type="text"
              aria-describedby="name"
              aria-label="type your user name"
              value={userName}
              placeholder=" "
              autoComplete="false"
              onChange={({ target }) =>
                setUserName(target.value) || setErr(null)
              }
              id="InputName"
              className="
              block
              px-2.5
              pb-2.5
              pt-4
              text-sm
              text-gray-900
              bg-transparent
              rounded-lg
              border-1
              border-gray-300
              appearance-none
              dark:text-white
              dark:border-gray-600
              dark:focus:border-blue-500
              focus:outline-none
              focus:ring-0
              focus:border-blue-600
              peer
              min-h-[auto]
              hover:scale-110
              w-full
              duration-100
              ease-linear
              motion-reduce:transition-none
              dark:active:shadow-[0_8px_5px_-4px_rgba(0,0,0),0_4px_18px_0_rgba(0,0,0)]]
              hover:shadow-[0_8px_5px_-4px_rgba(248,113,113),0_4px_18px_0_rgba(0,0,0)]
              focus:shadow-[0_8px_9px_-4px_rgba(0,0,0),0_4px_18px_0_rgba(0,0,0)]
              active:shadow-[0_8px_5px_-4px_rgba(0,0,0),0_4px_18px_0_rgba(0,0,0)]
              dark:shadow-[0_2px_5px_-4px_rgba(0,0,0)]
              "
            />
            <label
              htmlFor="InputName"
              className="
              absolute
              text-md
              text-neutral-300
              dark:text-neutral-300
              duration-100
              transform -translate-y-9 -translate-x-3
              peer-focus:-translate-y-9
              peer-focus:-translate-x-5
              peer-focus:px-4
              peer-focus:text-white
              peer-focus:dark:text-white
              peer-focus:top-2
              peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-1/2
              peer-placeholder-shown:top-0
              peer-focus:scale-75
              scale-75
              top-2
              left-3
              z-10
              origin-[0]
              bg-transparent
              px-2
              pointer-events-none
              ease-out
              peer-focus:text-primary
              motion-reduce:transition-none
              dark:peer-focus:text-primary
                "
            >
              Enter Your Name
            </label>
          </div>
          <div className="relative mb-9">
            <input
              type="text"
              aria-describedby="name"
              aria-label="type your full name"
              value={fullName}
              placeholder=" "
              autoComplete="false"
              onChange={({ target }) =>
                setFullName(target.value) || setErr(null)
              }
              id="InputFullName"
              className="
              block
              px-2.5
              pb-2.5
              pt-4
              text-sm
              text-gray-900
              bg-transparent
              rounded-lg
              border-1
              border-gray-300
              appearance-none
              dark:text-white
              dark:border-gray-600
              dark:focus:border-blue-500
              focus:outline-none
              focus:ring-0
              focus:border-blue-600
              peer
              min-h-[auto]
              hover:scale-110
              w-full
              duration-100
              ease-linear
              motion-reduce:transition-none
              dark:active:shadow-[0_8px_5px_-4px_rgba(0,0,0),0_4px_18px_0_rgba(0,0,0)]]
              hover:shadow-[0_8px_5px_-4px_rgba(248,113,113),0_4px_18px_0_rgba(0,0,0)]
              focus:shadow-[0_8px_9px_-4px_rgba(0,0,0),0_4px_18px_0_rgba(0,0,0)]
              active:shadow-[0_8px_5px_-4px_rgba(0,0,0),0_4px_18px_0_rgba(0,0,0)]
              dark:shadow-[0_2px_5px_-4px_rgba(0,0,0)]
              "
            />
            <label
              htmlFor="InputFullName"
              className="
              absolute
              text-md
              text-neutral-300
              dark:text-neutral-300
              duration-100
              transform -translate-y-9 -translate-x-3
              peer-focus:-translate-y-9
              peer-focus:-translate-x-5
              peer-focus:px-4
              peer-focus:text-white
              peer-focus:dark:text-white
              peer-focus:top-2
              peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-1/2
              peer-placeholder-shown:top-0
              peer-focus:scale-75
              scale-75
              top-2
              left-3
              z-10
              origin-[0]
              bg-transparent
              px-2
              pointer-events-none
              ease-out
              peer-focus:text-primary
              motion-reduce:transition-none
              dark:peer-focus:text-primary
                "
            >
              Enter Your Full Name
            </label>
          </div>
          <div className="relative mb-9">
            <input
              type="email"
              aria-describedby="Email"
              aria-label="type your email address"
              value={emailAddress}
              placeholder=" "
              autoComplete="false"
              onChange={({ target }) =>
                setEmailAddress(target.value) || setErr(null)
              }
              id="Input Email"
              className="
              block
              px-2.5
              pb-2.5
              pt-4
              text-sm
              text-gray-900
              bg-transparent
              rounded-lg
              border-1
              border-gray-300
              appearance-none
              dark:text-white
              dark:border-gray-600
              dark:focus:border-blue-500
              focus:outline-none
              focus:ring-0
              focus:border-blue-600
              peer
              min-h-[auto]
              hover:scale-110
              w-full
              duration-100
              ease-linear
              motion-reduce:transition-none
              dark:active:shadow-[0_8px_5px_-4px_rgba(0,0,0),0_4px_18px_0_rgba(0,0,0)]]
              hover:shadow-[0_8px_5px_-4px_rgba(248,113,113),0_4px_18px_0_rgba(0,0,0)]
              focus:shadow-[0_8px_9px_-4px_rgba(0,0,0),0_4px_18px_0_rgba(0,0,0)]
              active:shadow-[0_8px_5px_-4px_rgba(0,0,0),0_4px_18px_0_rgba(0,0,0)]
              dark:shadow-[0_2px_5px_-4px_rgba(0,0,0)]
              "
            />
            <label
              htmlFor="Input Email"
              className="
              absolute
              text-md
              text-neutral-300
              dark:text-neutral-300
              duration-100
              transform -translate-y-9 -translate-x-3
              peer-focus:-translate-y-9
              peer-focus:-translate-x-5
              peer-focus:px-4
              peer-focus:text-white
              peer-focus:dark:text-white
              peer-focus:top-2
              peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-1/2
              peer-placeholder-shown:top-0
              peer-focus:scale-75
              scale-75
              top-2
              left-3
              z-10
              origin-[0]
              bg-transparent
              px-2
              pointer-events-none
              ease-out
              peer-focus:text-primary
              motion-reduce:transition-none
              dark:peer-focus:text-primary
                "
            >
              Enter Your Email Address
            </label>
          </div>
          <div className="relative mb-9">
            <input
              value={passsword}
              type="password"
              className="
              block
              px-2.5
              pb-2.5
              pt-4
              text-sm
              text-gray-900
              bg-transparent
              rounded-lg
              border-1
              border-gray-300
              appearance-none
              dark:text-white
              dark:border-gray-600
              dark:focus:border-blue-500
              focus:outline-none
              focus:ring-0
              focus:border-blue-600
              peer
              min-h-[auto]
              hover:scale-110
              w-full
              duration-100
              ease-linear
              motion-reduce:transition-none
              dark:active:shadow-[0_8px_5px_-4px_rgba(0,0,0),0_4px_18px_0_rgba(0,0,0)]]
              hover:shadow-[0_8px_5px_-4px_rgba(248,113,113),0_4px_18px_0_rgba(0,0,0)]
              focus:shadow-[0_8px_9px_-4px_rgba(0,0,0),0_4px_18px_0_rgba(0,0,0)]
              active:shadow-[0_8px_5px_-4px_rgba(0,0,0),0_4px_18px_0_rgba(0,0,0)]
              dark:shadow-[0_2px_5px_-4px_rgba(0,0,0)]"
              id="Input Password"
              placeholder=" "
              aria-label="type your password"
              autoComplete="false"
              onChange={({ target }) =>
                setPasssword(target.value) || setErr(null)
              }
            />
            <label
              htmlFor="Input Password"
              className="
              absolute
              text-md
              text-neutral-300
              dark:text-neutral-300
              duration-100
              transform -translate-y-9 -translate-x-3
              peer-focus:-translate-y-9
              peer-focus:-translate-x-5
              peer-focus:px-4
              peer-focus:text-white
              peer-focus:dark:text-white
              peer-focus:top-2
              peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-1/2
              peer-placeholder-shown:top-0
              peer-focus:scale-75
              scale-75
              top-2
              left-3
              z-10
              origin-[0]
              bg-transparent
              px-2
              pointer-events-none
              ease-out
              peer-focus:text-primary
              motion-reduce:transition-none
              dark:peer-focus:text-primary
                "
            >
              Enter a Password
            </label>
          </div>
          <div
            className="
          relative
          h-32
          w-32
          justify-items-center
          items-center
          flex-row
          mx-auto
          transition-all
              transform
              hover:scale-125
              cursor-pointer
              ease-in-out
              "
          >
            <input
              style={{ display: "none" }}
              type="file"
              aria-describedby="Img"
              aria-label="type your email address"
              value={userImg}
              placeholder=" "
              onChange={({ target }) =>
                setUserImg(target.value) || setErr(null)
              }
              id="InputImg"
              className="
              bg-transparent
              motion-reduce:transition-none
              flex
              "
            />
            <label
              htmlFor="InputImg"
              className="
              transition-all
              transform
              hover:scale-110
              cursor-pointer"
            >
              <img
                src={Add}
                alt="add img"
                className="
                cursor-pointer
            flex
            mx-auto
            items-center
            justify-center
            bg-transparent
            pointer-events-none
                "
              />
              <span
                className="
                items-center
                justify-center
                flex
                "
              >
                Add Your Photo
              </span>
            </label>
          </div>
          <button
            disabled={isInvalid}
            style={isInvalid ? { opacity: "0.5" } : { opacity: "1" }}
            type="submit"
            className="
            transform
            hover:-translate-y-1
            hover:scale-110
            inline-block
            w-full rounded
            bg-primary px-6 pb-2 pt-2.5 text-xs
            font-medium
            uppercase
            leading-normal
            text-white
            shadow-[0_4px_9px_-4px_#3b71ca]
            transition
            duration-100
            ease-in-out
            hover:bg-primary-600
            focus:bg-primary-600
            focus:outline-none
            focus:ring-0
            active:bg-primary-700
            focus:shadow-[0_8px_9px_-4px_rgba(0,0,0),0_4px_18px_0_rgba(0,0,0)]
            hover:shadow-[0_8px_5px_-4px_rgba(248,113,113),0_4px_18px_0_rgba(0,0,0)]
            active:shadow-[0_8px_9px_-4px_rgba(0,0,0),0_4px_18px_0_rgba(0,0,0)]
            dark:shadow-[0_2px_5px_-4px_rgba(0,0,0)]
            dark:hover:shadow-[0_8px_9px_-4px_rgba(248,113,113)),0_4px_18px_0_rgba(248,113,113)]
            dark:active:shadow-[0_8px_5px_-4px_rgba(0,0,0),0_4px_18px_0_rgba(0,0,0)]]
            dark:focus:shadow-[0_8px_5px_-4px_rgba(0,0,0),0_4px_18px_0_rgba(0,0,0)]
            "
          >
            Sign Up
          </button>
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
                  Uploading Profile ...{progress}%
                </motion.div>
              </motion.div>
            </motion.div>
          )}
          {err && (
            <motion.p
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0,
                ease: [0, 0.71, 0.2, 1.01],
              }}
              className="
          pt-2
          text-zinc-900
          text-sm-center
          underline
          underline-offset-1
          relative mb-6
          flex
          justify-center
          text-black-400
          hover:translate-y-1
          hover:scale-110
          transition
          transform
          duration-200
          ease-in-out
          "
            >
              User Already Exist , please Login?
            </motion.p>
          )}
          <p className="mt-6 text-center text-neutral-800 dark:text-neutral-200">
            Already Have an Account ?
            <Link
              style={err ? { color: "black" } : {}}
              to={Login}
              className="
              transform
              inline-block
              rounded
              hover:translate-y-1
              hover:scale-110
              ml-2
              bg-primary px-10 pb-1 pt-1 text-md
              text-primary
              transition
              duration-150
              ease-in-out
              hover:text-primary-600
              focus:text-primary-600
              active:text-primary-700
              dark:text-primary-400 dark:hover:text-primary-500
              dark:focus:text-primary-500 dark:active:text-primary-600
              focus:shadow-[0_8px_9px_-4px_rgba(0,0,0),0_4px_18px_0_rgba(0,0,0)]
              hover:shadow-[0_8px_5px_-4px_rgba(248,113,113),0_4px_18px_0_rgba(0,0,0)]
              active:shadow-[0_8px_9px_-4px_rgba(0,0,0),0_4px_18px_0_rgba(0,0,0)]
              dark:shadow-[0_2px_5px_-4px_rgba(0,0,0)]
              dark:hover:shadow-[0_8px_9px_-4px_rgba(248,113,113)),0_4px_18px_0_rgba(248,113,113)]
              dark:active:shadow-[0_8px_5px_-4px_rgba(0,0,0),0_4px_18px_0_rgba(0,0,0)]]
              dark:focus:shadow-[0_8px_5px_-4px_rgba(0,0,0),0_4px_18px_0_rgba(0,0,0)]
              "
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
