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
  const post = useSelector(state => selectPostById(state, postId)) // have to have callback to post both state, and postId

  
  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
        <p>State refreshes to default fake API values, no new posts can be showed after browser refresh </p>
      </section>
    )
  }

  const user = users.find((user) => user.id == post?.userId);  //post is too slow, post.userId throws undefined sometimes

  return (<section>
    <article>
      <p className="parInPost">
        By: <i>{user.name}</i>
      </p>
      <h3>{post.title}</h3>
      <h4>{post.body}</h4>
      <p className="parInPost">
        <Link to={`/post/edit/${post.id}`}> Edit Post </Link>
        <i>
          <TimeAgo timestamp={post.date} />
        </i>
      </p>
      <PostReactionButtons post={post} />
    </article></section>
  )
};

export default SinglePostPage;
