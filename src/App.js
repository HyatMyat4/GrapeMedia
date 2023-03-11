

import Register from './auth/Register'
import Login from './auth/Login'
import Home from './components/Home'
import MainProfile from './components/MainProfile'
import EditCoverPhoto from './components/EditCoverPhoto'
import MainProfilePublic from './components/MainProfilePublic'
import BodyRoute from './components/BodyRoute'
import Profile from './components/Profile'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import  { daynightModeC , getTokenC , PostCreateC}  from './setting/ActionSlice';
import  { userdataEngine ,setFriends , MessageGroupEngin}  from './setting/ActionSlice';
import { useEffect , useState  } from 'react'

import jwt_decode from "jwt-decode"
function App() {  
  const dispatch = useDispatch()

  const getToken = useSelector(getTokenC)  
  const daynight =useSelector(daynightModeC)
  const PostCreate =useSelector(PostCreateC)


  const [id , setid] = useState()
  const [userimfor , setuserimfor] = useState()

  if(getToken){ localStorage.setItem("getToken",getToken)   }  

    const getmemory = localStorage.getItem("getToken") 

    const token = localStorage.getItem("Token")  

const getFeedPost  = async () => {
  if(!token){
    return
  }
    const {id} = jwt_decode(token) 
    setid(id)
if(token && id){
  
    const response = await fetch(`https://grapesocialmedia.onrender.com/users/${id}` ,{
      method: "GET",
      headers: { Authorization : `Bearer ${token}`}  
  });
    const data = await response.json();

    setuserimfor(data)
        dispatch(userdataEngine(data))  
  }
    handlefriends()
}


const handlefriends = async () => {
  const {id} = jwt_decode(token) 
 
  const response = await fetch(`https://grapesocialmedia.onrender.com/users/${id}/friends`,
  {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  }
  )
  const result = await response.json(); 
  dispatch(setFriends(result)) 
}

const AllmsgGroup = async () => {
  const {id} = jwt_decode(token) 
  const response = await fetch(`https://grapesocialmedia.onrender.com/Message/${id}/AllMessageGroup`,
  {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
  const messagegroup = await response.json(); 
 
  dispatch(MessageGroupEngin(messagegroup))
}


useEffect(() => {  
  AllmsgGroup()
  getFeedPost();

}, [])




  return (
    <div  id='input'  className={`${ daynight ? 'bg-[#23242a] text-white '  : 'bg-[#f2fbfbdb] text-[black]'  } transition-all duration-300 ${PostCreate ? 'h-[100%] overflow-hidden' : '' }  `}>
    
      <Routes>
      {getToken || getmemory   ? <Route path="/" element={<Home />} /> : <Route path="/" element={<Register />} /> }          
      <Route path="/Login" element={<Login   getFeedPost={getFeedPost} handlefriends={handlefriends} />} />
       <Route path="/Profile" element={<MainProfile />} />
       <Route path="/RegisterProfile" element={<Profile />} />
       <Route path="/EditCoverPhoto" element={<EditCoverPhoto />} />    
       <Route path="/BodyRoute" element={<BodyRoute />} />
       <Route path="/:id"  element={<MainProfilePublic/>} />
          
      </Routes>      
    </div>
  );
}

export default App;
