import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Layout from "./components/Layout";
import PostsPage from "./pages/PostsPage";

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <PostsPage />
      </Layout>
    </Provider>
  );
}

export default App;
