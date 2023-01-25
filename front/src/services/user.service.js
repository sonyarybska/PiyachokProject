
import {getUsers} from "../redux/actions/actions";
import {axiosInstance} from "./axios.service";


const fetchUsers = () => {
    return async (dispatch) => {
        const response = await axiosInstance.get('/users');
        dispatch(getUsers([...response.data]));
        return response.data
    }
};

const fetchOneUser=async (id)=>{
    const response=await axiosInstance.get(`/users/${id}`);

    return response;
}

const deleteUser=async (id)=>{
    const response=await axiosInstance.delete(`/users/${id}`);

    return response;
}

const updateUser=async (id,data)=>{
    const response=await axiosInstance.put(`/users/${id}`,data);

    return response;
}

export {
    fetchUsers,
    fetchOneUser,
    deleteUser,
    updateUser
};