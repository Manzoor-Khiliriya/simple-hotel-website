const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const subscribeCustomer = async (customerEmail) => {
    try {
        const response = await fetch(`${API_URL}/api/customers`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ customerEmail }),
        });


        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || "Something went wrong. Please try again.");
        }

        return { success: true, message: result.message || "You are subscribed!" };
    } catch (error) {
        return { success: false, message: error.message };
    }
};
