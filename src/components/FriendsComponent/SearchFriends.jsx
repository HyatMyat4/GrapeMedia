import React from 'react'
import { Link } from 'react-router-dom'

const SearchFriends = ({friends , daynight}) => {
  return (
    <div key={friends._id} className={`w-[90%] h-[60px] hover:scale-105 m-auto flex flex-row items-center cursor-pointer hover:text-[black]  hover:bg-emerald-400 justify-between ${daynight ? 'bg-[#000000]'  : 'bg-white'} transition-all duration-300 rounded mt-[10px] `}>
    <div className='flex flex-row items-center'>
    <Link to={`/${friends?._id}`}>
     <div className='w-[45px] ml-[15px]'>
      <img src={`https://grapesocialmedia.onrender.com/img/${friends?.picturePath}`}
      className="min-w-[45px] h-[auto] m-auto rounded-full"
      />
     </div>
     </Link>
     <div className='flex flex-col  justify-around ml-[10px]'>
     <Link to={`/${friends._id}`}>
      <span id='fontbt2' className='text-[18px] font-bold hover:underline '>{`${friends?.firstName}${friends?.lastName}`}</span>
      </Link>
      <span className='text-[15px]'>{`${friends?.location}`}</span>
     </div>    
     </div>    
     <div className='flex flex-row items-center'>       
     <i id={friends.userId} className="fa-solid fa-user-plus text-[20px]  cursor-pointer hover:text-[black] mr-[20px]" ></i>                       
     </div> 
   </div>
  )
}

export default SearchFriends