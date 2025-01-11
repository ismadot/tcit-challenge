import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addPostRequest, updatePostRequest } from "../store/slices/postSlice";
interface PostFormProps {
  editPost?: { id: number; name: string; description: string };
  onSaveComplete: () => void;
  onReset: () => void;
}
const PostForm: React.FC<PostFormProps> = ({
  editPost,
  onSaveComplete,
  onReset,
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (editPost) {
      setName(editPost.name);
      setDescription(editPost.description);
      setIsEditing(true);
    }
  }, [editPost]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation for empty name
    if (name.trim() === "") {
      alert("The 'Name' field cannot be empty.");
      return;
    }

    if (isEditing && editPost) {
      dispatch(updatePostRequest({ id: editPost.id, name, description }));
      setIsEditing(false);
    } else {
      dispatch(addPostRequest({ name, description }));
    }
    onSaveComplete();
    setName("");
    setDescription("");
  };

  const handleReset = () => {
    setName("");
    setDescription("");
    onReset();
    setIsEditing(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-4 rounded-md border-4 shadow-pixel mb-4 relative transition-colors ${
        isEditing
          ? "bg-green-700 text-white border-green-500"
          : "bg-purple-700 text-white border-pink-500"
      }`}
    >
      <h2 className="text-xl font-bold mb-4 text-center">
        {isEditing ? "Edit Post" : "Create a New Post"}
      </h2>
      {isEditing && (
        <button
          onClick={handleReset}
          aria-label="Cancel editing"
          className="absolute top-2 right-3 text-red-500 hover:text-red-700"
        >
          ❌
        </button>
      )}
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
        {isEditing ? "Edit Post 📝" : "Create Post 💾"}
      </button>
    </form>
  );
};

export default PostForm;
