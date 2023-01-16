import { configureStore } from "@reduxjs/toolkit";
import reducerFromPostSlice from "../features/posts/postSlice";
import reducerFromUserSlice from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    post: reducerFromPostSlice,
    user: reducerFromUserSlice,
  },
});
