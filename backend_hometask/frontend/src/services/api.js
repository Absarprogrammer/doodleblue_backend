
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api/user/',
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const getAllUsers = () => {
    return API.get('/get');
};

export const updateUser = (id, data) => {
    return API.patch(`/updateDetails/${id}`, data);
};

// Soft delete user
export const deleteUser = (id) => {
    return API.delete(`/delete/${id}`);
};

export default API;
