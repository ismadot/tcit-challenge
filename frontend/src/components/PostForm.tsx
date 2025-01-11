import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPostRequest } from "../store/slices/postSlice";

const PostForm: React.FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && description) {
      dispatch(addPostRequest({ name, description }));
      setName("");
      setDescription("");
    } else {
      alert("Please fill out both fields.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-purple-700 text-white rounded-md border-4 border-pink-500 shadow-pixel mb-4"
    >
      <h2 className="text-xl font-bold mb-4 text-center">Create a New Post</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border-2 border-pink-500 bg-purple-900 rounded-md focus:outline-none focus:ring focus:ring-pink-300 placeholder-pink-300"
          placeholder="Enter post name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border-2 border-pink-500 bg-purple-900 rounded-md focus:outline-none focus:ring focus:ring-pink-300 placeholder-pink-300"
          placeholder="Enter post description"
        />
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-pink-500 text-black font-bold rounded-md hover:bg-pink-600 transition-all duration-300 shadow-pixel"
      >
        Create Post 💾
      </button>
    </form>
  );
};

export default PostForm;
