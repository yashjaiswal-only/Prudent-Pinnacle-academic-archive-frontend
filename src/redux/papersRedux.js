import { createSlice } from "@reduxjs/toolkit";

const papersSlice = createSlice({
    name:"papers",
    initialState:{
        chapters:null,
        books:null,
        journals:null,
        conferences:null
    },

    reducers:{
        removeAll:(state)=>{
            state.chapters=null;
            state.books=null;
            state.journals=null;
            state.conferences=null;
        },
        updateChapters:(state,action)=>{
            state.chapters=action.payload;
        },
        updateBooks:(state,action)=>{
            state.books=action.payload;
        },
        updateJournals:(state,action)=>{
            state.journals=action.payload;
        },
        updateConferences:(state,action)=>{
            state.conferences=action.payload;
        },
        removeChapters:(state)=>{state.chapters=null;},
        removeBooks:(state)=>{state.books=null;},
        removeJournals:(state)=>{state.journals=null;},
        removeConferences:(state)=>{state.conferences=null;},
    }//just in redux toolkit 
    
});

export const {removeAll,updateBooks,updateChapters,updateConferences,updateJournals,removeBooks,removeChapters,removeConferences,removeJournals}=papersSlice.actions;
export default papersSlice.reducer;
//reducer is combination of actions(functions)

