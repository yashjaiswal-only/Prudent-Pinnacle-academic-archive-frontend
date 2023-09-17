import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser:null,
        token:null,
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
            state.currentUser=action.payload.userDetails
            state.token=action.payload.accessToken 
        },
        loginFailure:(state)=>{
            state.isFetching=false; 
            state.error=true;
        },
        logoutSuccess:(state)=>{
            state.currentUser=null;
            state.token=null;
            state.isFetching=false;
            state.error=false; 
        },
        updateCurrentUser:(state,action)=>{
            state.currentUser=action.payload;
        }
       
    }//just in redux toolkit 
    
});

export const {loginFailure,loginStart,loginSuccess,logoutSuccess,updateCurrentUser,authStarts}=userSlice.actions;
export default userSlice.reducer;
//reducer is combination of actions(functions)

