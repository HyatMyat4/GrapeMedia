import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const token = localStorage.getItem("Token")

export const ApiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: `https://grapesocialmedia.onrender.com/posts`,
    prepareHeaders: (headers) => {
        headers.set( 'Authorization' , `Bearer ${token}`  )       
        headers.set(  "Content-Type" , "application/json"   )       
        return headers;
    }, }),
    tagTypes: ['POST' , 'USER' , 'MESSAGE'  ],
    endpoints: builder => ({})
});