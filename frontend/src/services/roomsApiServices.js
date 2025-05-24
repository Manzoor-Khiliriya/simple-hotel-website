export const fetchRooms = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/rooms');
        if (!response.ok) {
            throw new Error(`Failed to fetch rooms. Status: ${response.status}`);
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        throw new Error(error.message || 'An error occurred while fetching rooms');
    }
};

export const fetchRoomById = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/api/rooms/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch room');
        }
        const result = await response.json();
        return result.data;
    } catch (error) {
        throw new Error(error.message || 'An error occurred while fetching the room.');
    }
};


export async function fetchRoomsByType(roomType) {
    try {
        const response = await fetch(`http://localhost:5000/api/rooms/type?roomType=${roomType}`);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to fetch rooms.");
        }

        return result.data;
    } catch (error) {
        throw new Error(error.message || "Error fetching room data");
    }
}


export const fetchRoomByQuery = async (formData) => {
    try {
        const response = await fetch(`http://localhost:5000/api/rooms/available-rooms`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || "Failed to fetch rooms.");
        }

        return result.data || [];
    } catch (error) {
        throw new Error(error.message || "An error occurred while fetching rooms.");
    }
};




