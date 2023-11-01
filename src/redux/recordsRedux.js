import { createSlice } from "@reduxjs/toolkit";

const recordsSlice = createSlice({
    name:"records",
    initialState:{
        btp:null,
        mtp:null,
        fdp:null,
        stc:null,
        patents:null,
        projectgrands:null,
        consultancy:null,
        talks:null,
        society:null,
        isFetching:false,
        error:false,
    },

    reducers:{
        removeAllRecord:(state)=>{
            state.btp=null;
            state.mtp=null;
            state.fdp=null;
            state.stc=null;
            state.patents=null;
            state.projectgrands=null;
            state.consultancy=null;
            state.talks=null;
            state.society=null;
            state.error=false;
        },
        updateBtp:(state,action)=>{
            state.btp=action.payload;
            state.isFetching=false;
            state.error=false;
        },
        removeBtp:(state)=>{state.btp=null;},
    }//just in redux toolkit 
    
});

export const {removeAllRecord,updateBtp,removeBtp}=recordsSlice.actions;
export default recordsSlice.reducer;
//reducer is combination of actions(functions)

