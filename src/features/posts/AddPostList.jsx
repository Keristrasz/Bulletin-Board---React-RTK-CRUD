import { useSelector } from "react-redux";
import { selectAllPosts, selectPostsError, selectPostsStatus } from "./postSlice";
import TimeAgo from "./TimeAgo";
import PostReactionButtons from "./PostReactionButtons";
import { selectAllUsers } from "../users/userSlice";
import { Link } from "react-router-dom";

const PostList = () => {
  const users = useSelector(selectAllUsers);
  const posts = useSelector(selectAllPosts); //state.post.posts = state from slices name "post"
  const postsStatus = useSelector(selectPostsStatus);
  const postsError = useSelector(selectPostsError);

  // useeffect to trigger fetching data and dispatching it to store (after component mounted), but we fetch it in base component

  // useEffect(() => {
  //   if (postsStatus === "idle" && statuss) {
  //     //initialState is defaultly set to idle
  //     dispatch(fetchPosts()); //this activates function fetchPosts in slice, and activates builder for different actions
  //   }
  // }, [postsStatus, dispatch]);

  // if we want to order posts (we use unshift instead of push)
  // const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const renderAllPosts = posts.map((post) => {
    let currentUser = users.find((user) => user.id === post.userId); //to match id and userid with users x posts
    return (
      //make article for each post saved in store
      <article key={post.id}>
        <p className="parInPost">
          By: <i>{currentUser?.name}</i>
        </p>
        <h3>{post.title}</h3>
        <h4>
          {post.body.length > 100 ? post.body.substring(0, 100) + "..." : post.body}
        </h4>{" "}
        {/*to see preview of 100 max char */}
        <p className="parInPost">
          <Link to={`post/${post.id}`}> View Post </Link>{" "}
          {/*Link to post.id to single page app*/}
          <i>
            <TimeAgo timestamp={post.date} />
          </i>
        </p>
        <PostReactionButtons post={post} />
      </article>
    );
  });

  let postsContent;
  if (postsStatus === "loading") {
    postsContent = <p>Loading...</p>;
  } else if (postsStatus === "succeeded") {
    postsContent = renderAllPosts;
  } else if (postsStatus === "failed") {
    postsContent = <p>Error {postsError}</p>; //if postsStatus is failed show the postsError
  } else if (postsStatus === "idle") {
  } else {
    console.trace("Posts content error");
  }

  return (
    <section>
      <h2>Posts</h2>
      {postsContent}
    </section>
  );
};

export default PostList;
