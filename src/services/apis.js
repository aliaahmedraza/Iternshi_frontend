import axios from "axios";

const API_URL = "http://localhost:3004/api/posts";

export const getPosts = async () => {
    try {
        const response = await axios.get(`${API_URL}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
};

export const likePost = async (postId, userId) => {
    try {
        const response = await axios.post(`${API_URL}/${postId}/like`, { userId });
        return response.data;
    } catch (error) {
        console.error("Error liking post:", error);
        return null;
    }
};

export const commentOnPost = async (postId, userId, text) => {
    try {
        const response = await axios.post(`${API_URL}/${postId}/comment`, { userId, text });
        return response.data;
    } catch (error) {
        console.error("Error commenting on post:", error);
        return null;
    }
};