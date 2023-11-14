import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser:null,
        token:null,
    },

    reducers:{
        
        loginSuccess:(state,action)=>{
            state.currentUser=action.payload.userDetails
            state.token=action.payload.accessToken 
        },
       
        logoutSuccess:(state)=>{
            state.currentUser=null;
            state.token=null;
        },
        updateCurrentUser:(state,action)=>{
            state.currentUser=action.payload;
        }
       
    }//just in redux toolkit 
    
});

export const {loginSuccess,logoutSuccess,updateCurrentUser}=userSlice.actions;
export default userSlice.reducer;
//reducer is combination of actions(functions)

