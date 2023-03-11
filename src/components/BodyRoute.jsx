import { Link } from "react-router-dom"
import userpng from "../img/user.png"
import { sponser } from "../utils/pusher"
import { Waveform } from '@uiball/loaders'
import Friends from "./FriendsComponent/Friends"
import { useEffect , useState } from 'react'
import { 

   FriendsC ,
   setFriends ,
   userdataC ,
   lodingC ,
   lodingEngine ,
   daynightModeC ,
   RemoveFriends ,
   setFirendsEngin

  } from "../setting/ActionSlice"
import { useDispatch , useSelector } from 'react-redux';


const BodyRoute = () => {
    const dispatch = useDispatch()

    const userdata =useSelector(userdataC)    
    const daynight =useSelector(daynightModeC)    
    const friendsdata = useSelector(FriendsC)
    const userinfo = useSelector(userdataC)
    const loding =useSelector(lodingC)
 

    const [ randomobj , setrandomobj] = useState()

    const token = localStorage.getItem("Token")  
    const userimg2 = `https://grapesocialmedia.onrender.com/img/${userdata?.picturePath}`  
    const userimg = `https://grapesocialmedia.onrender.com/img/`   
    const TotalFriends = friendsdata?.length
    const id = userinfo._id
     
 
   
    function random_item(sponser){return sponser[Math.floor(Math.random()*sponser.length)];}
  
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



  return (
    <div id='input' className="w-[full]  h-[91.81vh]  overflow-y-scroll m-auto    ">
   <div className="flex flex-col lg:flex-row justify-center">
   
    <div className={`w-[100%] lg:w-[40%] h-[450px] ${daynight ? 'bg-[#070707]' : 'bg-slate-200' } rounded mt-[10px] mr-[10px] `}>
   
        <div className="w-[90%] h-[70px] flex flex-row items-center justify-between border-b-[0.1px] border-[#e0fefffd] m-auto ">
        <div className="flex flex-row items-center"> 
       <Link to='/Profile'>
        { userdata.picturePath ? 
            <img src={userimg2} 
              className='w-[50px] rounded-full m-[15px] cursor-pointer '
             />
        :
        <img src={userpng} 
        className='w-[50px] rounded-full m-[15px] cursor-pointer '
       />
        }
        
        </Link>

             <div className="flex flex-col ">
                <span className="font-bold  ">{userdata?.firstName} {userdata?.lastName} </span>
                <span className="text-[13px] "><span className="text-[15px]  ">{TotalFriends}</span> Friends</span>
             </div>             
             </div>   
             <i className="fa-solid fa-gear text-[20px] hover:text-slate-500 cursor-pointer mr-[10px]"></i>
        </div>
        <div className="w-[90%] h-[70px] flex flex-col   border-b-[0.1px] border-[#e0fefffd] m-auto ">
         <div className="mt-[10px] mb-[5px]">            
            <i className="fa-solid fa-briefcase text-[20px]  mx-[20px] text-orange-700"></i>
            <span className="text-[14px] font-semibold  ">{userdata?.job}</span>
         </div>

        <div className="mb-[10px]">
           <i className="fa-solid fa-earth-europe text-[20px] text-teal-500 mx-[20px]"></i>
           <span className="text-[14px] font-semibold  ">{userdata?.location}</span>
        </div>
        </div>
        <div className="w-[90%] h-[20px] mt-[10px] flex flex-row items-center justify-between  m-auto ">
            <div className="flex flex-row items-center">
                <i className="fa-solid fa-eye text-[20px] text-[#b695f5]  mx-[17px]  "></i>  
            
                <span id="fontbt" className="text-[12px] font-semibold  ">Profile View</span>
            </div>
            <span className="mr-[20px]  font-medium ">{userdata?.viewedProfile}</span>


        </div>
        <div className="w-[90%] h-[50px] flex flex-row items-center justify-between  border-b-[0.1px] border-[#e0fefffd] m-auto ">
            <div className="flex flex-row items-center">
                <i className="fa-solid fa-heart text-[20px] text-[red]  mx-[17px] cursor-pointer  "></i>  
                
                <span id="fontbt" className="text-[12px] font-semibold  ">impressions Profile</span>
            </div>
            <span  className="mr-[20px]  font-medium ">{userdata?.impressions}</span>


        </div>
        <div className=" font-bold w-[85%] h-[25px] m-auto">
                Socal Profile
        </div>
        <div className=" font-bold w-[85%] h-[25px] m-auto flex flex-col " >
            <div className="mt-[10px] flex flex-row items-center justify-between cursor-pointer">
                <div className="flex flex-row items-center ">
                    <i className="fa-brands fa-facebook text-[30px] text-sky-500 ml-[5px] mr-[10px]"></i>
                    <div className="flex flex-col">
                        <span id="fontbt" className="text-[13px] hover:underline cursor-pointer " >Face Book</span>
                        <span className="text-[12px] font-normal" >Social Media</span>
                    </div>                   
               </div>    
               <i className="fa-solid fa-pen-fancy text-sky-400 hover:text-sky-600"></i>                    
            </div>
            <div className="mt-[10px] flex flex-row items-center justify-between cursor-pointer">
            <div className="flex flex-row items-center">
                    <i className="fa-brands fa-twitter text-[30px] text-sky-500 ml-[5px] mr-[10px]"></i>                   
                    <div className="flex flex-col">
                        <span id="fontbt" className="text-[13px] hover:underline cursor-pointer" >Twitter</span>
                        <span className="text-[12px] font-normal" >Social Media</span>
                    </div>
                    </div>
                    <i className="fa-solid fa-pen-fancy text-sky-400 hover:text-sky-600"></i>  
            </div>
            <div className="mt-[10px] flex flex-row items-center justify-between cursor-pointer">
            <div className="flex flex-row items-center">
                    <i id='instgram' className="fa-brands fa-instagram text-[30px]  ml-[5px] mr-[10px]"></i>                   
                    <div className="flex flex-col">
                   
                        <span id="fontbt" className="text-[13px] hover:underline cursor-pointer" >Instgram</span>
                        <span className="text-[12px] font-normal" >Social Media</span>
                    </div>
                    </div>
                    <i className="fa-solid fa-pen-fancy text-sky-400 hover:text-sky-600"></i>  
            </div>
            <div className="mt-[10px] flex flex-row items-center justify-between cursor-pointer">
            <div className="flex flex-row items-center">
                    <i className="fa-brands fa-linkedin text-[30px]  text-cyan-600 ml-[5px] mr-[10px]"></i>                   
                    <div className="flex flex-col">
                  
                   
                        <span id="fontbt" className="text-[13px] hover:underline cursor-pointer" >Link in</span>
                        <span className="text-[12px] font-normal" >Job platform</span>
                    </div>
                    </div>
                    <i className="fa-solid fa-pen-fancy text-sky-400 hover:text-sky-600"></i>  
            </div>
        </div>
       
    </div>
     
    <div className="w-[full] lg:w-[58%] h-[auto]  ">
    <div id='input' className={`w-full ${friendsdata?.length < 5 ? 'h-auto' : 'h-[50vh] overflow-y-scroll pb-[50px]'} rounded mt-[10px] p-[10px] ${daynight ? 'bg-[#070707]' : 'bg-slate-200' }  `}>
            <div className=" relative w-[95%] h-[50px] m-auto flex flex-row items-center justify-between   ">Friends List
            <div className={` absolute w-full flex flex-row items-center justify-center ${loding ? '' : 'hidden'} `}>
                   <Waveform 
                      size={35}
                      lineWeight={3.5}
                      speed={1} 
                      color="#FFA726" 
                  /> 
            </div>
            <div className="text-[20px] text-[orange] mr-[10px] px-[10px] py-[2px] rounded-full bg-[#1c1c1c] ">{TotalFriends}</div>
            </div>
            {friendsdata?.length ? friendsdata.map(friends => (
                 <Friends
                    friends={friends}
                    //CreateMessageroup={CreateMessageroup}
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
        <div className={`w-[100%] h-[auto] ${daynight ? 'bg-[#070707]'  : 'bg-slate-200'}   rounded pb-[20px] mt-[10px]`}>
          <div className="rounded w-[90%] h-[60px] flex flex-row items-center justify-between m-auto">
            <span className="text-[15px] font-bold flex flex-row items-center ">Sponsored By <span >{randomobj?.company}</span>
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
          <div className='w-[90%] h-auto m-auto pt-[5px]  text-[14px]' >{randomobj?.description} <a href={randomobj?.link} className='text-sky-400 hover:text-sky-500'>...See More</a></div>
          
        </div>
    </div>
    </div>
    </div>
  )
}

export default BodyRoute