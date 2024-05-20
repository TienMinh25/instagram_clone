export default function formatTimeAgo(timestamp) {
  const currentTime = new Date();
  const postTime = new Date(timestamp);
  const elapsedTime = currentTime - postTime;
  const seconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 365) {
    const years = Math.floor(days / 365);
    return years === 1 ? '1 year ago' : `${years} years ago`;
  } else if (days > 30) {
    const months = Math.floor(days / 30);
    return months === 1 ? '1 month ago' : `${months} months ago`;
  } else if (days > 7) {
    const weeks = Math.floor(days / 7);
    return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
  } else if (days > 0) {
    return days === 1 ? '1 day ago' : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  } else {
    return 'Just now';
  }
}