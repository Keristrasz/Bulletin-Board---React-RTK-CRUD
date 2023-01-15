import { useSelector, useDispatch } from "react-redux";

import { selectAllUsers, selectUsersError, selectUsersStatus } from "./userSlice";

const PostUser = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers); //state.user.users = state from slices name "user"

  const usersOptions = users.map((elem) => {
    return (
      <option key={elem.id} value={elem.name}>
        {elem.name}
      </option>
    );
  });

  return <>{usersOptions}</>;
};

export default PostUser;
