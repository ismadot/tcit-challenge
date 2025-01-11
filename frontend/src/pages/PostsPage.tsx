import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostsRequest,
  deletePostRequest,
} from "../store/slices/postSlice";
import PostFilter from "../components/Filter";
import PostTable from "../components/PostTable";
import PostForm from "../components/PostForm";
import { RootState } from "../store";
import Paginator from "../components/Paginator";

const PostsPage: React.FC = () => {
  const dispatch = useDispatch();
  const postsData = useSelector(
    (state: RootState) => state.posts.fetchPosts.data
  );
  const posts = useMemo(() => postsData?.posts || [], [postsData]);
  const totalPosts = postsData?.total || 0;

  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [editPost, setEditPost] = useState<null | {
    id: number;
    name: string;
    description: string;
  }>(null);

  useEffect(() => {
    dispatch(fetchPostsRequest({ per_page: perPage }));
  }, [dispatch, perPage]);

  useEffect(() => {
    if (filteredPosts !== posts) {
      setFilteredPosts(posts);
    }
  }, [posts, filteredPosts]);

  const handleFilterChange = (filter: string) => {
    dispatch(fetchPostsRequest({ name: filter, per_page: perPage }));
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

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
  };

  const handleSaveComplete = () => {
    dispatch(fetchPostsRequest({ per_page: perPage, page: currentPage }));
    setEditPost(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(fetchPostsRequest({ per_page: perPage, page }));
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Posts CRUD</h1>
      <div className="mb-4">
        <PostFilter
          onFilterChange={handleFilterChange}
          onPerPageChange={handlePerPageChange}
        />
      </div>
      <PostTable
        posts={filteredPosts}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <Paginator
        currentPage={currentPage}
        totalPages={Math.ceil(totalPosts / perPage)}
        onPageChange={handlePageChange}
      />
      <div className="mt-6">
        <PostForm
          editPost={editPost || undefined}
          onSaveComplete={handleSaveComplete}
          onReset={() => setEditPost(null)}
        />
      </div>
    </div>
  );
};

export default PostsPage;
