export const validateDates = (value, watch) => {
    const checkInDate = watch("checkInDate");

    if (!checkInDate) return true;

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(value);

    return checkOut > checkIn ? true : "* Check-out date must be after check-in date.";
};


export const validateEmail = (value) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(value) ? true : "*Invalid email address";
};

export const validateContactNumber = (value) => {
    const numberPattern = /^[0-9]{10}$/;
    return numberPattern.test(value.trim()) ? true  : "*Must be a 10-digit number";
};