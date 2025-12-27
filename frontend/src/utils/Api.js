import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export const fetchdatafromapi = async (url) => {
    try {
        const { data } = await axios.get(`${API_BASE_URL}${url}`)
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}             

export const fetchProductbyId = async (url) => {
    try {
        const { data } = await axios.get(`${API_BASE_URL}${url}`)
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const postdata = async (url, formdata) => {
    const res = await axios.post(`${API_BASE_URL}${url}`, formdata)
    return res;
}

export const editdata = async (url, updatedata) => {
    const res = await axios.put(`${API_BASE_URL}${url}`, updatedata)
    return res;
}

export const deletedata = async (url) => {
    const res = await axios.delete(`${API_BASE_URL}${url}`)
    return res;
}