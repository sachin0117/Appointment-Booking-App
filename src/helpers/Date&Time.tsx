import { format, parseISO } from "date-fns";

    const formatDate = (dateString: string) => {
        try {
            const date = parseISO(dateString);
            return format(date, "MM dd, yyyy");
        } catch (error) {
            return "Invalid date";
        }
    };

    const formatTime = (timeString: string) => {
        try {
            const [hours, minutes] = timeString.split(":");
            const hourNum = parseInt(hours, 10);
            const period = hourNum >= 12 ? "PM" : "AM";
            const hour12 = hourNum % 12 || 12;
            return `${hour12}:${minutes} ${period}`;
        } catch (error) {
            return timeString;
        }
    };


    export {formatDate, formatTime}