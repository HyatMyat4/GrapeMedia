import React from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import { Waveform } from '@uiball/loaders'
import { DotPulse } from '@uiball/loaders'
import { useEffect , useState } from 'react';
import { useSelector } from "react-redux"
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import FakePost from './FakePost'
import { useGetUserPostQuery } from '../api/PostApiSLice'
import  { 
  FriendsC , 
  daynightModeC ,
  handleOpenEngin ,
  handleOpenC,
  userPostEngin,
  userPostC,  
  }  from '../setting/ActionSlice';   
const MainProfilePublic = () => {
  const dispatch=useDispatch()
  TimeAgo.setDefaultLocale(en.locale)
TimeAgo.addLocale(en)
    const { id } = useParams()
    const token = localStorage.getItem("Token")

    const usepost = useSelector(userPostC)
    const friendsdata  = useSelector(FriendsC) 
    const handleOpen = useSelector(handleOpenC)
    const daynight = useSelector(daynightModeC)


    const [ userdata , setuserdata ] =useState() 
    const [Enter , setEnter] = useState(false)
    const [comment , setcomment] = useState('')  
    const [handleid , sethandleid] = useState('')

    const userId = userdata?._id

    const bgimage =`https://grapesocialmedia.onrender.com/img/${userdata?.backgrounpicture}`
    const userimg = `https://grapesocialmedia.onrender.com/img/${userdata?.picturePath}`


   // const {
   //   data,
   //   isLoading,
   //   isSuccess,    
  //    error
   // } = useGetUserPostQuery(id)
  
  

    const getUserPost  = async () => {
      const response = await fetch(`https://grapesocialmedia.onrender.com/posts/${id}/posts`,{
       method: "GET",
       headers: { Authorization : `Bearer ${token}`}  
    });
      const data = await response.json();
    
      dispatch(userPostEngin(data))
     
    }
    
    const userdatainfo = async () => {
        const response = await fetch(`https://grapesocialmedia.onrender.com/users/${id}`,{
            method: "GET",
            headers: { Authorization : `Bearer ${token}`} 
        }
        )
        const data = await response.json();        
        setuserdata(data)
    }
   
  useEffect(() => {
    userdatainfo()
    getUserPost()    
  }, [])
  
  TimeAgo.setDefaultLocale(en.locale)
  TimeAgo.addLocale(en)


  // For Reactiona to work
  const handleMouseEnter = (e) => {  
   setEnter(true)  
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


 
  return (
    <div  className=' w-full h-[auto] '>
    <div className='relative max-w-[1000px]   h-[400px] m-auto  rounded-[7px]'>     
    <div className={` w-[full]   h-[400px] ${userdata?.backgrounpicture ? '' : 'bg-[black] '}   overflow-hidden  rounded-[7px]`} >
        { 
          userdata?.backgrounpicture ?
                  <div className='w-full h-[100%] bg-cover bg-center' style={{ backgroundImage:`url(${bgimage})`}} ></div>
           : <div className='w-full h-full flex flex-row items-center justify-center'>   
                      <DotPulse 
                    size={60}
                    speed={1.3} 
                    color="#FB8C00" 
                    /> 
             
            </div>
        }
      
      </div>     

    
    <div className=' group absolute  z-10   bottom-[-90px] left-[20px] w-[200px] h-[200px]  rounded-full border-[3px] border-[black] overflow-hidden '>
      { userdata?.picturePath ?
            <img 
            src={userimg}
            className=' w-full h-full object-cover rounded-full select-none '
            
          />
        :
        <div className='w-full h-full flex flex-row items-center justify-center'>
            <Waveform 
            size={40}
            lineWeight={3.5}
            speed={1} 
            color="#FB8C00" 
            />
        </div>
      }

      <div className=' cursor-pointer group-hover:flex hidden animate-slideup42   absolute bottom-0 w-full h-[100%] bg-[#00000056] z-20  flex-row  items-start justify-center'>
           
      </div>
      
    </div> 
    <div className='ml-[230px] hidden  2lg:flex  flex-row  items-center justify-between'>
      <div className=''>
      <span className=' text-[25px] '>{userdata?.firstName} {userdata?.lastName}</span>
      <div className='text-[15px] text-[#b5b5b5] hover:underline cursor-pointer'>{friendsdata?.length} Friends</div>
      </div>

    </div>
  
    </div>
    <div className='max-w-[1000px]  h-[auto] m-auto  flex flex-col  lg:flex-row items-start justify-center lg:justify-between mt-[100px]'>
        <div className=' w-[100%] lg:w-[43%] h-[auto] sticky lg:top-0 text-white  '>           
          <div className='w-[100%] h-auto  bg-[black] rounded-[5px]'>
            <div  className='w-[90%] h-[40px] m-auto hidden 2lg:flex flex-row items-center' >
              Intro
            </div>
          <div  className=' 2lg:hidden flex flex-col items-center justify-center'>
             
               <span className=' text-[25px] '>{userdata?.firstName} {userdata?.lastName} </span>

              
              </div>
              <div className='w-[90%] h-[40px] flex flex-row items-center justify-center   m-auto  p-[25px] '>
                  Dream Car Apolo IE
                  
              </div>          
              <div className='w-[90%] h-[40px] flex flex-row items-center justify-start  m-auto  '>
                  <i className="fa-solid fa-house text-[20px] mr-[10px] text-sky-400"></i>          
                  <span>{userdata?.location}</span>        
              </div>
              <div className='w-[90%] h-[40px] flex flex-row items-center justify-start  m-auto  '>
                  <i className="fa-solid fa-heart text-[20px] mr-[10px] text-red-600"></i>      
                
                  <span>Single</span>        
              </div>
              <div className='w-[90%] h-[40px] flex flex-row items-center justify-start  m-auto  '>
              <i className="fa-solid fa-briefcase text-[20px] mr-[10px] text-orange-700"></i>
                
                  <span>{userdata?.job}</span>        
              </div>        
          </div>
          <div className="w-[100%] h-auto   rounded-[5px]  bg-[black] py-[10px] mt-[10px]  " >
          <div className="w-[95%] h-[50px] mt-[10px] flex flex-row items-center justify-between cursor-pointer m-auto">
              <div className=" flex flex-row items-center ">
                  <i className="fa-brands fa-facebook text-[30px] text-sky-500 ml-[5px] mr-[10px]"></i>
                  <div className="flex flex-col">
                      <span className="text-[13px] hover:underline cursor-pointer" >Face Book</span>
                      <span className="text-[12px] text-gray-400 font-normal" >Social Media</span>
                  </div>                   
             </div>    
             <div className='flex flex-row items-center justify-between'>
                 
                <i className="fa-solid fa-link text-[25px] text-blue-600 hover:text-blue-500 cursor-pointer"></i>
                </div>   
          </div>
   
          <div className="w-[95%] h-[50px] m-auto flex flex-row items-center justify-between cursor-pointer">
          <div className="flex flex-row items-center">
                  <i className="fa-brands fa-twitter text-[30px] text-sky-500 ml-[5px] mr-[10px]"></i>                   
                  <div className="flex flex-col">
                      <span className="text-[17px] hover:underline cursor-pointer" >Twitter</span>
                      <span className="text-[12px] text-gray-400 font-normal" >Social Media</span>
                  </div>
                  </div>
                  <div className='flex flex-row items-center justify-between'>
                 
                <i className="fa-solid fa-link text-[25px] text-blue-600 hover:text-blue-500 cursor-pointer"></i>
                </div> 
                  
          </div>
          <div className="w-[95%] h-[50px] m-auto flex flex-row items-center justify-between cursor-pointer">
          <div className="flex flex-row items-center">
                  <i id='instgram' className="fa-brands fa-instagram text-[30px]  ml-[5px] mr-[10px]"></i>                   
                  <div className="flex flex-col">
                 
                      <span className="text-[17px] hover:underline cursor-pointer" >Instgram</span>
                      <span className="text-[12px] text-gray-400 font-normal" >Social Media</span>
                  </div>
                  </div>
                  <div className='flex flex-row items-center justify-between'>
                 
                <i className="fa-solid fa-link text-[25px] text-blue-600 hover:text-blue-500 cursor-pointer"></i>
                </div> 
                  
          </div>
          <div className="w-[95%] h-[50px] m-auto flex flex-row items-center justify-between cursor-pointer">
          <div className="flex flex-row items-center">
                  <i className="fa-brands fa-linkedin text-[30px]  text-cyan-600 ml-[5px] mr-[10px]"></i>                   
                  <div className="flex flex-col">
                
                 
                      <span className="text-[17px] hover:underline cursor-pointer" >Link in</span>
                      <span className="text-[12px] text-gray-400 font-normal" >Job platform</span>
                  </div>
                  </div>
                  <div className='flex flex-row items-center justify-between'>
                 
                <i className="fa-solid fa-link text-[25px] text-blue-600 hover:text-blue-500 cursor-pointer"></i>
                </div> 
                  
          </div>
      </div>
        </div>
        <div className='w-[100%] lg:w-[56%] h-[auto] mt-[10px] lg:mt-0 relative '>
          {usepost?.length  ? usepost.map(data => ( 
                 <FakePost
                   data={data}
                   daynight={daynight}
                   userId={userId}
                   Enter={Enter}                  
                   handleMouseEnter={handleMouseEnter}
                   handleOpen={handleOpen}
                   handleid={handleid}
                   handleCommentClose={handleCommentClose}           
                   handleCommentOpen={handleCommentOpen}
                   comment={comment}
                   setcomment={setcomment}                                 
                   userdata={userdata}
                   userimg={userimg}
        />
          ))
        :  
   <div className='w-full h-[400px] flex flex-col items-center justify-center'>
          <DotPulse 
            size={60}
            speed={1.3} 
            color="#FB8C00" 
        />
   </div>
  
        }
      </div>
        

  
    </div>

  </div>
  )
}

export default MainProfilePublic