import { createSlice } from "@reduxjs/toolkit";

const recordsSlice = createSlice({
    name: "records",
    initialState: {
        btp: null,
        mtp: null,
        fdp: null,
        stc: null,
        phd: null,
        patents: null,
        projectgrands: null,
        consultancy: null,
        talks: null,
        society: null,
        duty: null,
        material:null
    },

    reducers: {
        removeAllRecord: (state) => {
            state.btp = null;
            state.mtp = null;
            state.fdp = null;
            state.stc = null;
            state.patents = null;
            state.projectgrands = null;
            state.consultancy = null;
            state.talks = null;
            state.society = null;
            state.error = false;
            state.duty = null
        },
        updateBtp: (state, action) => { state.btp = action.payload; },
        removeBtp: (state) => { state.btp = null; },

        updateMtp: (state, action) => { state.mtp = action.payload; },
        removeMtp: (state) => { state.mtp = null; },

        updateFdp: (state, action) => { state.fdp = action.payload; },
        removeFdp: (state) => { state.fdp = null; },

        updateStc: (state, action) => { state.stc = action.payload; },
        removeStc: (state) => { state.stc = null; },

        updatePatents: (state, action) => { state.patents = action.payload; },
        removePatents: (state) => { state.patents = null; },

        updateProjectgrands: (state, action) => { state.projectgrands = action.payload; },
        removeProjectgrands: (state) => { state.projectgrands = null; },

        updateConsultancy: (state, action) => { state.consultancy = action.payload; },
        removeConsultancy: (state) => { state.consultancy = null; },

        updateTalks: (state, action) => { state.talks = action.payload; },
        removeTalks: (state) => { state.talks = null; },

        updateSociety: (state, action) => { state.society = action.payload; },
        removeSociety: (state) => { state.society = null; },

        updatePhd: (state, action) => { state.phd = action.payload; },
        removePhd: (state) => { state.phd = null; },

        updateDuty: (state, action) => { state.duty = action.payload; },
        removeDuty: (state) => { state.duty = null; },

        updateMaterial: (state, action) => { state.material = action.payload; },
        removeMaterial: (state) => { state.material = null; },
    }//just in redux toolkit 

});

export const { removeAllRecord, updateBtp, removeBtp, updateMtp, removeMtp, updateFdp, removeFdp, updateStc, removeStc, updatePatents,
     removePatents, updateConsultancy, removeConsultancy, updateProjectgrands, removeProjectgrands, updateSociety, removeSociety,
      updateTalks, removeTalks, updatePhd, removePhd, removeDuty, updateDuty, updateMaterial, removeMaterial } = recordsSlice.actions;
export default recordsSlice.reducer;
//reducer is combination of actions(functions)

