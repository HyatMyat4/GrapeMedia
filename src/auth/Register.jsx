import React from 'react'
import Dropzone from "react-dropzone";
import { useState , useEffect , useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Profile from '../components/Profile';
import { profileimgnameC , cropProfileopencloseC } from '../setting/ActionSlice'
import { cropProfileopencloseEngine } from '../setting/ActionSlice'
import { useSelector , useDispatch } from 'react-redux';
import { BsExclamation, BsFillCloudCheckFill } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Register = () => {
  const dispatch = useDispatch()
const profileimgname =useSelector(profileimgnameC)
const openclose =useSelector(cropProfileopencloseC)

  const navigate = useNavigate();
  const userRef  = useRef();
  const FileRef = useRef()

 const [All , setALl] =useState({});
 
 const [eye , seteye ] =useState(false)

  
  const [firstName , setfirstName]=useState('') 
  const [ validfirstName , setValidfirstName] = useState(false);
  const [firstNameFocus , setfirstNameFocus] = useState(false)


  const [lastName , setlastName]= useState('')
  const [ validlastName , setValidlastName] = useState(false);
  const [lastNameFocus , setlastNameFocus] = useState(false)

  const [location , setlocation]= useState('')
  const [ validlocation , setValidlocation] = useState(false);
  const [locationFocus , setlocationFocus] = useState(false)

  const [file , setfile]= useState()
  const [picturePath , setpicturePath]= useState()
  const [imgsuccess , setimgsuccess]= useState(false)
  


  const [job , setjob]= useState('')
  const [ validjob , setValidjob] = useState(false);
  const [jobFocus , setjobFocus] = useState(false)


  const [loding , setloding ] = useState(false)


  const [email , setemail]= useState('')
  const [ validemail , setValidemail] = useState(false);

  const [emailFocus , setemailFocus] = useState(false)

  const [password , setpassword]= useState('')
  const [ validpassword , setValidpassword] = useState(false);
  const [passwordFocus , setpasswordFocus] = useState(false)

  const [err , seterr]= useState('')
  const [success , setsuccess] = useState(false);
  const [ messagesuccessfail , setmessagesuccessfail] = useState('')

 const Name_REGEX =/^(?=.*[a-z]).{3,24}$/;
 const location_REGEX =/^(?=.*[a-z]).{4,24}$/;
 const email_REGEX =/^(?=.*[a-z])(?=.*[@]).{8,45}$/;
 const PWD_REGEX =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;


useEffect(() => {
userRef.current.focus();
}, [])

useEffect(() => {
  seterr('')
  const result = Name_REGEX.test(firstName)
  setValidfirstName(result)
},[firstName])

useEffect(() => {
  seterr('')
  const result = Name_REGEX.test(lastName)
  setValidlastName(result)
},[lastName])

useEffect(() => {  
  seterr('')
  const result =  location_REGEX.test(location)
  setValidlocation(result)
},[location])

useEffect(() => {    
  seterr('')
  if(imgsuccess === false){
   
    seterr("Need To Click Upload")
  }
 
},[file])

useEffect(() => {  
  seterr('')
  const result =  location_REGEX.test(job)
  setValidjob(result)
},[job])

useEffect(() => {
  seterr('')
  setValidemail(false)
  if(email.includes("@gmail.com")){  
      const result = email_REGEX.test(email)
      setValidemail(result)
    }
   


},[email])

useEffect(() => {
  seterr('')
  const result = PWD_REGEX.test(password)
  setValidpassword(result)
},[password])


useEffect(() => {
  seterr('')

  if(firstName && location &&  email && password && job  && profileimgname   ){
    setpicturePath(profileimgname) 
    if(validfirstName&&validlocation && picturePath){
      setsuccess("true")
      setALl({firstName,lastName,location ,  job ,email,password , picturePath })
     
    }
  }else{
    if(firstName && lastName && location ){    
      seterr("All fields are required 2")
    }
   
  }

},[ firstName , lastName, email , password , location , profileimgname , job , openclose  ])
 


const sendFile = async () => {
   seterr('')  
  if(!firstName  && !email  && !password  && !location  && !profileimgname  && !job ){   
   return  seterr("All fields are required 1")
  }

  const formData = new FormData()
for (let value in All) {
  formData.append(value, All[value]);
}




  if(validemail && validpassword ){
    setloding(true)
    const saveUser = await fetch(`https://grapesocialmedia.onrender.com/auth/register` ,
    {
      method: "POST",
      body:formData,
    }
    )
    
    const save = await saveUser.json()
      setmessagesuccessfail(save.message)

    setloding(false)
    if(save.includes("User Create Complete...")){
      
      navigate("/Login")
    }
    
  }


}



  return (
    <>   
    <Profile/>
    <div className={` absolute  w-full h-[100vh] flex flex-col items-center justify-center z-10 ${loding ? '' : 'hidden' }  `}>
        <AiOutlineLoading3Quarters className="text-[60px] absolute animate-spin  text-teal-500   "/>
    </div>
    
    <div className='bg-[#23242a] w-[100%] h-[867px] flex flex-col items-center justify-center'>         
    <div className=' w-[100%]     xs:w-[460px]  h-[680px]  xs:h-[690px]'>
        <div id='box' className=' relative w-[100%] h-[100%] bg-[#1c1c1c] rounded-[8px] m-auto overflow-hidden'>
            <form>
            <h2 id='Wecom' className='text-[19px] text-center font-semibold text-cyan-300'>R e g i s t e r <i className="fa-solid fa-square-envelope"></i></h2>
       
              <div className='w-[full] h-[auto] flex flex-col xs:flex-row mt-[15px]'>
     
                <div className='w-[full] h-[auto] flex flex-col mr-[0px] xs:mr-[15px]'>
                  <span className='text-[#45f3ff] text-[13px]'>First name
                  <span className={validfirstName ? 'inline ml-[10px]' : 'hidden'}>
                    <i className="fa-solid fa-check text-[#39d863] text-[20px]"></i>
                  </span>
                  <span className={validfirstName || !firstName ? 'hidden' : 'inline ml-[10px]'}>
                     <i className="fa-solid fa-xmark text-[red] text-[20px]"></i>
                  </span>
                  </span>
                    <input    
                    autoComplete='off'                 
                    type={'text'}
                    ref={userRef}
                    required               
                    aria-invalid={validfirstName ? "false" : "true"}    
                    aria-describedby="uidnote" 
                    className='w-[100%] h-[40px] border border-gray-300 rounded-md outline-none p-[15px] bg-[#e9fffe] text-[black]'
                    onChange={(e)=> setfirstName(e.target.value)}
                    onFocus={() => setfirstNameFocus(true)}
                    onBlur={() => setfirstNameFocus(false)}                  
                    />
                    <p className={` ${ firstNameFocus && firstName && !validfirstName ? 'inline' : 'hidden' } absolute bottom-0 left-0 w-full h-auto text-[14px] p-[10px] text-center text-[white] rounded-[8px] bg-[black]`} >
                    <i className="fa-solid fa-exclamation text-[red] text-[19px]  mr-[10px]"></i>
                   
                    Must begin with a letter.<br />
                     3 to 24 characters.<br />                     
                     only Letters allowed.

                    </p>
                </div>
                <div className='w-[full] h-[auto]  flex flex-col'>
                  <span className='text-[#45f3ff] text-[13px]'>Last name
                  <span className={validlastName ? 'inline ml-[10px]' : 'hidden'}>
                    <i className="fa-solid fa-check text-[#39d863] text-[20px]"></i>
                  </span>
                  <span className={validlastName || !lastName ? 'hidden' : 'inline ml-[10px]'}>
                     <i className="fa-solid fa-xmark text-[red] text-[20px]"></i>
                  </span>
                  </span>
                    <input 
                    autoComplete='off'  
                    type={'text'}
                    required
                    aria-invalid={validlastName ? "false" : "true"}    
                    aria-describedby="uidnote" 
                    className='w-[100%] h-[40px] border border-gray-300 rounded-md outline-none p-[15px] bg-[#e9fffe] text-[black]'
                    onChange={(e)=> setlastName(e.target.value)}
                    onFocus={() => setlastNameFocus(true)}
                    onBlur={() => setlastNameFocus(false)}  
                    />
                    <p className={` ${ lastNameFocus && lastName && !validlastName ? 'inline' : 'hidden' } absolute bottom-0 left-0 w-full h-auto text-[14px] p-[10px] text-center text-[white] rounded-[8px] bg-[black]`} >
                    <i className="fa-solid fa-exclamation text-[red] text-[19px]  mr-[10px]"></i>
                    Must begin with a letter.<br />
                     3 to 24 characters.<br />                     
                     only Letters allowed.

                    </p>
                </div>

              </div>
              <div className='w-full'>
              <span className='text-[#45f3ff] text-[13px]'>location
              <span className={validlocation ? 'inline ml-[10px]' : 'hidden'}>
                    <i className="fa-solid fa-check text-[#39d863] text-[20px]"></i>
                  </span>
                  <span className={validlocation || !location ? 'hidden' : 'inline ml-[10px]'}>
                     <i className="fa-solid fa-xmark text-[red] text-[20px]"></i>
                  </span>
              </span>
                    <input 
                    autoComplete='off'  
                    type={'text'}                 
                    required
                    aria-invalid={validlocation ? "false" : "true"}  
                    className='w-[100%] h-[40px] border border-gray-300 rounded-md outline-none p-[15px] bg-[#e9fffe] text-[black]'
                    onChange={(e)=> setlocation(e.target.value)}
                    onFocus={() => setlocationFocus(true)}
                    onBlur={() => setlocationFocus(false)}  
                    />
                   <p className={` ${ locationFocus && location && !validlocation ? 'inline' : 'hidden' } absolute bottom-0 left-0 w-full h-auto text-[14px] p-[10px] text-center text-[white] rounded-[8px] bg-[black]`} >
                    <i className="fa-solid fa-exclamation text-[red] text-[19px]  mr-[10px]"></i>
                    Must begin with a letter.<br />
                     3 to 24 characters.<br />                     
                     only Letters allowed.

                    </p>
              </div>
              <div onClick={() => dispatch(cropProfileopencloseEngine(true))}  className='w-full h-auto cursor-pointer'>
                <div className=' relative w-full h-[50px] mt-[10px] border border-[#93fff2] rounded-[7px] flex flex-row items-center justify-center'>
                {
                  profileimgname ?                  
                  <BsFillCloudCheckFill className=' absolute right-[17px] text-sky-400 hover:text-yellow-300 cursor-pointer text-[30px] ml-[5px]'/>
                  : <i  className=" absolute right-[17px]  fa-solid fa-cloud-arrow-up text-[orange] hover:text-yellow-300 cursor-pointer text-[25px] ml-[5px]"></i>
                }
                
                    <div  className='flex flex-row items-center justify-center'>
                    <i className="fa-solid fa-images text-[25px] text-emerald-500 hover:text-green-400 mr-[10px] ml-[5px]"></i>
                    <span>{ profileimgname ?  profileimgname.slice(0,25)  : 'Choose img' }</span>
                    </div>
                    
                      <input 
                       type='file'
                       accept="image/*"
                        ref={FileRef}   
                        onChange={(e)=>setfile(e.target.files)}           
                       className=' absolute  bottom-0 left-0 hidden '
                      />
                </div>
              </div>
              <div className='w-full'>
              <span className='text-[#45f3ff] text-[13px]'>job
              <span className={validjob ? 'inline ml-[10px]' : 'hidden'}>
                    <i className="fa-solid fa-check text-[#39d863] text-[20px]"></i>
                  </span>
                  <span className={validjob || !job ? 'hidden' : 'inline ml-[10px]'}>
                     <i className="fa-solid fa-xmark text-[red] text-[20px]"></i>
                  </span>
              </span>
                    <input 
                    autoComplete='off'  
                    type={'text'}                 
                    required
                    aria-invalid={validjob ? "false" : "true"}  
                    className='w-[100%] h-[40px] border border-gray-300 rounded-md outline-none p-[15px] bg-[#e9fffe] text-[black]'
                    onChange={(e)=> setjob(e.target.value)}
                    onFocus={() => setjobFocus(true)}
                    onBlur={() => setjobFocus(false)}  
                    />
                   <p className={` ${ jobFocus && job && !validjob ? 'inline' : 'hidden' } absolute bottom-0 left-0 w-full h-auto text-[14px] p-[10px] text-center text-[white] rounded-[8px] bg-[black]`} >
                    <i className="fa-solid fa-exclamation text-[red] text-[19px]  mr-[10px]"></i>
                    Must begin with a letter.<br />
                     3 to 24 characters.<br />                     
                     only Letters allowed.

                    </p>
              </div>
                


                <div className=' mt-[7px]'>
                   <span className='text-[#45f3ff] text-[13px]'>Email
                   <span className={validemail  ? 'inline ml-[10px]' : 'hidden'}>
                    <i className="fa-solid fa-check text-[#39d863] text-[20px]"></i>
                  </span>
                  <span className={validemail  ||  !email  ? 'hidden' : 'inline ml-[10px]'}>
                     <i className="fa-solid fa-xmark text-[red] text-[20px]"></i>
                  </span>
                   </span>
                   <input      
                    autoComplete='off'              
                    className='   w-full h-[40px] rounded-md outline-none p-[15px] bg-[#e9fffe] text-[black]'
                    type="email"
                    required
                    aria-invalid={validemail ? "false" : "true"}    
                    aria-describedby="uidnote" 
                    onChange={(e)=> setemail(e.target.value.toLowerCase())}
                    onFocus={() => setemailFocus(true)}
                    onBlur={() => setemailFocus(false)} 
                   />
                                     <p className={` ${ emailFocus && email && !validemail   ? 'inline' : 'hidden' } absolute bottom-0 left-0 w-full h-auto text-[14px] p-[10px] text-center text-[white] rounded-[8px] bg-[black]`} >
                    <i className="fa-solid fa-exclamation text-[red] text-[19px]  mr-[10px]"></i>
                    Must begin Finish @gmail.com<br />
                     6 to 50 characters.<br />    
                      Please Fill ony Lower Case Letter                 
                     
                    </p>
                </div>
                <div className='mt-[7px]'>
                   <span className='text-[#45f3ff] text-[13px]'>password
                   <span className={validpassword ? 'inline ml-[10px]' : 'hidden'}>
                    <i className="fa-solid fa-check text-[#39d863] text-[20px]"></i>
                  </span>
                  <span className={validpassword || !password ? 'hidden' : 'inline ml-[10px]'}>
                     <i className="fa-solid fa-xmark text-[red] text-[20px]"></i>
                  </span>
                  { eye ? <i onClick={() => seteye(false)} className="fa-solid fa-eye-slash  text-black ml-[10px] text-[15px] mt-[5px] cursor-pointer"></i> 
                  : <i onClick={() => seteye(true)} className="fa-solid fa-eye text-black ml-[10px] text-[15px] mt-[5px] cursor-pointer"></i>
                    }
                  
                   </span>
                   <input  
                    autoComplete='off'                   
                    className='   w-full h-[40px] rounded-md outline-none p-[15px] bg-[#e9fffe] text-[black]'
                    type={ eye ? "text" :  "password"}
                    required
                    aria-invalid={validemail ? "false" : "true"}    
                    aria-describedby="uidnote" 
                    onChange={(e)=> setpassword(e.target.value)}
                    onFocus={() => setpasswordFocus(true)}
                    onBlur={() => setpasswordFocus(false)} 
                   />
                                           <p className={` ${ passwordFocus && password && !validpassword ? 'inline' : 'hidden' } absolute bottom-0 left-0 w-full h-auto text-[14px] p-[10px] text-center text-[white] rounded-[8px] bg-[black]`} >
                    <i className="fa-solid fa-exclamation text-[red] text-[19px]  mr-[10px]"></i>
                    Must include uppercase and lowercase letters and number <br />
                     8 to 24 characters.<br /> 
                     
                    </p>
                </div>
               
                
                  <div  onClick={sendFile}  className=' cursor-pointer select-none w-full min-h-[40px]  rounded-md mt-[15px] bg-cyan-500  font-semibold  flex flex-col items-center justify-center '>                
                  R e g i s t e r s
                  </div>
                 
                
                <Link to='/Login'>
                <div className='text-[#b2f8fd] text-[12px] mt-[10px] flex flex-col hover:underline cursor-pointer'>Already have account? 
                <span>Login here</span>
                </div>
                </Link>
                <div className='text-[15px] text-red-600 text-center mt-[10px]'>{err ? err : ''}</div>
                <span className={`text-[#ff3300] text-center text-[14px] ${ messagesuccessfail ? 'inline' : ' hidden' } `}>R e g i s t e r F a i l e d</span>
                <span className='text-[orange] text-center text-[14px]  '>{ messagesuccessfail ? messagesuccessfail : '' }</span>
            </form>
        </div> 
        </div>       
    </div>
    </>
  )
}

export default Register