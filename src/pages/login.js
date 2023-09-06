import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoColor from "../images/users/Logo-color-noBackground.jpg";
import { Sign_Up, Home } from "../components/routes";

import { Link } from "react-router-dom";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { motion } from "framer-motion";

export default function Login() {
  const [emailAddress, setEmailAddress] = useState("");
  const [passsword, setPasssword] = useState("");
  const [err, setErr] = useState(false);
  const isInvalid = passsword === "" || emailAddress === "";


  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(Home);
    } catch (err) {
      setErr(true);
      console.log("Erroe Logging in :", err);
      setEmailAddress("");
      setPasssword("");
    }
  };

  useEffect(() => {
    document.title = "Login - Insta";
  }, []);


  return (
    <div className="
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
    justify-center items-center">
      <div className="flex flex-row w-1/3">
        <img src={LogoColor} alt="logo img"
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
        "/>
      </div>
      <div className="
      hover:translate-y-1 hover:scale-110
      transition duration-75
      bg-gradient-to-r from-sky-500 to-red-500
      block
      max-w-sm
      rounded-lg
      p-6
      flex-col basis-1/2
      hover:shadow-[0_8px_5px_-4px_rgba(248,113,113,1),5px_4px_18px_2px_rgba(248,113,113)]
      ">
        <div className="
        relative mb-6
        flex
        justify-center
        text-black-400
         hover:translate-y-1 hover:scale-110
        ">Login</div>
        <form onSubmit={handleLogin} method="POST">
          <div className="relative mb-6">
            <input
              type="email"
              aria-describedby="emailHelp"
              aria-label="type your email address"
              value={emailAddress}
              placeholder=" "
              autoComplete="false"
              onChange={({ target }) => setEmailAddress(target.value) || setErr(null)}
              id="exampleInputEmail1"
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
              "/>
            <label
              htmlFor="exampleInputEmail1"
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
                ">Email Address</label>

          </div>
          <div className="relative mb-6">
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
              id="InputPassword"
              placeholder=" "
              aria-label="type your password address"
              autoComplete="false"
              onChange={({ target }) => setPasssword(target.value) || setErr(null)} />
            <label
              htmlFor="InputPassword"
              className="
              absolute
              text-md
              text-neutral-300
              dark:text-neutral-300
              duration-100
              transform -translate-y-7 -translate-x-3
              peer-focus:-translate-y-7
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
                ">Password</label>
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
            ">
            Sign in
          </button>
          {err && (<motion.p
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0,
              ease: [0, 0.71, 0.2, 1.01]
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
          ">Invalid Email or Password</motion.p>)}
          <p
            className="mt-6 text-center text-neutral-800 dark:text-neutral-200">
            Not a member?
            <Link
              style={err ? { color: "black" } : {}}
              to={Sign_Up}
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
              ">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
