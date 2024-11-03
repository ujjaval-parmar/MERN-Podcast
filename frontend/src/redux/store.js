import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import userSlice from './userSlice';
import mainLoadingSlice from './mainLoadingSlice';
import playerSlice from './playerSlice';


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        user: userSlice.reducer,
        mainLoading: mainLoadingSlice.reducer,
        player: playerSlice.reducer
    }
})