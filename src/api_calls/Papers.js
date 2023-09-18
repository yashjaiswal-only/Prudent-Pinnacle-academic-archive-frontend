import axios from "axios";

const BASE_URL=import.meta.env.VITE_BASE_URL;
console.log(BASE_URL)
const publicRequest = axios.create({
    baseURL:BASE_URL,
});

export const getAllPaper= async (uid,type,token)=>{
    const config={
        headers:{
            'token': `Bearer ${token}`
        }
    }
    try{
        const res=await publicRequest.post('/papers/getall/'+`${type}`,{_id:uid},config)
        return res;
    }
    catch(err){
        console.log(err)
        return err;
    }
}

export const addPaper= async (paper,type,token)=>{
    const config={
        headers:{
            'token': `Bearer ${token}`
        }
    }
    try{
        const res=await publicRequest.post('/papers/create/'+`${type}`,paper,config)
        return res;
    }
    catch(err){
        console.log(err)
        return err;
    }
}

export const editPaper= async (paper,type,token)=>{
    const config={
        headers:{
            'token': `Bearer ${token}`
        }
    }
    try{
        const res=await publicRequest.post('/papers/update/'+`${type}`,paper,config)
        return res;
    }
    catch(err){
        console.log(err)
        return err;
    }
}