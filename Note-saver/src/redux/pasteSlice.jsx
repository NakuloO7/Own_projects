import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const initialState = {
    //JSON.pares converts json stiring into an  javascript object
  pastes : localStorage.getItem('pastes')
  ? JSON.parse(localStorage.getItem('pastes')) : []
}

export const pasteSlice = createSlice({
  name: 'pastes',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
        const paste = action.payload;
        state.pastes.push(paste);

        //add a check here to check if paste already exists or not

        //JSON.stringify will convert the javascript object into the json string
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Paste added");
    },
    updateToPastes: (state, action) => {

        const paste = action.payload;
        const index = state.pastes.findIndex((i) => i._id === paste._id)
        if(index >= 0){
            state.pastes[index] = paste;  //update the paste 
            //update in local storage
            localStorage.setItem("pastes", JSON.stringify(state.pastes));
        }
        toast.success("Updated Sucesfully");
    },
    resetAllPastes: (state, action) => {
        state.pastes = [];
        localStorage.removeItem("pastes");
     
    },
    removeFromPastes : (state, action) =>{

        const pasteId = action.payload;
        const index = state.pastes.findIndex(i => i._id === pasteId);

        if(index >= 0){
            state.pastes.splice(index, 1);
            localStorage.setItem("pastes", JSON.stringify(state.pastes));
        }

        toast.success("Deleted Sucessfully")

    }
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer