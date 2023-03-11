

const UserMessage = ({data , userimg}) => {
  return (
    <div key={data?.commentid} className='w-auto h-auto flex flex-col justify-start ml-[10px] my-[10px] pr-[25px]'>
    <div className={`w-auto h-auto flex flex-row justify-start ${data.Message === null  || data.Message === "" ? 
    data.link === null || data.link === '' ? 'hidden': '' : ''}   `}>
    <div className=' w-[30px] h-[30px] flex flex-col items-start mr-[7px] hover:scale-105'>
      <img
        src={`https://grapesocialmedia.onrender.com/img/${data.userPicturePath}`}
        className=' min-w-[30px] h-[30px] rounded-full'
      />
   </div>           
   <span  className={`px-[13px] py-[6px] bg-blue-600  ${data.link === null || data.link === '' ? '' : 'hidden'} rounded-[13px] break-all text-white  `}>{data.Message}</span>
   <a href={data.link}  className={`px-[13px] py-[6px] ${data.link === null || data.link === '' ? 'hidden' : ''} bg-orange-600 hover:bg-orange-500 rounded-[13px] break-all text-white  `}>{data.link}</a>
   </div>              
   <div className={`flex flex-row ${data.image === null || data.image === '' ? 'hidden' : ''}`}>
      <div className='w-[30px] h-[30px] flex flex-col items-start mr-[7px] '>
          <img
            src={`https://grapesocialmedia.onrender.com/img/${data.userPicturePath}`}
            className='min-w-[auto] h-auto rounded-full'
          />
      </div>  
      <div className='w-[80%] h-auto mt-[8px] '>
        <img
        src={`${userimg}${data.image}`}
        className='w-full h-auto rounded'
        />
      </div>                
   </div>

           
 </div>
  )
}

export default UserMessage