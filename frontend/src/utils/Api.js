import axios from 'axios';


export const fetchdatafromapi = async (url) => {
    try {
        const { data } = await axios.get(url)
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}             

export const fetchProductbyId = async (url) => {
    try {
        const { data } = await axios.get(url)
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const postdata = async (url, formdata) => {
    const  res = await axios.post(url, formdata)
    return res;

}


export const editdata = async (url, updatedata) => {
    const { res } = await axios.put(`${url}`, updatedata)
    return res;
}


export const deletedata = async (url) => {
    const { res } = await axios.delete(`${url}`)
    return res;
}

