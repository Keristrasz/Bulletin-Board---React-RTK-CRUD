import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, selectPostById } from "./postSlice";
import { selectAllUsers } from "../users/userSlice";
import PostUser from "../users/PostUser";
import {useParams, useNavigate} from "react-router-dom"

// import PostReactionButtons from "./PostReactionButtons";
// import TimeAgo from "./TimeAgo";

const EditPostForm = () => {
  const { postId } = useParams() //pulls postId from url params
  const navigate = useNavigate()
  
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const currentPost = useSelector(state => selectPostById(state, Number(postId))) // have to have callback to post both state, and postId
  const currentUser = users.find((el) => el.id === currentPost.userId);

  //<TimeAgo timestamp={currentPost.date} />
//  <PostReactionButtons post={currentPost} />

  const {title: titleForUseState, body: bodyForUseState} = currentPost;

  const [user, setUser] = useState({currentUser});
  const [title, setTitle] = useState({titleForUseState});
  const [body, setBody] = useState({bodyForUseState});
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const canSave = [title, title, user].every(Boolean) && addRequestStatus === "idle";

  const onClickFunc = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        let userIdInSelector = users.find((el) => el.name == user).userId;
        let generatedId = userIdInSelector ? userIdInSelector : nanoid(); 
        dispatch(addNewPost({ title, body, userId: generatedId })).unwrap(); 
        setTitle("");
        setBody("");
        console.log(userIdInSelector, generatedId);
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        //always sets status back to idle
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <>
      <h2>Form</h2>
      <form>
        {/*action="" method="POST"*/}
        <div className="formParts">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
        </div>
        <div className="formParts">
          <label htmlFor="user">Author</label>
          <select
            onChange={(e) => {
              setUser(e.target.value);
            }}
          >
            <option value=""></option>
            <PostUser />
          </select>
        </div>
        <div className="formParts">
          <label htmlFor="body">Body</label>
          <textarea
            rows="4"
            type="text"
            name="body"
            onChange={(e) => {
              setBody(e.target.value);
            }}
            value={body}
          />
        </div>
        <button id="submit" type="button" disabled={!canSave} onClick={onClickFunc}>
          Update User
        </button>
      </form>
    </>
  );
};

export default EditPostForm;

  
  
