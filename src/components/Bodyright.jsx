import { Waveform } from '@uiball/loaders'
import { sponser } from "../utils/pusher"
import { Link } from 'react-router-dom'
import { useEffect , useState } from 'react'
import { useDispatch , useSelector } from 'react-redux';
import Friends from './FriendsComponent/Friends'

import { 
   FriendsC ,
   setFriends ,
   userdataC ,
   lodingC ,
   lodingEngine ,
   daynightModeC ,
   RemoveFriends ,
   setFirendsEngin,
   MessageGroupEngin,
   MessageGroupOCEngin,
   MessageGroupC,
   
   } from "../setting/ActionSlice"


const Bodyright = () => {
  const dispatch = useDispatch()
  
  const MessageGroup = useSelector(MessageGroupC)
  const daynight = useSelector(daynightModeC)
  const friendsdata = useSelector(FriendsC)
  const userinfo = useSelector(userdataC)
  const  loding =useSelector(lodingC)
   
  const [ randomobj , setrandomobj] = useState()


  const token = localStorage.getItem("Token")  
  const userimg = `https://grapesocialmedia.onrender.com/img/`
  const TotalFriends = friendsdata?.length
  const id = userinfo._id
 
   


  const groupidall = MessageGroup?.map((message) => {
         return message.friendsId
  })

  function random_item(sponser){ return sponser[Math.floor(Math.random()*sponser.length)];}


  const handlefriends = async () => { 
    const response = await fetch(`https://grapesocialmedia.onrender.com/users/${id}/friends`,
    {
      method: "GET",      
    }
    )
    const result = await response.json();
    dispatch(setFriends(result))
  }


  const handleRemoveFriends =  async (e) => {   
    const friendsId = e.target.id  
    if(!friendsId || !id){
      return
    }      
    dispatch(lodingEngine(true))
    const response = await fetch(`https://grapesocialmedia.onrender.com/users/${id}/${friendsId}/remove`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
    );
    const Friendsdata = await response.json();
    dispatch(RemoveFriends(Friendsdata.friendsId))   
    dispatch(setFirendsEngin(Friendsdata.friendsdata)) 
    dispatch(lodingEngine(false))    
  }


  useEffect(() => {
    handlefriends()
    setrandomobj(random_item(sponser));
  }, [])

  const CreateMessageroup = async (friendsid) => {

    if(groupidall?.includes(friendsid) ){    
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

    <div className="w-[500px] h-[400px]  hidden 3xl:inline ">
        <div className={`w-full h-[auto] ${daynight ? 'bg-[#070707]'  : 'bg-slate-200'} transition-all duration-300   rounded pb-[20px]`}>
          <div className="rounded w-[90%] h-[60px] flex flex-row items-center justify-between m-auto">
            <span className="text-[15px] font-bold flex flex-row items-center">Sponsored By <span className=''>{randomobj?.company}</span>
            <img
             src={randomobj?.compantlogoL}
             className='w-[30px] h-auto ml-[10px]'
            />
            </span>
   
            <span className="text-[13px]  hover:underline cursor-pointer">Create Ad</span>
          </div>
          <div className="w-[90%] max-h-[400px] m-auto rounded-[5px] overflow-hidden flex flex-row justify-center flex-wrap">
            <img 
            src={randomobj?.src}
            className="w-[100%] h-[auto] m-auto"
            />
     
          </div>
          <div className='w-[90%] h-auto m-auto pt-[5px] text-[14px]' >{randomobj?.description} <a href={randomobj?.link} className='text-sky-400 hover:text-sky-500'>...See More</a></div>
          
        </div>
        <div id='input' className={`w-full ${friendsdata?.length > 5  ? 'h-[50vh] overflow-y-scroll pb-[50px]'  :  'h-auto'} transition-all duration-300 rounded mt-[10px] p-[10px] ${daynight ? 'bg-[#070707]' : 'bg-slate-200' }  `}>
            <div className=" relative w-[95%] h-[50px] m-auto flex flex-row items-center justify-between  ">Friends List  
            <div className={` absolute w-full flex flex-row items-center justify-center ${loding ? '' : 'hidden'} `}>
                   <Waveform 
                      size={35}
                      lineWeight={3.5}
                      speed={1} 
                      color="#FFA726" 
                  /> 
            </div>
            <span className='mr-[15px] text-[orange] px-[10px] py-[2px] rounded-full bg-[#1c1c1c] '>{TotalFriends}</span>

            </div>
            {friendsdata?.length ? friendsdata.map(friends => (
               <Friends
               friends={friends}
               CreateMessageroup={CreateMessageroup}
               handleRemoveFriends={handleRemoveFriends}
               userimg={userimg}
               daynight={daynight}
               />
             
            )) :
                <div className='flex flex-row items-center justify-center'>
                      <Waveform 
                      size={35}
                      lineWeight={3.5}
                      speed={1} 
                      color="#03A9F4" 
                  />      
                              
                </div>
            }
            

        </div>
    </div>
 
  )
}

export default Bodyright