import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PostImage = ({ key, Image }) => {
  const [isEnlarged, setIsEnlarged] = useState(false);

  const toggleEnlarged = () => {
    setIsEnlarged(!isEnlarged);
  };

  const handleClose = () => {
    setIsEnlarged(false);
  };

  return (
    <>
      <div
        key={key}
        className={`flex items-center flex-col ${
          isEnlarged ? 'fixed inset-0 z-50 flex justify-center items-center' : ''
        }`}
      >
        {isEnlarged && (
          <>
            <motion.div
              className="fixed inset-0 bg-black opacity-75"
              onClick={handleClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative h-full w-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <img
                className="h-full w-full object-contain rounded-lg cursor-pointer"
                src={Image}
                alt="postedImg"
                onClick={handleClose}
              />
              <motion.button
                className="absolute top-4 right-4 text-white text-3xl focus:outline-none"
                onClick={handleClose}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              >
                &times;
              </motion.button>
            </motion.div>
          </>
        )}
        {!isEnlarged && (
          <img
            className="h-[18rem] md:h-[25rem] w-full rounded-sm cursor-pointer object-cover"
            src={Image}
            alt="postedImg"
            onClick={toggleEnlarged}
          />
        )}
      </div>
    </>
  );
};

export default PostImage;