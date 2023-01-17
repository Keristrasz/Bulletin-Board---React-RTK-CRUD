import { newPostReaction } from "./postSlice";
import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMugHot,
  faHeart,
  faThumbsUp,
  faRocket,
  faGuitar,
} from "@fortawesome/free-solid-svg-icons";

const reactionFaEmojis = {
  like: faThumbsUp,
  heart: faHeart,
  rocket: faRocket,
  guitar: faGuitar,
  mug: faMugHot,
};

const PostReactionButtons = ({ post }) => {
  // We can change files from store, or directly when passing current post from mapping all posts from high order component

  const dispatch = useDispatch();

  //refactored to map (declerative way), probably worse for performance

  const renderAllButtons = Object.entries(reactionFaEmojis).map(
    ([reactionName, emojiIcon]) => {
      return (
        <button
          key={reactionName}
          type="button"
          className="reactionButton"
          onClick={() =>
            dispatch(newPostReaction({ postId: post.id, reaction: reactionName }))
          }
        >
          <FontAwesomeIcon icon={emojiIcon} /> {post.reaction[reactionName]}
        </button>
      );
    }
  );

  //render each button, and use different payload (emoji) for each icon - button

  return <div className="reactionDiv">{renderAllButtons}</div>;
};

export default PostReactionButtons;
