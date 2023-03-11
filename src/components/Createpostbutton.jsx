import React from 'react'
import userpng from "../img/user.png"
import { useDispatch } from 'react-redux'
import { PostCreateEngine } from '../setting/ActionSlice'
import { Link } from 'react-router-dom'
const Createpostbutton = ({daynight , userdata , userimg ,  userRef }) => {
    const dispatch = useDispatch()

  return (
    <div className={`w-full h-[auto] ${daynight ? 'bg-[#070707]' : 'bg-slate-200' } transition-all  duration-300  rounded flex flex-col `}>
            <div className="w-[95%] h-[70px] flex flex-row items-center my-[10px] ] border-b border-[white] m-auto">
            <Link to='/Profile'>
              {
                userdata?.picturePath?
                <img src={userimg} 
                className='w-[50px] rounded-full m-[15px] cursor-pointer mr-[18px]  '
               />
                :
                <img src={userpng} 
                className='w-[50px] rounded-full m-[15px] cursor-pointer mr-[18px]  '
               />
              }
  
                  </Link>
                <div onClick={() => dispatch(PostCreateEngine(true))} 
                className={`w-[88%] h-[48px]  rounded-full overflow-hidden ${daynight ? 'bg-[#1c1c1c] hover:bg-gray-500' : 'bg-[#c9e2e2] hover:bg-[#95abab]' }  transition-all duration-300 flex flex-row items-center justify-center cursor-pointer  `}>     
                Create Post ...
                </div>

            </div>
            <div className="w-[95%] h-[auto] flex flex-row items-center justify-between m-auto ">
              <div  className="mb-[10px] flex flex-col 2lg:flex-row items-center">
                <input 
                  type="file"
                  id="myfiles"
                   accept="image/*" 
                   multiple
                   ref={userRef}
                   className="absolute text-[2px] left-0  hidden"
                />
                <i className="fa-solid fa-image text-[30px] text-emerald-500 cursor-pointer hover:text-emerald-400"></i>
                
              </div>
              <div className="mb-[10px] flex flex-col 2lg:flex-row items-center">
                 <i className="fa-brands fa-discord text-[28px] text-blue-600 cursor-pointer hover:text-blue-500"></i>
                
              </div>
              <div className="mb-[10px] flex flex-col 2lg:flex-row items-center">
                 <i className="fa-solid fa-paper-plane text-[28px] text-amber-400 cursor-pointer hover:text-amber-300"></i>                       
               
              </div>
              <div className="mb-[10px] flex flex-col 2lg:flex-row items-center">
                 <i className="fa-solid fa-link text-[28px] text-blue-600 cursor-pointer hover:text-blue-500"></i>
                 
              
              </div>
              <div className="mb-[10px] flex flex-row items-center">      
                 
                <span className="  text-[14px] select-none ml-[5px] px-[25px] py-[8px] bg-sky-500 rounded-full font-bold text-[white] cursor-pointer hover:bg-sky-400">Post</span>
              </div>
 
            </div>
        </div>
  )
}

export default Createpostbutton