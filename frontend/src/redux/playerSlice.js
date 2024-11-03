import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isPlayer: false,
    songPath: '',
    imgOfSong: ''
}


const playerSlice = createSlice({

    name: 'player',
    initialState,

    reducers: {
        setPlayer: (state) => {
            state.isPlayer = true
        },
        closePlayer: (state) => {
            state.isPlayer = false
        },

        changeSong: (state, action) => {
            // const songPathWithSpace = 
            state.songPath = action.payload.songPath;
            state.imgOfSong = action.payload.imgOfSong;
        }

    }

});


export const { setPlayer, closePlayer, changeSong } = playerSlice.actions;

export default playerSlice;