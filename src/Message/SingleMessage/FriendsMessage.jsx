import React from 'react'

const FriendsMessage = ({data , userimg }) => {
  return (
    <div key={data?.commentid} className='w-auto h-auto flex flex-col justify-end  my-[10px] pl-[20px]'>      
    <div className={`w-auto h-auto flex flex-row justify-end ${data.Message === null  || data.Message === "" ? 
       data.link === null || data.link === '' ? 'hidden': '' : ''} ml-[7px] mr-[8px]  `}>
   <span className={`px-[13px] py-[6px] bg-blue-600 rounded-[13px] text-white ${data.link === null || data.link === '' ? '' : 'hidden'}`}>{data.Message}</span>
   <a href={data.link}  className={`px-[13px] py-[6px] ${data.link === null || data.link === '' ? 'hidden' : ''} bg-orange-600 hover:bg-orange-500  rounded-[13px] break-all text-white  `}>{data.link}</a>
   <div className='w-[30px] h-[30px] flex flex-col items-start ml-[10px] mr-[5px] '>
     <img
       src={`https://grapesocialmedia.onrender.com/img/${data.userPicturePath}`}
       className='min-w-[30px] h-auto rounded-full'
     />
  </div>
  </div>
  <div className={`flex flex-row justify-end ${data.image === null || data.image === '' ? 'hidden' : ''} ml-[7px] mr-[8px]`}>         
         <div className='w-[80%] h-auto mt-[10px]  '>
           <img
           src={`${userimg}${data.image}`}
           className='w-full h-auto rounded'
           />
         </div>
         <div className='w-[30px] h-[30px] flex flex-col items-start ml-[10px] mr-[5px]   '>
             <img
               src={`https://grapesocialmedia.onrender.com/img/${data.userPicturePath}`}
               className='min-w-[30px] h-[30px] rounded-full'
             />
         </div>  
      </div>
</div>
  )
}

export default FriendsMessage