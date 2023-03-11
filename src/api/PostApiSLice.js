import { ApiSlice } from "./ApiSlice";



export const extendedApiSlice = ApiSlice.injectEndpoints({
    endpoints: builder => ({
        getPost: builder.query({
            query: () => `/`,            
            providesTags: ["POST"]
        }),
        getUserPost: builder.query({
            query: id => `/${id}/posts`,
            providesTags: ["POST"]  
        })    
    })
})



export const { 
     useGetPostQuery,
     useGetUserPostQuery,
    
   
  } = extendedApiSlice