import { useSelector } from "react-redux";
import { selectPostById } from "./postSlice";
import TimeAgo from "./TimeAgo";
import PostReactionButtons from "./PostReactionButtons";
import { selectAllUsers } from "../users/userSlice";

import { useParams, Link } from "react-router-dom";


const SinglePostPage = () => {
  // retrieve postId - we are gonna get it from useParam - :postid url parameter

  const { postId } = useParams() // its gonna pull postId from URL parameter

  const users = useSelector(selectAllUsers);
  const post = useSelector(state => selectPostById(state, Number(postId))) // have to have callback to post both state, and postId
  const user = users.find((user) => user.id === post.userId).name;

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (<section>
    <article>
      <p className="parInPost">
        By: <i>{user}</i>
      </p>
      <h3>{post.title}</h3>
      <h4>{post.body}</h4>
      <p className="parInPost">
        <Link to={`post/edit/${post.id}`}> Edit Post </Link> 
        <i>
          <TimeAgo timestamp={post.date} />
        </i>
      </p>
      <PostReactionButtons post={post} />
    </article></section>
  )
};

export default SinglePostPage;
