import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsRequest } from "../store/slices/postSlice";
import { RootState } from "../store";
// import Table from "../components/Table";
// import PostForm from "../components/PostForm";

const PostsPage: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.fetchPosts.data);
  console.log("🚀 >> file: PostsPage.tsx:11 >> posts:", posts);

  useEffect(() => {
    dispatch(fetchPostsRequest());
  }, [dispatch]);

  return <div></div>;
};

export default PostsPage;
