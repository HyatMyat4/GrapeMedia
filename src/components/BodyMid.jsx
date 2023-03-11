import { Waveform } from '@uiball/loaders'
import React from 'react';
import { useEffect , useState , useRef } from "react";
import  Postcreate from './Postcreate'
import { PostCreateEngine } from '../setting/ActionSlice'
import { useDispatch , useSelector } from "react-redux";
import { userdataC } from "../setting/ActionSlice"
import { clientpusher } from "../utils/pusher"
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import Post from './Post';
import Createpostbutton from './Createpostbutton';
import  { 
  PostEngine ,
  updatePost ,
  PostC ,
  setFriends , 
  lodingEngine ,
  daynightModeC ,
  handleOpenEngin ,
  handleOpenC,
  deletePostEngin,      
  setFirendsEngin,    
  onUpdateEngine,

          
  }  from '../setting/ActionSlice';        

    const BodyMid = () => {

  const dispatch = useDispatch();  
  const userRef = useRef();
  const token = localStorage.getItem("Token")

  TimeAgo.setDefaultLocale(en.locale)
  TimeAgo.addLocale(en)

  const userdata =useSelector(userdataC) 
  const PostdataC =useSelector(PostC) 
  const daynight = useSelector(daynightModeC)
  const handleOpen = useSelector(handleOpenC)  
  const userId = userdata?._id
  const [Enter , setEnter] = useState(false)
  const [comment , setcomment] = useState('')
  const [loding , setloding] = useState(false)
  const [handleid , sethandleid] = useState('')
  const [complete , setcomplete] = useState('')
  const [updatedata , setupdatedata] = useState({})
  const [UpdateCommentobj , setUpdateCommentobj] = useState({})
  const [onupdate , setonupdate] = useState(false)

  const userimg = `https://grapesocialmedia.onrender.com/img/${userdata?.picturePath}`
  
  // For  Get All Post
  const getFeedPost  = async () => {
    const response = await fetch(`https://grapesocialmedia.onrender.com/posts`,{
     method: "GET",
     headers: { Authorization : `Bearer ${token}`}  
     });
    const data = await response.json();
    const realdata = data.sort((a,b) => b.createdAt.localeCompare(a.createdAt))
    dispatch(PostEngine(realdata))

  }





  useEffect(() => {
    getFeedPost()  
  }, [])

  // For Reactiona to work
  const handleMouseEnter = (e) => {  
   setEnter(true)  
  }

  // For Give || Remove Reactiona to work
  const handleReaction = async (e) => {     
    const id = e.target.id
    if(!id){
      return
    }
  try{
  const response1 = await fetch(`https://grapesocialmedia.onrender.com/posts/${id}/like` , {   
    method: "PATCH",    
    headers: { Authorization : `Bearer ${token}` , "Content-Type":"application/json" }, 
    body:JSON.stringify({ userId : userId  }),
       });
       const updatedPost = await response1.json();       
       dispatch(updatePost(updatedPost))
   } catch (err) {
    console.warn(err);
  }
  }

 // To Add Friends 

  const handleAddFriends =  async (e) => {
    const id = userId    
    const friendsId = e.target.id
  
    if(id ===  friendsId ){
      return      
    }
    if(!friendsId || !userId){
      return
    }
    dispatch(lodingEngine(true))
    const response = await fetch(`https://grapesocialmedia.onrender.com/users/${id}/${friendsId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
    );
    const Friendsdata = await response.json();
    dispatch(setFriends(Friendsdata.formattedFriends)) 
    dispatch(setFirendsEngin(Friendsdata.friendsdata))     
    if(Friendsdata.formattedFriends){
    dispatch(lodingEngine(false))
    }
  }
  
// Give Comment to work
const handleComment = async (e) => {
  const id = e.target.id
  if(!id || !comment ){
    return 
  }
  setloding(true)
  const response = await fetch(`https://grapesocialmedia.onrender.com/posts/${id}/comment`,{
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({userId : userId , comment : comment })
  })
  const updatedPost = await response.json();  
  dispatch(updatePost(updatedPost))
  if(updatedPost?._id){
    setcomment('')
    setloding(false)

  }
}

// Comment Bar open
const handleCommentOpen = (e) => {
  const id = e.target.id
  sethandleid(id)
dispatch(handleOpenEngin(true))
}
// Comment Bar Close
const handleCommentClose = (e) => { 
  sethandleid('')
dispatch(handleOpenEngin(false))
}


// Delete Post
const handledelete = async  (e) => {
  const id = e.target.id
  if(!id){
    return
  }
  const response = await fetch(`https://grapesocialmedia.onrender.com/posts/${id}/delete`,{
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
})
  const  deletePost = await response.json()
  const deletedata =deletePost

  setcomplete(deletedata.reply)
  setInterval(function () {setcomplete('')}, 5000);
  dispatch(deletePostEngin(deletedata.id))
}



// Comment Delete
const handleCommentDelete = async (e , i) => {
  setloding(true)
  const _id = e.target.id
  const commentid = i
  if(!_id ){
    setcomplete('no have id')
    setInterval(function () {setcomplete('')}, 5000);
    return
  }
  if( !commentid){
    setcomplete('Soorty Comment is not have!')
    setInterval(function () {setcomplete('')}, 5000);
    return
  }
  const response = await fetch(`https://grapesocialmedia.onrender.com/posts/${commentid}/${_id}/comment`,
  {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json()

  setloding(false)
  setcomplete(data.reply)
  setInterval(function () {setcomplete('')}, 4000);
  if(data.reply){
    dispatch(updatePost(data.updatepost))
  }
}


// Update Post To Make Ready
const handleUpdate = (e , dis , picturepath) => {
const postid = e.target.id
if(!postid || !dis ){
  return
}
setupdatedata({postid:postid , picturepath:picturepath , dis:dis})
dispatch(PostCreateEngine(true))
dispatch(onUpdateEngine(true))

}


// Update Comment To Make Ready
const handleCOmmentUpdate = async (i , d , v) => {
  setonupdate(true)
  setcomment(v)
  const commentid = i
  const Postid = d 
  if(!commentid || !Postid || !v ) return    
setUpdateCommentobj({commentid: commentid,Postid:Postid  })

}

// Update Comment Now
const saveUpdate = async () => {
  setloding(true) 
  const response  = await fetch(`https://grapesocialmedia.onrender.com/posts/updateComment`,{
  method: "PATCH",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({commentid: UpdateCommentobj.commentid,Postid:UpdateCommentobj.Postid , updatecomment:comment})
})
 const updatecomentdate = await response.json()
 dispatch(updatePost(updatecomentdate))
 setcomment('')
 setonupdate(false)
 setloding(false)

}

// For Rerender Every User See Post CRUd Change
 useEffect(() => {
 const channel = clientpusher.subscribe('comment');
 channel.bind('new-comment', async (data) => { 
  getFeedPost()
 })
 }, [clientpusher])
 

  return ( 
    <>
    { complete ? 
              <div  className='w-[100%] h-[18%] absolute  left-0     flex flex-row items-center justify-center top-0   z-50  animate-slidedown2 m-auto'>
              <div id='fontbt' className='w-[auto] h-[50px] bg-orange-400 rounded px-[30px]  shadow-lg   flex flex-row items-center justify-center animate-slidedown  '>
                     {complete}
               </div>
            </div>
        : '' }
    <Postcreate getFeedPost={getFeedPost}  updatedata={updatedata} setupdatedata={setupdatedata}/>
    <div id='input' className="w-[100%] 3lg:w-[700px] h-[100%]  relative   rounded overflow-y-scroll overflow-hidden mx-[10px] pb-[10px]">
        <Createpostbutton daynight={daynight} userdata={userdata} userimg ={userimg} userRef={userRef} />        
        {PostdataC?.length ? PostdataC.map((data) =>
          
           <Post 
           data={data}
           daynight={daynight}
           userId={userId}
           Enter={Enter}
           handleReaction={handleReaction}
           handleMouseEnter={handleMouseEnter}
           handleOpen={handleOpen}
           handleid={handleid}
           handleCommentClose={handleCommentClose}           
           handleCommentOpen={handleCommentOpen}
           handleUpdate={handleUpdate}
           handledelete={handledelete}
           handleAddFriends={handleAddFriends}
           handleCOmmentUpdate={handleCOmmentUpdate}
           handleCommentDelete={handleCommentDelete}
           comment={comment}
           setcomment={setcomment}
           onupdate={onupdate}
           loding={loding}
           saveUpdate={saveUpdate}
           handleComment={handleComment}
           userdata={userdata}
           userimg={userimg}
           />
         
         
        )
        
       :  
       
       <div className={`   w-full h-[100vh] flex flex-col items-center justify-center z-10  `}>           
                <Waveform 
                size={40}
                lineWeight={3.5}
                speed={1} 
                color="#FB8C00"  
                />
       </div>  
       
       }
      

       
    </div>
    </>  
  )
}

export default BodyMid