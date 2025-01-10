import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePostRequest,
  fetchPostsRequest,
} from "../store/slices/postSlice";
import { RootState } from "../store";
import PostTable from "../components/PostTable";
// import Table from "../components/Table";
// import PostForm from "../components/PostForm";

const PostsPage: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector(
    (state: RootState) => state.posts.fetchPosts.data?.posts || []
  );

  console.log("🚀 >> file: PostsPage.tsx:11 >> posts:", posts);

  useEffect(() => {
    dispatch(fetchPostsRequest());
  }, [dispatch]);
  const handleDelete = (id: number) => {
    dispatch(deletePostRequest(id));
  };
  return (
    <div>
      <PostTable posts={posts} onDelete={handleDelete} />
    </div>
  );
};

export default PostsPage;
