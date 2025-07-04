const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const fetchBooking = async (data) => {
    try {
      const response = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error("Booking failed");
      }
  
      const result = await response.json();  
      return result;  
    } catch (error) {
      throw new Error(error.message || "Booking failed: An error occurred");
    }
  };
  