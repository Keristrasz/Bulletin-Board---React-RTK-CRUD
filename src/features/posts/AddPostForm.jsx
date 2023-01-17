import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./postSlice";
import { selectAllUsers } from "../users/userSlice";
import { nanoid } from "@reduxjs/toolkit";
import PostUser from "../users/PostUser";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const navigate = useNavigate();

  const canSave = [title, title, user].every(Boolean) && addRequestStatus === "idle";

  const onClickFunc = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        let userIdInSelector = users.find((el) => el.name == user).userId;
        let generatedId = userIdInSelector ? userIdInSelector : nanoid(); //to generate new ID only if user doesnt exist, otherwise use IDInSelector
        dispatch(addNewPost({ title, body, userId: generatedId })).unwrap(); //unwrap allows us to use try, catch block (it returns error if something goes wrong)
        setTitle("");
        setBody("");
        navigate(`/`);
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
          Submit
        </button>
      </form>
    </>
  );
};

export default AddPostForm;
