export const fnDateToAgo = (date: Date) => {
  const now = new Date(); // Current date
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // Difference in seconds

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    const count = Math.floor(diff / interval.seconds);

    if (count >= 1) {
      return `${count} ${count > 1 ? interval.label + 's' : interval.label} ago`;
    }
  }

  return `just now`;
};


export const fnDateToMinutes = (date: Date) => {
  const seconds = Math.floor((+new Date() - +date) / 1000);
  const interval = Math.floor(seconds / 60);
  return interval;
}