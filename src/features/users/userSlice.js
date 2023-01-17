import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USER_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get(USER_URL);
    return response.data;
  } catch (err) {
    console.trace(err);
    return err.message;
  }
});

const initialState = {
  users: [], //hydrate state from API
  error: null,
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded"; // IMMERJS
        const loadedUsers = action.payload.map((el) => {
          //we change payload, and then save it, and concat it
          el.userId = el.id;
          delete el.username;
          delete el.email;
          delete el.address;
          delete el.phone;
          delete el.website;
          delete el.company;
          return el;
        });
        state.users = state.users.concat(loadedUsers);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        console.log("fetch users failed");
        state.status = "failed";
        state.error = action.error.message; //action has payload, and error keys
      });
  },
});

export const selectAllUsers = (state) => state.user.users;
export const selectUsersStatus = (state) => state.user.status;
export const selectUsersError = (state) => state.user.error;
export default userSlice.reducer;
export const { newUser } = userSlice.actions;
