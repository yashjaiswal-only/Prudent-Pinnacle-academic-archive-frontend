import axios from "axios";
import { authStarts, loginFailure, loginStart, loginSuccess } from "../redux/userRedux";


const BASE_URL=import.meta.env.VITE_BASE_URL;
console.log(BASE_URL)
const publicRequest = axios.create({
    baseURL:BASE_URL,
});

export const register= async (dispatch,user)=>{
    dispatch(authStarts());
    try{
        const res=await publicRequest.post('/auth/register',user)
        return res;
    }
    catch(err){
        console.log(err)
    }
}

export const login= async (dispatch,user)=>{
    dispatch(authStarts());
    dispatch(loginStart());
    try{
        const res=await publicRequest.post('/auth/login',user)
        console.log(res)
        dispatch(loginSuccess(res.data));
        return res;
    }
    catch(err){
        dispatch(loginFailure());
        console.log(err)
        return err;
    }
}

export const checkUser= async (user)=>{
    try{
        const res=await publicRequest.post('/auth/find',{username:user})
        console.log(res)
        return res;
    }
    catch(err){
        console.log(err)
        return err;
    }
}
