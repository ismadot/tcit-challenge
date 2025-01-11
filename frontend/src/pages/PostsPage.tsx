import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostsRequest,
  deletePostRequest,
} from "../store/slices/postSlice";
import PostFilter from "../components/Filter";
import PostTable from "../components/PostTable";
import PostForm from "../components/PostForm";

const PostsPage: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector(
    (state: any) => state.posts.fetchPosts.data?.posts || []
  );
  const [filteredPosts, setFilteredPosts] = useState(posts);

  // Fetch posts when component mounts
  useEffect(() => {
    dispatch(fetchPostsRequest());
  }, [dispatch]);

  // Update filteredPosts only if posts change
  useEffect(() => {
    if (filteredPosts !== posts) {
      setFilteredPosts(posts);
    }
  }, [posts, filteredPosts]);

  const handleFilterChange = (filter: string) => {
    dispatch(fetchPostsRequest({ name: filter }));
  };

  const handleDelete = (id: number) => {
    dispatch(deletePostRequest(id));
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Posts CRUD</h1>
      <div className="mb-4">
        <PostFilter onFilterChange={handleFilterChange} />
      </div>
      <PostTable posts={filteredPosts} onDelete={handleDelete} />
      <div className="mt-6">
        <PostForm />
      </div>
    </div>
  );
};

export default PostsPage;
