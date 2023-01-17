import AddPostList from "./features/posts/AddPostList";
import AddPostForm from "./features/posts/AddPostForm";

import EditPostForm from "./features/posts/EditPostForm";
import SinglePostPage from "./features/posts/SinglePostPage";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {" "}
        {/* Layout is parent to everything, we set styles here */}
        <Route index element={<AddPostList />} />{" "}
        {/* index shows up by default, only one index per route */}
        {/* <Route index element={<AddPostList />} /> */}
        <Route path="post">
          {" "}
          {/* route URL/post */}
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />{" "}
          {/* goes to selected post, after url/post/:postId */}
          <Route path="edit/:postId" element={<EditPostForm />} /> {/* FIX! */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
