const getTimeAgo = (time: string) => {
  const currentTime = new Date();
  const postTime = new Date(time);
  const timeDiff = currentTime.getTime() - postTime.getTime();
  const diffInMin = Math.round(timeDiff / 60000);
  const diffInHrs = Math.round(timeDiff / 3600000);
  const diffInDays = Math.round(timeDiff / 86400000);
  let timeAgo = '';
  if (diffInDays > 1) {
    timeAgo = `opened ${diffInDays} days ago`;
  } else if (diffInDays === 1) {
    timeAgo = 'opened 1 day ago';
  } else if (diffInHrs > 0) {
    timeAgo = `opened ${diffInHrs} hours ago`;
  } else if (diffInMin > 0) {
    timeAgo = `opened ${diffInMin} minutes ago`;
  } else {
    timeAgo = 'just now';
  }
  return timeAgo;
};
export default getTimeAgo;
