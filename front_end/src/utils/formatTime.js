export default function formatTime(timestamp) {
    const currentTime = new Date();
    const postTime = new Date(timestamp);
    const elapsedTime = currentTime - postTime;
    const seconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 365) {
      const years = Math.floor(days / 365);
      return years === 1 ? '1y' : `${years} years`;
    } else if (days > 7) {
      const weeks = Math.floor(days / 7);
      return weeks === 1 ? '1w' : `${weeks} weeks`;
    } else if (days > 0) {
      return days === 1 ? '1d' : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? '1h' : `${hours}h`;
    } else if (minutes > 0) {
      return minutes === 1 ? '1m' : `${minutes}m`;
    } else {
      return 'Now';
    }
  }