import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux'
import { 
        MessageGroupOCEngin ,
        MessageGroupEngin ,
        MessageGroupC ,
        userdataC } 
       from "../../setting/ActionSlice"


const Friends = ({friends ,  handleRemoveFriends , userimg , daynight }) => {

   const dispatch = useDispatch()

   const userinfo = useSelector(userdataC)
   const MessageGroup = useSelector(MessageGroupC)


   const token = localStorage.getItem("Token") 
   const id = userinfo._id


  const CreateMessageroup = async (friendsid) => {

  
    const groupidall = MessageGroup?.map((message) => {
      return message.friendsId
     })
     
    if(groupidall.includes(friendsid) ){          
      dispatch(MessageGroupOCEngin(true))
      return      
   }
  if(!friendsid || !id) {return}
   const response = await fetch(`https://grapesocialmedia.onrender.com/Message/newMessage`,{
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type":"application/json",
    },
    body:JSON.stringify({ Friendsid: friendsid , userid: id  }),
  })
   const messagegroup = await response.json();
   dispatch(MessageGroupEngin(messagegroup))
   dispatch(MessageGroupOCEngin(true)) 
  }


  return (
    <div key={friends._id} className={`w-[97%] h-[60px] hover:scale-105 m-auto flex flex-row items-center cursor-pointer  hover:bg-[#80808017] justify-between ${daynight ? 'bg-[#000000]'  : 'bg-white'} transition-all duration-300 rounded my-[5px] `}>
    <div className='flex flex-row items-center'>
    <Link to={`/${friends?._id}`}>
     <div className='ml-[15px]'>
      <img src={`${userimg}${friends?.picturePath}`}
      className="w-[45px] h-[auto] m-auto rounded-full"
      />
     </div>
     </Link>
     <div className='flex flex-col  justify-around ml-[10px]'>
      <span className='text-[14px]'>{`${friends?.firstName}${friends?.lastName}`}</span>
      <span className='text-[12px]'>{`${friends?.location}`}</span>
     </div>    
     </div>    
     <div className='flex flex-row items-center'>       
     <i id="instgram" onClick={() => CreateMessageroup(friends._id)} className="fa-brands fa-facebook-messenger  text-[25px] md:text-[30px] m-[5px] md:m-[10px] cursor-pointer"></i>
     <i id={friends._id} onClick={(e) => handleRemoveFriends(e)} className={`fa-solid fa-user-minus text-[18px]    hover:text-sky-400 cursor-pointer mr-[15px]`}></i>
     </div> 
   </div>
  )
}

export default Friends