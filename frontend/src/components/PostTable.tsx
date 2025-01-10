import React from "react";
import { Post } from "../store/types";

interface PostTableProps {
  posts: Post[];
  onDelete: (id: number) => void;
}

const PostTable: React.FC<PostTableProps> = ({ posts, onDelete }) => {
  return (
    <table className="w-full text-left border-collapse bg-gray-800">
      <thead className="bg-retroYellow text-gray-900">
        <tr>
          <th className="p-3">#</th>
          <th className="p-3">Name</th>
          <th className="p-3">Description</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post, index) => (
          <tr
            key={post.id}
            className={`hover:bg-retroGreen hover:text-gray-900 ${
              index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"
            }`}
          >
            <td className="p-3">{post.id}</td>
            <td className="p-3">{post.name}</td>
            <td className="p-3">{post.description}</td>
            <td className="p-3">
              <button
                className="px-2 py-1 bg-retroOrange text-gray-900 rounded hover:bg-retroYellow"
                onClick={() => onDelete(post.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PostTable;
