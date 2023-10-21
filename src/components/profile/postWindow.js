import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PostWindow = () => {
  const [image, setImage] = useState('');
  const [caption, setCaption] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the image and caption, like sending them to an API
    console.log('Image:', image);
    console.log('Caption:', caption);
    // Reset the form
    setImage('');
    setCaption('');
    // Close the form
    setShowForm(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const handleFormClose = () => {
    setShowForm(false);
    // Reset the form
    setImage('');
    setCaption('');
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gradient-to-r from-sky-500 to-red-500 rounded-3xl shadow-md items-center justify-center text-white">
      {!showForm ? (
        <button
          className=" transition
          rounded-lg
        ease-in-out
        hover:scale-125
        flex cursor-pointer shadow-lg px-4 hover:shadow-2xl"
          onClick={() => setShowForm(true)}
        >
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
              <div className="mb-4">
                <label htmlFor="image" className="block mb-2 text-sm font-medium text-white">
                  Image Upload
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:border-blue-500"
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
              <div className="mb-4">
                <label htmlFor="caption" className="block mb-2 text-sm font-medium text-white">
                  Caption
                </label>
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
              <motion.button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md mr-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Post
              </motion.button>
              <motion.button
                type="button"
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md"
                onClick={handleFormClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Close
              </motion.button>
            </form>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default PostWindow;