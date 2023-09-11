import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser:null,
        isFetching:false,
        error:false ,
        registered:false
    },

    reducers:{
        authStarts:(state)=>{
            state.isFetching=false; 
            state.error=false;
        },
        loginStart:(state)=>{
            state.isFetching=true;
        },
        loginSuccess:(state,action)=>{
            state.isFetching=false;
            state.currentUser=action.payload //store the response
            
        },
        loginFailure:(state)=>{
            state.isFetching=false; 
            state.error=true;
        },
        logoutSuccess:(state)=>{
            state.currentUser=null;
            state.isFetching=false;
            state.error=false; 
        },
        updateUser:(state,action)=>{
            state.currentUser=action.payload;
        }
       
    }//just in redux toolkit 
    
});

export const {loginFailure,loginStart,loginSuccess,logoutSuccess,updateUser,authStarts}=userSlice.actions;
export default userSlice.reducer;
//reducer is combination of actions(functions)

