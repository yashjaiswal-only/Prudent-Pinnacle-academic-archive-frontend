import axios from "axios";

const BASE_URL=import.meta.env.VITE_BASE_URL;
console.log(BASE_URL)
const publicRequest = axios.create({
    baseURL:BASE_URL,
});

export const getAllRecord= async (uid,type,token)=>{
    const config={
        headers:{
            'token': `Bearer ${token}`
        }
    }
    try{
        const res=await publicRequest.post('/record/getall/'+`${type}`,{_id:uid},config)
        return res;
    }
    catch(err){
        console.log(err)
        return err;
    }
}

export const addRecord= async (record,type,token)=>{
    const config={
        headers:{
            'token': `Bearer ${token}`
        }
    }
    try{
        const res=await publicRequest.post('/record/create/'+`${type}`,record,config)
        return res;
    }
    catch(err){
        console.log(err)
        return err;
    }
}

export const editRecord= async (paper,type,token)=>{
    const config={
        headers:{
            'token': `Bearer ${token}`
        }
    }
    try{
        const res=await publicRequest.post('/record/update/'+`${type}`,paper,config)
        return res;
    }
    catch(err){
        console.log(err)
        return err;
    }
}