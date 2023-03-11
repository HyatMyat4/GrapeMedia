import React from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { DotPulse } from '@uiball/loaders'
import MessageSendBox from './MessageSendBox'
import { 
  MessagePageEngin ,
  MessagePageC ,
  singleGroupdataEngin ,
  singleGroupdataC ,
  userdataC ,
  daynightModeC ,
  msglodingEngin ,
  msglodingC ,
  MessageGroupOCC ,
  MessageGroupOCEngin ,
  MessageGroupC 
} from "../setting/ActionSlice"

import { useState , useEffect } from 'react'
import { clientpusher } from "../utils/pusher"
import { Ring } from '@uiball/loaders'

const MessageFriendsGroup = () => {
  const dispatch = useDispatch()

  const userdata =  useSelector(userdataC) 
  const openclose= useSelector(MessageGroupOCC)
  const MessageGroup= useSelector(MessageGroupC)
  const MessagePage = useSelector(MessagePageC)
  const singledata = useSelector(singleGroupdataC)
  const daynight = useSelector(daynightModeC)
  const loding = useSelector(msglodingC)
  
  const [ leftright , setleftright ] = useState(false)
  const [ fullscreen , setfullscreen ] = useState(false)

  const userimg = `https://grapesocialmedia.onrender.com/img/`
  const token = localStorage.getItem("Token") 
  const index =  MessageGroup?.length -1
  const userId = userdata?._id

 
  



  const getsingleGroup = async (e , i) => {      
    if( i !==  'pusher' && !singledata._id){      
      dispatch(msglodingEngin(true))
    }   
    const id = e     
    if(!id) {return }    
    const response = await fetch(`https://grapesocialmedia.onrender.com/Message/${id}/singleGroup`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    dispatch(msglodingEngin(false))
 if(data.userId !== userId && data.friendsId !== userId ){
      return
 }
    if(data?.userId){     
      if(i === 'pusher'){        
        dispatch(singleGroupdataEngin(data))     
        return
      }
     if(i === 'pusher' || id === singledata._id  ){
      dispatch(MessagePageEngin(true))
      return
     }
      dispatch(MessagePageEngin(true))
      dispatch(singleGroupdataEngin(data))    
     
    }
  }

  useEffect(() => {
    const channel = clientpusher.subscribe('Message');
    channel.bind('new-message', async (data) => { 
      getsingleGroup(data,'pusher')      
    })
    }, [clientpusher])
  
  return (
    <div id='input' className={` absolute  ${leftright ? 'left-0' : 'right-0'} top-0   w-[100%]  ${fullscreen ? 'w-full' : '1xs:w-[350px]' }   h-[100vh] overflow-hidden   ${openclose ? 'flex'   : 'hidden translate-x-[-350]' } flex-row   items-end justify-end z-[100] `}>
     
        <div className={` ${leftright ? ' animate-slideleft2' : ' animate-slideright2'} w-[100%]   ${fullscreen ? 'w-full' : '1xs:w-[350px]' } h-[100vh]  flex flex-col justify-start     ${daynight ?  'bg-[#101010]'  : ' bg-slate-200'}`}>
           <div className='w-full h-[20%]'>
            <div className='w-full h-[60px]  flex flex-row items-center justify-between'>
                <div className='mx-[10px]'>
                    Chats...<i className="fa-solid fa-comment text-blue-500 "></i>
                </div>
                <div className='flex flex-row items-center justify-between text-white'>
                  <i onClick={() => setleftright(!leftright)}  className="fa-solid fa-ellipsis text-[17px]  cursor-pointer hover:text-black py-[6px] px-[7px] hover:bg-slate-300 bg-[#404040] rounded-full mx-[5px] "></i>
                  <i onClick={() => setfullscreen(!fullscreen)} className="fa-solid fa-maximize text-[14px] py-[8px] px-[9px] rounded-full hover:bg-slate-300 bg-[#404040] cursor-pointer hover:text-black mx-[5px]  "></i>
                  <i className="fa-solid fa-video text-[15px] py-[7px] px-[6px] rounded-full hover:bg-slate-300 bg-[#404040]  cursor-pointer hover:text-black  mx-[5px] "></i>
                  <i onClick={() => dispatch(MessageGroupOCEngin(false))} className="fa-solid fa-xmark text-[17px] py-[6px] px-[9px] rounded-full hover:bg-slate-300 bg-[#404040] hover:text-blue-500  cursor-pointer ml-[5px] mr-[8px]"></i>
                </div>
            </div>
            <div className={`w-[90%] h-[37px]  ${daynight ?  'bg-[#494949]'  : 'bg-[#c9e2e2]'} flex flex-row items-center justify-center rounded-full m-auto `}>
            <i className="fa-solid fa-magnifying-glass pl-[10px] pr-[3px]"></i>
              <input
              type="text"
              placeholder='Search Messanger...'
              className='w-[90%] h-full rounded-full bg-transparent outline-none pl-[2px] '
              />
            </div>
            <div className='w-[90%]  h-[60px] text-white  flex flex-row  items-center justify-start m-auto '>
               <span onClick={() => dispatch(MessagePageEngin(false))} className={` py-[4px] px-[10px] ${MessagePage ? daynight ? 'hover:bg-[#2382ff52] text-white'  : 'hover:bg-[#2382ff52] text-[black]'  :  'bg-[#177afb]' }   cursor-pointer rounded-full mr-[10px]`}>Inbox</span>
               <span onClick={() => dispatch(MessagePageEngin(true))} className={`  py-[4px] px-[10px] ${MessagePage ? 'bg-[#177afb]'  :  daynight ? 'hover:bg-[#2382ff52]'  :'hover:bg-[#2382ff52] text-[black] '} cursor-pointer rounded-full `}>Message</span>
            </div>
            </div>
            <div className='w-full h-[80%] '>
            {!MessagePage ? 
             MessageGroup.length ? MessageGroup.map(group => (

              <div key={group?._id}  onClick={(e) => getsingleGroup(group._id)} 
               className={`h-[60px] m-auto rounded  ${ daynight ? 'w-[96%]  hover:bg-[#313131d0] ' : 'w-[94%] hover:bg-[#80808035] hover:scale-105'} cursor-pointer flex flex-row items-center justify-start`}>
              <div className=' select-none w-[52px] h-[52px] rounded-full mx-[10px] '>
              <img
              alt=''
               src={ group?.userId === userId ? `${userimg}${group?.FriendsPicturePath}` : `${userimg}${group?.userPicturePath}` }                                 
                  className='min-w-[52px] h-full rounded-full'
                />
              </div>
              <div className='flex flex-col select-none justify-between '>
                { group?.userId === userId ?
                 <span className='text-[20px]' >{group?.friendsfirstName}{group?.friendslastName}</span>
              : 
                <span className='text-[20px]' >{group?.userfirstName}{group?.userlastName}</span>
              }                 
                  <span id='fontbt2' className='text-[15px] text-blue-500'>{group.Message[group.Message.length -1]?.Message.slice(0, 35)} </span>
              </div>
            </div>

            ))
           : 
           <div className='w-full h-full flex flex-col items-center justify-center '>
            <DotPulse 
              size={60}
              speed={1.3} 
              color="#FB8C00" 
              /> 
           </div>
          

           :
           !singledata._id ?
            <MessageSendBox      
            getsingleGroup={getsingleGroup}     
            singledata={MessageGroup[index]}
            userimg={userimg}
            token={token}
            daynight={daynight}
            fullscreen={fullscreen}
            />

            :
            <MessageSendBox   
            getsingleGroup={getsingleGroup}                 
            singledata={singledata}
            userimg={userimg}
            token={token}
            fullscreen={fullscreen}
            daynight={daynight}
            />

           }
           </div>

        </div>
        <div id='instgram' className={` ${loding ? '' : 'hidden' } absolute w-full  h-full flex flex-col items-center justify-center `}>
          <Ring 
          size={50}
          lineWeight={4}
          speed={2} 
          color="#ff5280"
           />
   

           </div>
    </div>
  )
}

export default MessageFriendsGroup