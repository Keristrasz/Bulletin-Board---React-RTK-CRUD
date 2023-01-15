import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

//fake API which simualtes get, post, update, delete requests

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

//createAsyncThunk we use when working with REDUX
//2 args - string prefix for generated action types,, promise return data or error

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POST_URL); //get request
    return response.data;
  } catch (err) {
    console.trace(err);
    return err.message;
  }
});

//now we want to post data into API, not fetch them. It recieves initialPost we are gonna send into

export const addNewPost = createAsyncThunk("posts/addNewPost", async (initialPost) => {
  try {
    const response = await axios.post(POST_URL, initialPost); //POST request
    return response.data;
  } catch (err) {
    console.trace(err);
    return err.message;
  }
});

const initialState = {
  posts: [], //hydrate state from API
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
};
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    newPostReaction: (state, action) => {
      //reducer for reaction numbers

      //DECLERATIVE WAY - we find needed post from state, and add reaction++
      const postExists = state.posts.find((post) => post.id === action.payload.postId);
      if (postExists) {
        postExists.reaction[action.payload.reaction]++;
      }
    },
  }, //Extra reducer can response on action we didnt define - like fetchPosts
  extraReducers(builder) {
    //with builder (object) we can add additional case reducers which can response on actions not defined in slice
    builder //like switch statement?
      .addCase(fetchPosts.pending, (state, action) => {
        //if fetchPosts.pending is true?
        //listens for the promise status action types
        state.status = "loading"; //if fetchPosts is pending, state.status is loading
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded"; // dont forget we can mutate state like this only in slice cause of IMMERJS
        let timer = 3;
        const loadedPosts = action.payload.map((post) => {
          //we change payload and then save it
          //we load each post with map, so we can edit it and concat it to state
          post.date = sub(new Date(), { minutes: (timer += 4) }).toISOString(); //adding date, not defined in API
          //adding reactions, not defined in API
          post.reaction = {
            like: 0,
            heart: 0,
            rocket: 0,
            guitar: 0,
            mug: 0,
          };
          return post; //returning posts from API, with added info
        });

        // Add any fetched posts to the state array - state.posts
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        console.log("fetch post failed");
        state.status = "failed";
        state.error = action.error.message; //action has payload, and error keys
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        //we are gonna define payload we gonna send to API
        action.payload.date = new Date().toISOString();
        action.payload.id = nanoid();
        action.payload.reaction = {
          like: 0,
          heart: 0,
          rocket: 0,
          guitar: 0,
          mug: 0,
        };
        console.log(action.payload);
        state.posts.unshift(action.payload);
      });
  },
});

export const selectAllPosts = (state) => state.post.posts;
export const selectPostsStatus = (state) => state.post.status;
export const selectPostsError = (state) => state.post.error;
export default postSlice.reducer;
export const { newPost, newPostReaction } = postSlice.actions;
