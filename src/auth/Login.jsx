import React from 'react'
import { useState , useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'
import {  useDispatch } from 'react-redux'
import { getTokenEngine } from '../setting/ActionSlice'

const Login = ({getFeedPost , handlefriends}) => {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const [show , setshow ] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [Emailpassword, setEmailPassword] = useState({})
 
  const [msg, setmsg] = useState('')
  const HandleLogin = async (e) => {   
    setmsg('')
    e.preventDefault() 

  if( email && password ) { 
    try{
      if(Emailpassword){   
        const login = await fetch(`https://grapesocialmedia.onrender.com/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Emailpassword),
        });
        const loggedIn = await login.json();
        if(loggedIn){
          setmsg(loggedIn.message)
        }else{
          setmsg("Soorty Login Failed")
        }
   
        localStorage.setItem("Token",loggedIn.token) 
       
        
        if(loggedIn.token){    
        dispatch(getTokenEngine(true))  
        
        navigate('/')
       
        }
    
    
     
      }
    } catch (err) {
      setmsg(err.msg)
   
    }

  }
  

  }

useEffect(() => {
 if( email && password ){
  setEmailPassword({email ,password}) 
 }
}, [email , password])

getFeedPost()
handlefriends()

  return (
    <div className='w-full h-[90vh]  bg-[#23242a] flex flex-col items-center justify-center '>
 <div className=' w-[100%]     xs:w-[460px]  h-[500px]  xs:h-[610px] '>
        <div id='box2' className=' relative w-[100%] h-[100%] bg-[#1c1c1c] rounded-[8px] m-auto overflow-hidden'>
            <form >
            <h2 id='Wecom' className='text-[19px] text-center font-semibold text-cyan-300 mt-[90px]'>L o g i n<i className="fa-solid fa-lock-open ml-[10px] text-[#948787]"></i></h2>
              
                <div className=' mt-[20px]'>
                   <span className='text-[#45f3ff] text-[13px]'>Email</span>
                   <input      
                                
                    className='   w-full h-[40px] rounded-md outline-none p-[15px] bg-[#e9fffe] text-[black]'
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                   />
                </div>
                <div className='mt-[20px]'>
                   <span className='text-[#45f3ff] text-[13px]'>Password
                   { show ? <i onClick={() => setshow(false)} className="fa-solid fa-eye-slash  text-black ml-[10px] text-[15px] mt-[5px] cursor-pointer"></i> 
                  : <i onClick={() => setshow(true)} className="fa-solid fa-eye text-black ml-[10px] text-[15px] mt-[5px] cursor-pointer"></i>
                    }
                   </span>
                   <input  
                                     
                    className='   w-full h-[40px] rounded-md outline-none p-[15px] bg-[#e9fffe] text-[black]'
                    type={show ? 'text' :"password"}
                    onChange={(e) => setPassword(e.target.value)}
                    
                   />
                </div>
                <button 
                onClick={HandleLogin}
                className='w-full h-[40px]  rounded-md mt-[20px] bg-cyan-500  font-semibold'>L o g i n</button>
                <div className='text-[15px] text-red-600 text-center mt-[10px]'></div>
                <div className='text-[15px] text-[orange] text-center mt-[10px]'>{ msg ? msg : ''}</div>
               
            </form>            
        </div> 
        </div>       
    </div>
  )
}

export default Login