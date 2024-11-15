// Function to check if a given date is today
export const isToday = (dateString:string) => {
    const date = new Date(dateString);
    const today = new Date();

    // Compare year, month, and date only (ignore the time)
    return date.getFullYear() === today.getFullYear() &&
           date.getMonth() === today.getMonth() &&
           date.getDate() === today.getDate();
};
export const toDateString = (dateString:string) => {
    const date = new Date(dateString);
    return date.toDateString()
};
