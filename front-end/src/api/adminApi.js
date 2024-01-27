import { configAxios } from "../utilities/_interceptor/interceptor";


export const addUser= async (data)=>{
    try{
        const result = await configAxios.post('users',data);
        if(result?.data) return result.data;
    }catch(error){
        return Promise.reject(error);
    }
}


export const editUser= async (obj)=>{
    try{
        const result = await configAxios.patch("users",obj);
        if(result?.data) return result.data;
    }catch(error){
        return Promise.reject(error);
    }
}

export const deleteUser= async (id)=>{
    try{
        const result = await configAxios.delete(`users?_id=${id}`);
        if(result?.data) return result.data;
    }catch(error){
        return Promise.reject(error);
    }
}

export const getAllUsers= async (obj)=>{
    try{
        const{page=1,isAdmin=false,searchParams=""}=obj;
        const result = await configAxios.get(`users?page=${page}&isModerator=${isAdmin}&searchParams=${searchParams}`);
        if(result?.data) return result.data;
    }catch(error){
        return Promise.reject(error);
    }
}



export const getUserData = async ()=>{
    try{
        const result = await configAxios.get("user");
        if(result?.data) return result.data;
    }catch(error){
        return Promise.reject(error);
    }
}



export const getUserById = async (id)=>{
    try{
        const result = await configAxios.get(`users/${id}`);
        if(result?.data) return result.data;
    }catch(error){
        return Promise.reject(error);
    }
}