// productApi.js
import axios from 'axios';

const baseURL = `${process.env.REACT_APP_BACKEND_URL}`; // Replace with your API URL

const axiosInstance = axios.create({
    baseURL,
});

export const getProducts = async () => {
    try {
        const response = await axiosInstance.get('/products');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getProduct = async (productId) => {
    try {
        const response = await axiosInstance.get(`products/${productId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createProduct = async (productData) => {
    try {
        const response = await axiosInstance.post('products/save', productData);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const deleteProduct = async (productId) => {
    try {
        const response = await axiosInstance.delete(`products/${productId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
