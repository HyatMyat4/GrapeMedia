import React from 'react'
import { BsXLg } from "react-icons/bs";
import { useEffect } from 'react';
import { clientpusher } from "../utils/pusher"
const MessageFooterinput = ({ URL,trustimage , getsingleGroup , handleimagedelete , Messagetext , sendMessage ,ClickFile , FileRef , setimagefile , ctrlink , setctrlink , link , daynight , setlink , setMessagetext}) => {
  useEffect(() => {
    const channel = clientpusher.subscribe('Message');
    channel.bind('new-message', async (data) => { 
      getsingleGroup(data,'pusher')      
    })
    }, [clientpusher])
    
  return (
    <div className=' w-full h-auto  flex flex-row items-center justify-between    m-auto  absolute bottom-[5px]  '>
    {
      URL && trustimage === true ?         
    <div className='w-[120px] h-auto absolute ml-[15px] bottom-[50px]'>
      <BsXLg onClick={handleimagedelete}  className=" absolute right-[0px] text-[20px] p-[5px] text-white hover:bg-[#177afb] bg-[black] cursor-pointer  rounded-full"/>
       <img 
       loading='lazy'
        src={URL}
        className='w-full h-auto rounded'
       />
    </div>
    : '' }
    <div className={`${Messagetext.length ? 'w-[90%] justify-end' : 'w-[95%] justify-between' }  h-[50px]  flex flex-row items-center   m-auto  `}>
      <div className={`min-w-[17%] 1xs:min-w-[19%] cursor-pointer  text-[22px] ${Messagetext.length ? 'hidden' : 'mx-[5px]'} flex flex-row `}>
        <i onClick={ClickFile} className="fa-solid fa-image animate-slowfade  text-emerald-500  hover:text-emerald-400 mx-[5px] "></i>
        <input 
         type='file'
         accept="image/*"           
         ref={FileRef}   
         onChange={(e)=>setimagefile(e.target.files)}           
        className=' absolute  bottom-0 left-0 hidden '                 
        />
     { ctrlink ?
      <i onClick={() => setctrlink(false)} className="fa-solid fa-pen-nib animate-slowfade mx-[5px] text-cyan-500 hover:text-cyan-600 "></i>
      :
      <i onClick={() => setctrlink(true)} className="fa-solid fa-link  animate-slowfade text-blue-600  hover:text-blue-500 mx-[5px]"></i>
     }
        
    </div>
      <div id='normalw'  className={`${Messagetext.length ? 'w-[98%]' : ' w-[55%] 1xs:w-[63%]' } transition-all duration-[600ms] ease-in   h-[75%] flex flex-row justify-between items-center ${daynight ? 'bg-[#252525]' : 'bg-[#c9e2e2]'}   rounded-full `}>
      <input
      type={'text'}
      placeholder={ctrlink ? 'For link....'  : 'Message..'}
      className={`w-[84%] h-full outline-none rounded-full pl-[13px] pr-[3px] bg-transparent ${ctrlink ? 'text-orange-500'   : ''} `}
      value={ctrlink?  link   : Messagetext}
      onChange={ ctrlink ?   (e) => setlink(e.target.value)     : (e) => setMessagetext(e.target.value)}
        />
        { ctrlink ? 
        <i  className="fa-solid fa-link  animate-slowfade text-orange-500  hover:text-orange-400 ml-[5px] mr-[8px] mt-[3px] "></i>
        
      :
      <i className={`fa-solid fa-face-smile text-[22px] animate-slowfade text-[#177afb] ${daynight ? "hover:bg-[#434343]" : "hover:bg-[#8a8a8a51]"}  p-[5px] rounded-full cursor-pointer mr-[4px]`}></i>
      }
        

      </div>      
     <i onClick={sendMessage}  className={`fa-solid fa-paper-plane text-[22px] text-[#177afb]  px-[6px] py-[6px] ml-[5px] ${daynight ? "hover:bg-[#272727]" : "hover:bg-[#8a8a8a51]"}  rounded-full cursor-pointer mr-[10px]`}></i>
   </div>
   </div>
  )
}

export default MessageFooterinput


/*
git remote add origin https://github.com/HyatMyat4/grapeMedia-final.git

git branch -M main
git push -u origin main
*/
