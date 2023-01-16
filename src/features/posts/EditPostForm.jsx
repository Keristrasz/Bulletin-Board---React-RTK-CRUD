import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost, selectPostById } from "./postSlice";
import { selectAllUsers } from "../users/userSlice";
import PostUser from "../users/PostUser";
import { useParams, useNavigate } from "react-router-dom";

const EditPostForm = () => {
  const { postId } = useParams(); //pulls postId from url params
  const navigate = useNavigate();

  const users = useSelector(selectAllUsers);
  const currentPost = useSelector((state) => selectPostById(state, Number(postId))); // have to have callback to post both state, and postId
  const currentUser = users.find((el) => el.id === currentPost.userId);
  const userId = currentUser.id;

  const dispatch = useDispatch();

  const [user, setUser] = useState(currentUser?.name);
  const [title, setTitle] = useState(currentPost?.title); //?. chaining operator returns always undefined if something goes wrong
  const [body, setBody] = useState(currentPost?.body);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  if (!currentPost) {
    return (
      <section>
        <h2>Post was not found!</h2>
      </section>
    );
  }

  const canSave = [title, title, user].every(Boolean) && addRequestStatus === "idle";

  const onClickFunc = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(
          updatePost({
            id: postId,
            title,
            body,
            userId,
            reaction: currentPost.reaction,
          })
        ).unwrap(); //unwrap to allow try & catch block

        setUser("");
        setTitle("");
        setBody("");

        navigate(`/post/${postId}`);
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
        <div className="divForm">
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
        <div className="divForm">
          <label htmlFor="user">Author</label>
          <select
            onChange={(e) => {
              setUser(e.target.value);
            }}
            defaultValue={user} //last author
          >
            <option value=""></option>
            <PostUser />
          </select>
        </div>
        <div className="divForm">
          <label htmlFor="body">Body</label>
          <textarea
            rows="8"
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
