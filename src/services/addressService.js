import axios from 'axios';

const API_URL = 'http://localhost:8080/address';

const getMyAddresses = async () => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

const addAddress = async (addressData) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.post(API_URL, addressData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

const deleteAddress = async (id) => {
    const token = localStorage.getItem('accessToken');
    await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const addressService = {
    getMyAddresses,
    addAddress,
    deleteAddress
};
