import React, { useState } from 'react'
import Grapelogo from '../img/grape1.png'
import { useSelector , useDispatch } from 'react-redux'
import  { daynightModeC , inputC }  from '../setting/ActionSlice';
import  {daynightEngine , MessageGroupOCEngin , MessageGroupOCC } from '../setting/ActionSlice';
import { userdataC } from "../setting/ActionSlice"
import { Link } from 'react-router-dom';
import userpng from "../img/user.png"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import SearchFriends from '../components/FriendsComponent/SearchFriends';
import { BsXLg } from "react-icons/bs";
import "../index.css";

const Header = () => {
  const dispatch = useDispatch()
  const  daynight = useSelector(daynightModeC)
  const  mdgopenclose = useSelector(MessageGroupOCC)
  const userdata =useSelector(userdataC) 
  const userimg = `https://grapesocialmedia.onrender.com/img/${userdata?.picturePath}`

  
  const [open, setOpen] = React.useState(false);
  const [SearchValue , setSearchValue ] = useState('')
  const [ Friendsdata , setFriendsdata ] = useState([])
  const [ active , setactive ] = useState(false)
  const anchorRef = React.useRef(null);
  const token = localStorage.getItem("Token") 


  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  
  const handlelogout = async (e) => {

    localStorage.removeItem("getToken");
    localStorage.removeItem("Token");
    window.location.reload();

  }

  const handlesearch = async () => { 
    if(!SearchValue) return
    const response = await fetch(`https://grapesocialmedia.onrender.com/users/Search/friends`,
    {
      method: "POST",      
      headers: { Authorization : `Bearer ${token}` , "Content-Type":"application/json" },
      body: JSON.stringify({SearchValue :SearchValue})
      },
      
    )
    const data = await response.json();   
    setFriendsdata(data)
  }

  const onSearch = (e) => {    
    if(e.key === 'Enter'){     
      handlesearch()
    }

  } 
const handleMouseLeave = e => {
  setFriendsdata([])
  setSearchValue('')
  setactive(false)
}




  return (
    <div className='w-full h-[100%]  flex flex-row items-center justify-between border-b border-[#8080802a] '>
      
        <div className='flex flex-row items-center mr-[5px]   '>
          <Link to="/">
            <div className='min-w-[55px] md:w-[68px] h-auto select-none'>
           <img className=' select-none w-[55px] md:w-[60px] h-auto ml-[10px]' src={Grapelogo} />
           </div>
           </Link> 
           <div  className={` ${active ? 'w-[70vw]'  : 'w-[40px] '} md:w-[80%] flex flex-row items-center justify-center  h-auto ml-[15px] md:ml-[20px] bg-[#e185ff29] rounded z-20  `}>
              <input 
                type={'text'}
                placeholder="Search Friends..."
                value={SearchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => onSearch(e)}
                className={`   md:w-[80%] md:px-[10px] bg-transparent py-[8px]  outline-none rounded text-white ${active ? 'w-[80%] px-[10px]' : 'w-[0px]  px-[0px]  ' } transition-all duration-700   md:inline`}
              />
              { active ?
                <BsXLg onClick={() => handleMouseLeave() } className=" text-[25px] p-[5px] text-white bg-[#0000004c] hover:bg-[black] cursor-pointer  rounded-full"/>
               : <i onClick={() =>setactive(true) } className="fa-solid fa-magnifying-glass p-[10px] cursor-pointer    md:hidden"></i>
              }
              <i onClick={() => handlesearch()}  className="fa-solid fa-magnifying-glass p-[10px]  rounded cursor-pointer hidden md:inline "></i>
              
              
           </div>
           
           <div onMouseLeave={handleMouseLeave} className={` w-full xs:w-[450px] h-[auto] ${Friendsdata?.length ? '' : 'hidden'}  ${daynight ? 'bg-[#141518]'  : ' bg-slate-300'} z-40 absolute ml-0 xs:ml-[10px] top-[65px] rounded-[4px] flex flex-col py-[15px]  `}>
            {Friendsdata?.length ? Friendsdata?.map((friends) => (
                 <SearchFriends friends={friends} daynight={daynight}/>
            ))
           : ''
           }       
           </div>
        </div>
        <div className={` ${active ? 'hidden' : 'flex'} animate-slowfade md:flex flex-row items-center justify-between`}>
          <div  className='' >{
            daynight 
            ? <i onClick={(e)=> dispatch(daynightEngine(false))} className="fa-solid fa-moon text-[30px] animate-slowfade text-[#b2f5ec] ml-[10px] m-[5px] md:m-[10px] cursor-pointer"></i>            
            :<i onClick={(e)=> dispatch(daynightEngine(true))} className="fa-regular fa-sun text-[30px] animate-slowfade2 text-[#ffb936] ml-[5px] m-[5px] md:m-[10px] cursor-pointer"></i>

            }
            
          </div>
          <div>
            <i id="instgram" onClick={() => dispatch(MessageGroupOCEngin(!mdgopenclose))} className="fa-brands fa-facebook-messenger  text-[25px] md:text-[30px] m-[5px] md:m-[10px] cursor-pointer"></i>
          </div>
          <div>    
            <Link to='/BodyRoute'>     
            <i className="fa-solid fa-users text-sky-400 hover:text-sky-500 text-[23px] md:text-[25px] m-[5px] md:m-[10px] cursor-pointer inline  3lg:hidden"></i> 
            </Link>  
            <a href='https://www.youtube.com/'>
            <i  className="fa-brands fa-youtube text-red-600  text-[23px] md:text-[33px] m-[5px] md:m-[10px] cursor-pointer hidden 3lg:inline"></i>         
            </a>
          </div>
           <div className=' relative '>

      <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
         
          {
              userdata.picturePath ? 
              <img src={userimg} 
              {...bindTrigger(popupState)}
              className='w-[35px] md:w-[45px] rounded-full m-[10px] md:m-[15px] cursor-pointer border-[2px] border-[black] rounded-full bg-white '              
             /> :         <img src={userpng} 
             className='w-[35px] md:w-[45px] rounded-full m-[10px] md:m-[15px] cursor-pointer border-[2px] border-[black] rounded-full bg-white '              
            />
            }
          <i className=" absolute right-0 top-[11px] md:top-[14px] opacity-[0.7]  fa-solid fa-gear text-[15px] md:text-[20px] hover:text-slate-500 cursor-pointer mr-[8px] md:mr-[10px]"></i>
       
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>Dowload <i className="fa-solid fa-download ml-[10px] text-sky-500 text-[20px] hover:text-sky-600 "></i></MenuItem>
            <MenuItem onClick={popupState.close}>Upload <i className="fa-solid fa-cloud-arrow-up ml-[20px] text-[orange] text-[20px] hover:text-[#ffa600ed] "></i></MenuItem>
            <MenuItem onClick={popupState.close}><span onClick={ (e) =>  handlelogout(e)}>Logout <i className="fa-solid fa-key ml-[27px] text-[#4dbecd] text-[20px] hover:text-[gold] "></i></span></MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
             
           </div>
      </div>
     
    </div>
  )
}

export default Header