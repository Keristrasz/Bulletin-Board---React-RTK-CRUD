import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { fetchUsers } from "./features/users/userSlice";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

store.dispatch(fetchUsers()); // to fetchUsers immidiately, fixes problem with loading users before fetching users
//also we dont need to use useeffect somewhere in file
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
