import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost, selectPostById, deletePost } from "./postSlice";
import { selectAllUsers } from "../users/userSlice";
import PostUser from "../users/PostUser";
import { useParams, useNavigate } from "react-router-dom";

const EditPostForm = () => {
  const { postId } = useParams(); //pulls postId from url params
  const navigate = useNavigate(); //to navigate to url

  const users = useSelector(selectAllUsers);
  const currentPost = useSelector((state) => selectPostById(state, postId)); // have to have callback to post both state, and postId

  const currentUser = users.find((el) => el.id === currentPost?.userId);

  if (!currentPost || !currentUser) {
    return (
      <section>
        <h2>Post was not found!</h2>
      </section>
    );
  }

  const dispatch = useDispatch();

  const [newUserId, setNewUserId] = useState(currentUser?.id);
  const [title, setTitle] = useState(currentPost?.title); //?. chaining operator returns always undefined if something goes wrong
  const [body, setBody] = useState(currentPost?.body);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");


  const canSave = [title, body, newUserId].every(Boolean) && addRequestStatus === "idle";

  const onClickUpdate = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(
          updatePost({
            id: postId,
            title,
            body,
            userId: newUserId,
            reaction: currentPost.reaction,
          })
        ).unwrap(); //unwrap to allow try & catch block
        setTitle("");
        setBody("");
        setNewUserId("");
        navigate(`/post/${postId}`);
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        //always sets status back to idle
        setAddRequestStatus("idle");
      }
    }
  };

  const onClickDelete = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(
          deletePost({
            id: postId,
          })
        ).unwrap(); //unwrap to allow try & catch block
        navigate(`/`);
      } catch (err) {
        console.error("Failed to delete the post", err);
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
              setNewUserId(users.find((el) => el.name === e.target.value).id)
            }}
            defaultValue={currentUser?.name} //last author
          >
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
        <button id="submit" type="button" disabled={!canSave} onClick={onClickUpdate}>
          Update Post
        </button>
        <button id="deletePost" type="button" onClick={onClickDelete}>
          Delete Post!
        </button>
      </form>
    </>
  );
};

export default EditPostForm;
