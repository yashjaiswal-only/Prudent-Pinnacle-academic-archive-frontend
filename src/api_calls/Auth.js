import axios from "axios";
import { loginSuccess } from "../redux/userRedux";

const BASE_URL=import.meta.env.VITE_BASE_URL;
console.log(BASE_URL)
const publicRequest = axios.create({
    baseURL:BASE_URL,
});

export const register= async (dispatch,user)=>{
    try{
        const res=await publicRequest.post('/auth/register',user)
        return res;
    }
    catch(err){
        return err;
    }
}

export const login= async (dispatch,user)=>{
    try{
        const res=await publicRequest.post('/auth/login',user)
        const {accessToken,...userDetails}=res.data;
        dispatch(loginSuccess({accessToken,userDetails}));
        return res;
    }
    catch(err){
        // console.log(err)
        return err;
    }
}

export const checkUser= async (username)=>{
    try{
        const res=await publicRequest.post('/auth/find',{username})
        // console.log(res)
        return res;
    }
    catch(err){
        console.log(err)
        return err;
    }
}

export const updateUser= async (user,token)=>{
    const config={
        headers:{
            'token': `Bearer ${token}`
        }
    }
    try{
        const res=await publicRequest.post('/auth/user/update',user,config);
        return res;
    }
    catch(err){
        console.log(err)
        return err;
    }
}

