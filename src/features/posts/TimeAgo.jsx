import { parseISO, formatDistanceToNow } from "date-fns";

const TimeAgo = ({ timestamp }) => {
  let stringAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    let timePeriod = formatDistanceToNow(date);
    stringAgo = `${timePeriod} ago`;
  }
  return <>{stringAgo}</>;
};

export default TimeAgo;
