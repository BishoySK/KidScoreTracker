import { configAxios } from "../utilities/_interceptor/interceptor"




export const login = async (data)=>{
    try{
        const check = await configAxios.post("Login",data);
        if(check?.data) return check.data
    }catch(error){
        return Promise.reject(error);
    }
}