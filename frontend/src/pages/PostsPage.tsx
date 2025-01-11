import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostsRequest,
  deletePostRequest,
} from "../store/slices/postSlice";
import PostFilter from "../components/Filter";
import PostTable from "../components/PostTable";
import PostForm from "../components/PostForm";
import { RootState } from "../store";

const PostsPage: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector(
    (state: RootState) => state.posts.fetchPosts.data?.posts || []
  );
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [editPost, setEditPost] = useState<null | {
    id: number;
    name: string;
    description: string;
  }>(null);

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

  const handleEdit = (post: {
    id: number;
    name: string;
    description: string;
  }) => {
    setEditPost(post);
  };

  const handleEditComplete = () => {
    setEditPost(null);
    dispatch(fetchPostsRequest());
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Posts CRUD</h1>
      <div className="mb-4">
        <PostFilter onFilterChange={handleFilterChange} />
      </div>
      <PostTable
        posts={filteredPosts}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <div className="mt-6">
        <PostForm
          editPost={editPost || undefined}
          onEditComplete={handleEditComplete}
          onReset={() => setEditPost(null)}
        />
      </div>
    </div>
  );
};

export default PostsPage;
