import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { fetchUsers } from "./features/users/userSlice";
import { fetchPosts } from "./features/posts/postSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

store.dispatch(fetchPosts());
store.dispatch(fetchUsers()); // to fetchUsers immidiately, fixes problem with loading users before fetching users
//also we dont need to use useeffect somewhere in file
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* We want to provide store to all files */}
      <Router>
        {/* BrowserRouter renamed as Router */}
        <Routes>
          <Route path="/*" element={<App />} />{" "}
          {/* anything beyond URL - allows us to nest routes */}
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
