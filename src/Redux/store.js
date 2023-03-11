import { configureStore  } from '@reduxjs/toolkit'
import  DaynightReducer from '../setting/ActionSlice'
import { ApiSlice } from "../api/ApiSlice";

export const store = configureStore({
    reducer:{
        [ApiSlice.reducerPath]: ApiSlice.reducer,
        daynight:DaynightReducer,        
    },   
    middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat(ApiSlice.middleware ),   
    
   
    devTools: true
})