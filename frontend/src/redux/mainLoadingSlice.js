import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isMainLoading: true
}


const mainLoadingSlice = createSlice({

    name: 'mainLoading',
    initialState,

    reducers: {
        setMainLoading: (state, action) => {
            state.isMainLoading = action.payload
        },


    }

});


export const { setMainLoading } = mainLoadingSlice.actions;

export default mainLoadingSlice;