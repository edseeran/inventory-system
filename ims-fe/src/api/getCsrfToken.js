import api from "./api";

const getCsrfToken = async () => {
    try {
        await api.get("/sanctum/csrf-cookie"); // Adjust the endpoint if needed
    } catch (error) {
        console.error("Error fetching CSRF token", error);
    }
};

export default getCsrfToken;
