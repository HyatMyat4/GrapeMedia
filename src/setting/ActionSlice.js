import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    daynightMode:true,
    getToken: false,
    input:false,
    cropProfileopenclose:false,
    profileimgname:'',
    PostCreate:false,
    onUpdate:false,
    loding:false,
    handleOpen:false,
    userdata:{},
    Post: [],
    userPost: [],
    Friends:[],
    MessageGroupOC:false,
    MessageGroup:[],
    MessagePage:false,
    singleGroupdata:[],
    msgloding:false,
   
    
}


export const Daynight = createSlice({
    name: 'daynight',
    initialState,
    reducers:{
        daynightEngine:(state, action ) => {
            state.daynightMode = action.payload
        },
        lodingEngine:(state, action ) => {
            state.loding = action.payload
        },
        getTokenEngine: (state , action) => {
            state.getToken = action.payload
        },
        inputEngine: (state , action) => {
            state.input = action.payload
        },
        cropProfileopencloseEngine: (state , action) => {
            state.cropProfileopenclose = action.payload
        },
        profileimgnameEngine: (state , action) => {
            state.profileimgname = action.payload
        },
        PostCreateEngine: (state , action) => {
            state.PostCreate = action.payload
        },
        userdataEngine: (state , action) => {
            state.userdata = action.payload
        },
        PostEngine: (state , action) => {
            state.Post = action.payload
        },
        FriendsEngine: (state , action) => {
            state.Friends = action.payload
        },
        onUpdateEngine: (state , action) => {
            state.onUpdate = action.payload
        },
        updatePost: (state , action) => {
            const updatepost = state.Post.map((post) => {
                if (post._id === action.payload._id) return action.payload
                return post;
                
            })
            state.Post = updatepost;
        },
        deletePostEngin: (state , action) => {
            const updatepost =  state.Post.filter( id => id._id !== action.payload );
            state.Post = updatepost;
        },
         setFirendsEngin: (state, action) => {
            state.userdata.friends = action.payload
         },
        setFriends: (state , action) => {             
                state.Friends = action.payload  
                      
        },
        RemoveFriends: (state , action) => {             
            const updateFriends =  state.Friends.filter( id => id._id !== action.payload );
            state.Friends = updateFriends; 
            state.userdata.friends = updateFriends     
        },
        handleOpenEngin: (state , action) => {             
                state.handleOpen = action.payload            
        },
        userPostEngin: (state , action) => {             
                state.userPost = action.payload            
        },
        MessageGroupOCEngin: (state , action) => {             
                state.MessageGroupOC = action.payload            
        },
        MessageGroupEngin: (state , action) => {             
                state.MessageGroup = action.payload            
        },
        MessagePageEngin: (state , action) => {             
                state.MessagePage = action.payload            
        },
        singleGroupdataEngin: (state , action) => {             
                state.singleGroupdata = action.payload            
        },
        setmessageEngin: (state , action ) => {
            state.singleGroupdata.Message = action.payload
        },
        msglodingEngin: (state , action ) => {
            state.msgloding = action.payload
        }
    }
})
//Message

export const  { 
    daynightEngine ,
    getTokenEngine ,
    inputEngine ,
    cropProfileopencloseEngine ,
    profileimgnameEngine,
    PostCreateEngine,
    userdataEngine,
    PostEngine,
    updatePost,
    setFriends,
    FriendsEngine,
    lodingEngine,
    handleOpenEngin,
    deletePostEngin,
    setFirendsEngin,
    onUpdateEngine,
    RemoveFriends,
    userPostEngin,
    MessageGroupOCEngin,
    MessageGroupEngin,
    MessagePageEngin,
    singleGroupdataEngin,
    setmessageEngin,
    msglodingEngin
   } = Daynight.actions

export const  daynightModeC = (state) => state.daynight.daynightMode;
export const  getTokenC = (state) => state.daynight.getToken;
export const  inputC = (state) => state.daynight.input;
export const  cropProfileopencloseC = (state) => state.daynight.cropProfileopenclose;
export const  profileimgnameC = (state) => state.daynight.profileimgname;
export const  PostCreateC = (state) => state.daynight.PostCreate;
export const  userdataC = (state) => state.daynight.userdata;
export const  PostC = (state) => state.daynight.Post;
export const  FriendsC = (state) => state.daynight.Friends;
export const  lodingC = (state) => state.daynight.loding;
export const  handleOpenC = (state) => state.daynight.handleOpen;
export const  onUpdateC = (state) => state.daynight.onUpdate;
export const  userPostC = (state) => state.daynight.userPost;
export const  MessageGroupOCC = (state) => state.daynight.MessageGroupOC
export const  MessageGroupC = (state) => state.daynight.MessageGroup
export const  MessagePageC = (state) => state.daynight.MessagePage
export const  singleGroupdataC = (state) => state.daynight.singleGroupdata
export const  msglodingC = (state) => state.daynight.msgloding


export default Daynight.reducer;