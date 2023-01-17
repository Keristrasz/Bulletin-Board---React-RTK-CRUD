import { parseISO, formatDistanceToNow } from "date-fns";

//passed timestamp as propand then converted to something like 5 mins ago

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
