import React from 'react'
import  thumbs from '../img/Thumbs.gif'
import  Love from '../img/Love.gif'
import  Care from '../img/Care.gif'
import  Haha from '../img/Haha.gif'
import  Wow from '../img/Wow.gif'
import  Sad from '../img/Sad.gif'
import  Angry from '../img/Angry.gif'
const ReactionBar = ({
  data,
  Enter,
  handleReaction,
  handleMouseEnter,
  handleOpen,
  handleid,
  handleCommentClose,
  userId,
  handleCommentOpen,
}) => {


  return (
    <div className="  w-[93%] h-[55px] m-auto flex flex-row items-center justify-between">    
    <div className="flex flex-row">       
<div   id='Likethumbs' className='  w-[32%] h-[auto]  flex  items-center justify-center   rounded cursor-pointer'>
<div id='reaction' className={` absolute ${Enter ? 'flex hover:opacity-[1]  animate-slideup422' :  '' } hover:flex hover:opacity-[1]  hover:animate-slideup422  hidden left-0   opacity-[0]  transition duration-3000 ease-in   `}>
<div  className=' select-none       cursor-pointer flex flex-row items-center justify-between w-[300px] h-[40px] bg-[white] rounded-full text-[white] px-[5px]'>
 <div className='mr-[12px]'   id='Like'>
     <img onClick={(e) => handleReaction(e)} id={data?._id} src={thumbs} className='w-[50px] hover:w-[85px]'  />
     <span id='ltext' className='absolute top-[-25px] bg-black px-[6px] text-[13px] font-bold rounded-[15px] transition-all opacity-0'>Like</span>
 </div>
 <div className='mr-[12px]'   id='Like' >
     <img onClick={(e) => handleReaction(e)} id={data?._id} src={Love} className='rounded-full w-[50px] hover:w-[85px]'/>
     <span id='ltext'  className='absolute top-[-25px] opacity-0 bg-black px-[6px] text-[13px] font-bold rounded-[15px]'>Love</span>
 </div>
 <div    id='Like' >
     <img onClick={(e) => handleReaction(e)} id={data?._id} src={Care} className='rounded-full w-[50px] hover:w-[85px]' />
     <span id='ltext' className='absolute opacity-0 top-[-25px] bg-black px-[6px] text-[13px] font-bold rounded-[15px] '>Care</span>
 </div>
 <div   id='Like' >
     <img onClick={(e) => handleReaction(e)} id={data?._id} src={Haha} className='rounded-full w-[80px] translate-x-[+9px] hover:w-[140px]' />
     <span id='ltext' className='absolute top-[-25px] opacity-0 ml-[25px] bg-black px-[6px] text-[13px] font-bold rounded-[15px]'>Haha</span>
 </div>
 <div    id='Like' >
     <img onClick={(e) => handleReaction(e)} id={data?._id} src={Wow} className='w-[50px]  translate-x-[+12px] hover:w-[85px] ' />
     <span id='ltext' className='absolute top-[-25px] opacity-0 ml-[18px] bg-black px-[6px] text-[13px] font-bold rounded-[15px]'>Wow</span>
 </div>
 <div   id='Like' >
     <img onClick={(e) => handleReaction(e)} id={data?._id} src={Sad} className='rounded-full w-[80px]  hover:w-[140px] translate-x-[+15px] '/>
     <span id='ltext' className='absolute top-[-25px] opacity-0 ml-[33px] bg-black px-[6px] text-[13px] font-bold rounded-[15px]'>Sad</span>
 </div>
 <div   id='Like'>
     <img onClick={(e) => handleReaction(e)} id={data?._id} src={Angry} className='w-[80px] translate-x-[+5px]  hover:w-[140px] ' />
     <span id='ltext' className='absolute top-[-25px]  opacity-0 ml-[18px] bg-black px-[6px] text-[13px] font-bold rounded-[15px]'>Anger</span>
 </div>
</div>
</div>            
<div onMouseEnter={handleMouseEnter} className="w-full h-full flex flex-row items-center justify-center ">
 {
   Object.keys(data?.like).includes(userId) ?              
   <i className="fa-solid fa-heart text-[24px] text-[red] cursor-pointer"></i>
   : <i className="fa-regular fa-heart text-[24px] text-[red] cursor-pointer "></i>
 }
 
               <span className="text-[18px]  ml-[5px] select-none">{Object.keys(data?.like).length}</span>
</div>           
</div>
    <div className="mx-[15px] flex flex-row">
     { handleOpen && data._id === handleid ?
     <i id={data._id} onClick={(e) => handleCommentClose(e)} className="fa-solid fa-comment-dots text-[23px] text-sky-500 cursor-pointer hover:text-sky-400"></i>
     
       : <i id={data._id} onClick={(e) => handleCommentOpen(e)} className="fa-solid fa-comments text-[23px] text-sky-500 cursor-pointer hover:text-sky-400"></i>
     }
                     
     <span className="text-[18px]  ml-[5px] select-none">{data?.comments?.length}</span>
     </div>    
     </div> 

     <div>                
    
     <i className="fa-solid fa-share text-[20px] text-sky-500 cursor-pointer hover:text-sky-400"></i>
     <span className="text-[18px]  mx-[5px] select-none">0</span>
     </div> 
    </div>
  )
}

export default ReactionBar