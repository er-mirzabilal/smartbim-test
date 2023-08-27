// productApi.js
import axios from 'axios';

const baseURL = `${process.env.REACT_APP_BACKEND_URL}`; // Replace with your API URL

const axiosInstance = axios.create({
    baseURL,
});


export const getConfig = async (id) => {
    try {
        const response = await axiosInstance.get(`configs/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};