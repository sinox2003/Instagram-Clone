export const messagesTime = (timestamp) => {
    const now = Date.now();
    const secondsAgo = Math.floor((now - timestamp) / 1000);

    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const formattedTime = `${hours}:${minutes}`;

    if (secondsAgo < 60) {
        return `${secondsAgo}s`;
    } else if (secondsAgo < 3600) {
        const minutesAgo = Math.floor(secondsAgo / 60);
        return `${minutesAgo}m`;
    } else if (secondsAgo < 86400) {
        const hoursAgo = Math.floor(secondsAgo / 3600);
        return `${hoursAgo}h`;
    } else if (secondsAgo < 604800) {
        return `${dayOfWeek} ${formattedTime}`;
    } else {
        return `${day} ${month} ${year}, ${formattedTime}`;
    }
};
