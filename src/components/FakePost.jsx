import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegCommentDots } from 'react-icons/fa';
import { DotPulse } from '@uiball/loaders'
import ReactTimeAgo from 'react-time-ago'
import { BiWorld } from "react-icons/bi";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import en from 'javascript-time-ago/locale/en.json'
import  Haha from '../img/Haha.gif'
import ReactionBar from './ReactionBar';
import TimeAgo from 'javascript-time-ago'

const FakePost = (
    {
        data,
        daynight,
        userId,    
        Enter,       
        handleMouseEnter,
        handleOpen,
        handleid,
        handleCommentClose,    
        handleCommentOpen,
        comment,
        setcomment,                 
        userdata,
        userimg,
        handleReaction
    }
) => {
  TimeAgo.setDefaultLocale(en.locale)
  TimeAgo.addLocale(en)
  return (
    <div key={data._id} className={`w-full h-[auto] ${daynight ? 'bg-[#070707]' : 'bg-slate-200' }    rounded mt-[10px]`}>
    <div className="w-full h-[auto] rounded">
       <div className="w-[95%] h-[70px] flex flex-row items-center justify-between m-auto">
          <div className="flex flex-row items-center">
            <div className="w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer " >
              <Link to={`/${data.userId}`}>                     
            <img
              src={ data.userPicturePath ? `https://grapesocialmedia.onrender.com/img/${data.userPicturePath}` : ''}
              className="w-[50px] h-[full] rounded-full "
             />
              </Link>
            </div>
             <div className="w-auto h-auto flex flex-col ml-[10px] ">
             <Link to='/BodyRoute'> 
                <span className="text-[16px]  font-bold cursor-pointer hover:underline">{data.firstName} {data.lastName}</span>
                </Link>
                <div className='flex flex-row items-center'>
                <span className="text-[13px] ">{data.location} </span>
                <BiWorld className="text-[18px] mr-[4px] text-slate-400"/>
                <ReactTimeAgo id='ROboto' key={data._id} date={Date.parse(data.createdAt)} locale="en-US" className='text-[10px] hover:underline '/>
                
                </div>
             </div>
          </div>   
          
          <div  className="w-[auto] h-[50px]   flex flex-row items-center justify-center">   
           
          <PopupState variant="popover" popupId="demo-popup-menu">
{(popupState) => (
<React.Fragment>     
  {  userId === data.userId ? 
  <i {...bindTrigger(popupState)}
   className={`fa-solid fa-user-secret text-[23px] mr-[2px]  cursor-pointer  text-[#242424ed]  ${daynight ? 'bg-slate-300' : 'bg-slate-300 hover:bg-slate-400' }  py-[5px] px-[6px] hover:bg-slate-300  rounded-full mx-[10px]`}></i>
  
  :
  <i {...bindTrigger(popupState)} className="fa-solid fa-ellipsis text-[20px] text-sky-500 cursor-pointer hover:text-cyan-400 py-[5px] px-[6px] hover:bg-slate-400 bg-slate-300 rounded-full mx-[10px] "></i>
  }
  
  
 <Menu {...bindMenu(popupState)}>
   
    {data.userId === userId ?
    <div>
    <MenuItem onClick={popupState.close} id='fontbt' ><span  id={data?._id}  className='text-[15px] flex flex-row items-center '>Save <i className="fa-solid fa-bookmark ml-[41px] text-end text-violet-500  text-[20px] hover:text-violet-600 "></i></span></MenuItem>  
    <MenuItem onClick={popupState.close} id='fontbt' ><span id={data?._id}  className='text-[15px] flex flex-row items-center'>Update <i className="fa-solid fa-cloud-arrow-up ml-[20px] text-sky-500 text-[20px] hover:text-[#004cff] "></i></span></MenuItem>
    <MenuItem onClick={popupState.close} id='fontbt'><span id={data?._id}  className='text-[15px] flex flex-row items-center'>Delete <i className="fa-solid fa-trash ml-[27px] text-[#ff003c] text-[20px] hover:text-[#e80348] "></i></span></MenuItem>
    </div>: 
    <div>
     <MenuItem onClick={popupState.close} id='fontbt' ><span  id={data?._id}  className='text-[15px] flex flex-row items-center '>Save <i className="fa-solid fa-bookmark ml-[37px] text-end text-sky-500 text-[20px] hover:text-sky-600 "></i></span></MenuItem>
     <MenuItem onClick={popupState.close} id='fontbt' ><span  id={data?._id}  className='text-[15px] flex flex-row items-center '>Report <i className="fa-solid fa-triangle-exclamation ml-[20px] text-end text-orange-500 text-[20px] hover:text-orange-600 "></i></span></MenuItem>
     </div>
    }  
    </Menu>
</React.Fragment>
)}
</PopupState>                  
                   {
                    userdata?.friends?.includes(data.userId) ?
                      <i  className={`fa-solid fa-user-check text-[20px] hover: mr-[2px]   text-sky-400 cursor-pointer `}></i>
                    :  userId === data.userId ?
                       ''
                     :<i id={data.userId}  className="fa-solid fa-user-plus text-[20px]  cursor-pointer hover:text-cyan-400" ></i>
                   }    
              
              
          
         
             
          </div>   
       </div>
       <div className="w-[95%] h-auto m-auto p-[5px]">
       <span className="text-[14px]  select-none">{data.description}</span>
       </div>
       <div className="w-[95%] h-auto m-auto select-none  ">
          <img 
          src={ data.picturePath ? `https://grapesocialmedia.onrender.com/img/${data.picturePath}` : ' '}                  
           className="rounded m-auto"
          />
       </div>
       <ReactionBar
        data={data}
        Enter={Enter}
        handleReaction={handleReaction}
        handleMouseEnter={handleMouseEnter}
        handleOpen={handleOpen}
        handleid={handleid}
        handleCommentClose={handleCommentClose}
        userId={userId}
        handleCommentOpen={handleCommentOpen}
        />
       <div id={data._id} className={`bg-[#7474740f] ${handleOpen && data._id === handleid ? '' : 'hidden'}`}>
       <div className='w-[93%] h-[auto]  rounded m-auto flex flex-col relative '>
        <div className='w-full h-[auto]'>
          { 
          data?.comments ?  data?.comments.map(comment => (
            <div key={comment.commentid} className=' group w-full h-[auto]  break-all flex flex-row    items-start justify-start mt-[10px] '>
            
            <img 
            src={`https://grapesocialmedia.onrender.com/img/${comment.userPicturePath}`}
             className='w-[40px] h-auto rounded-full  ml-[4px] mr-[10px] '
            />
           
            <div className={`w-auto h-full flex flex-col  break-all justify-between ${daynight ? 'bg-black'  : 'bg-white' }  rounded-[5px] px-[10px] py-[2px] `}>
              <div className='flex flex-row items-center'>
             
              <span id='fontbt' className='text-[12px] hover:underline cursor-pointer select-none'>{comment.firstName} {comment.lastName}      </span>
              <ReactTimeAgo id='ROboto' key={comment.commentid} date={Date.parse(comment.createat)} locale="en-US" timeStyle="twitter" className='  text-[9px]  text-sky-500 ml-[10px]'/>
              </div>
            <span className=' break-all text-[15px]   '>{comment.comment}</span>   
                             
            </div>
            
            <PopupState variant="popover" popupId="demo-popup-menu" >
            {(popupState) => (
<React.Fragment >     
  <i {...bindTrigger(popupState)} className="fa-solid fa-ellipsis text-[15px]  group-hover:opacity-[1]  opacity-0  text-sky-500 cursor-pointer hover:text-cyan-400 py-[5px] px-[6px] hover:bg-slate-400 bg-slate-300 rounded-full ml-[5px] " ></i>
  <Menu {...bindMenu(popupState)} >
   
    {comment?.userId === userId ?
    <div>
    <MenuItem onClick={popupState.close}><span id='fontbt'  
    className='text-[13px] flex flex-row items-center'>Update <i className="fa-solid fa-hourglass-end  ml-[20px] text-amber-500  text-[20px] hover:text-[#ffbf00] "></i></span></MenuItem>
    <MenuItem onClick={popupState.close} id='fontbt2' ><span  id={data?._id}   className='text-[13px] flex flex-row items-center '>Delete <i className="fa-solid fa-trash ml-[21px] text-end  text-[#ff003c] text-[20px] hover:text-[#e80348]"></i></span></MenuItem>
    </div>: 
    <div>
     
     <MenuItem onClick={popupState.close} id='fontbt2' ><span  id={data?._id}  className='text-[13px] flex flex-row items-center '>Report <i className="fa-solid fa-triangle-exclamation ml-[20px] text-end text-orange-500 text-[20px] hover:text-orange-600 "></i></span></MenuItem>
     </div>
    }  
    </Menu>
</React.Fragment>
)}
</PopupState>
           
            
         </div>
          ))
              : <DotPulse 
              size={40}
              speed={1.3} 
              color="#FFA726" 
             />
          }
 
        </div>
        <div className='w-full h-full flex flex-col  justify-end'>
          <div className=' w-[100%] h-[55px] flex flex-row items-center'>
          <div className='w-[45px] h-auto rounded-full overflow-hidden mr-[10px]'>
             <img 
              src={userimg}
              className='w-full h-auto'
             />
          </div>
       <div className={`w-[93%] h-[40px] flex flex-row items-center justify-between  overflow-hidden  ${daynight ? 'bg-black'  : 'bg-white' } rounded-full m-auto `}>               
         <img  src={Haha} className='rounded-full hidden xs:inline w-[52px] cursor-pointer translate-x-[+9px] select-none' />
         <i id='instgram' class="fa-solid fa-gift text-[22px] xs:text-[27px] mx-[5px]  cursor-pointer"></i>               
         <i className="fa-solid fa-image text-[22px] xs:text-[25px] text-emerald-500 hover:text-emerald-400 cursor-pointer"></i>
         <div className='w-[70%] h-full flex flex-row items-center '>
            <input
              type="text"
              className='w-[88%] h-full bg-transparent outline-none'
              value={comment}
              onChange={(e) => setcomment(e.target.value) }
            />       
          <FaRegCommentDots id={data?._id}  className='text-[25px] text-sky-500 mr-[10px] hover:text-sky-600 cursor-pointer ml-[10px]'/>
          
           
         </div>
         </div>
         </div>
         </div>
       </div>
       </div>

    </div>
</div>
  )
}

export default FakePost