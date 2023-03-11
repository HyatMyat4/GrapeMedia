import { BsXLg } from "react-icons/bs";
import { BiWorld } from "react-icons/bi";
import { AiFillCaretDown } from "react-icons/ai";
import { PostCreateC , userdataC , updatePost } from '../setting/ActionSlice'
import { PostCreateEngine , onUpdateEngine , onUpdateC , daynightModeC } from '../setting/ActionSlice'
import { useSelector , useDispatch } from "react-redux";
import { useRef , useState , useEffect  } from "react";

import Loding from "./loding/Loding";
import jwt_decode from "jwt-decode"
const Postcreate = ({getFeedPost ,updatedata , setupdatedata}) => {
    const dispatch = useDispatch()
    const userRef = useRef()

    const userdata =useSelector(userdataC) 
    const onUpdatefake =useSelector(onUpdateC) 
    const daynight =useSelector(daynightModeC) 
    const PostCreate=useSelector(PostCreateC)

    const token = localStorage.getItem('Token')
    const   {id} = jwt_decode(token)   
    const userId = id     
    
    
    const [image , setimage] = useState()
    const [success , setsuccess] = useState(false)
    const [description , setdescription ] =useState('')
    const [picturePath , setpicturePath ] =useState('')
    const [url , seturl ] = useState('')
    const [err , seterr ] =useState('')
    const [AllData , setAllData ] =useState({})
    const [remove , setremove ] =useState(true)
    const [onupdate , setonupdate ] =useState(false)
    const [loding , setloding ] =useState(false)


    const handleRef = () => {
        userRef.current.click();
    }


const uploadimage = async () => {
  if(!image){
    return
  }
  if(image){
    setpicturePath(image[0].name) 
  }

    try {
        const formdata = new FormData();
        Object.keys(image).forEach(key => {
            formdata.append("picture" , image.item(key))
          })
      
      
      
        const res = await fetch( `https://grapesocialmedia.onrender.com/upload`, {
          method: "POST",
          body: formdata,
        });
      
        const res2 = await res.json();

   
      if(res2.message.includes('setimgsuccess')){
        seturl(`https://grapesocialmedia.onrender.com/img/${image[0]?.name}`)
        setsuccess(true);       
      }else{
        setsuccess();
      }
      
      } catch (err) {
      
        console.warn(err);
      }
}

useEffect(() => {
    uploadimage()   

    
},[image])

useEffect(() => {
  if(onUpdatefake === true ){
  setdescription(updatedata.dis)  
  setpicturePath(updatedata.picturepath) 
  if(!updatedata.dis){
  return
  } 

  if(updatedata.picturepath.length && onUpdatefake === true  ){
setonupdate(true)
seturl(`https://grapesocialmedia.onrender.com/img/${updatedata.picturepath}`)
setsuccess(true);
dispatch(onUpdateEngine(false))
  }  
}
},[PostCreate])

const uploaddata = () => {
  setAllData({ userId  , picturePath  , description  })
}


useEffect(() => {
    uploaddata()
},[image , description , picturePath , userId  ])



   

    const Post = async () => {     

      if( !userId && !picturePath && !description){
        return seterr('! picture && description are required')
      }     
      
        try{         
          if(userId  && picturePath  && description){
   
            const saveUser = await fetch(`https://grapesocialmedia.onrender.com/posts/createPost` ,
            {
              method: "POST",              
              headers: { Authorization : `Bearer ${token}` , "Content-Type": "application/json" },           
              body:JSON.stringify(AllData),
            }
            )
            const save = await saveUser.json()
            dispatch(PostCreateEngine(false))
            
              getFeedPost()
              setdescription('')
              setpicturePath('')
              setimage()
    
          }   
       
        }catch (err) {
          console.warn(err);
        }
   
     
    }

    const onclose = () => {
      if(remove !== false && image){
        seterr("PLease Remove image")
        setInterval(function () {seterr('')}, 10000);
        return
        
      }
      setdescription('')    
      setupdatedata({})  
      dispatch(PostCreateEngine(false))
      dispatch(onUpdateEngine(false))
      setsuccess(false);
      setremove(true)
      seturl('')
      setpicturePath('')
    }
    const handleimagedelete = async () => {
       const picturepath ={ picturepath : updatedata.picturepath ?  updatedata.picturepath : image[0]?.name }
      const response = await fetch(`https://grapesocialmedia.onrender.com/deletePhoto`,

      {
        method: "DELETE",               
        headers: { "Content-Type": "application/json"  },   
        body:JSON.stringify(picturepath),         
             
      });
   
       const message = await response.json()
       seterr(message.message)
       setInterval(function () {seterr('')}, 9000); 
      setpicturePath('')
      setimage()
      seturl('')
      setremove(false)
      setonupdate(false)
    }

    const handlePostUpdate = async (e) => {     
     if(!updatedata){      
      return
     }
     setloding(true)
     const Editdata = {postid:updatedata.postid , picturepath:picturePath , dis:description  }
     
      const response = await fetch(`https://grapesocialmedia.onrender.com/posts/UpdatePost`,{              
              method: "PATCH",              
              headers: { Authorization : `Bearer ${token}` , "Content-Type": "application/json" },           
              body:JSON.stringify(Editdata),         
      });
      const data = await response.json()
     
      setloding(false)
    
        dispatch(updatePost(data))
        setonupdate(false)
        dispatch(PostCreateEngine(false))        
        setdescription('')        
        dispatch(onUpdateEngine(false))
        setpicturePath('')
        setimage()
        setsuccess(false);
      
    }

  return (
    <div id="input" className={`${PostCreate    ? '' : " hidden" }  w-full h-[full] absolute inset-0 z-20 ${daynight ? 'bg-[#0707075b]' : 'bg-[#ffffff1e]' } flex flex-col items-center justify-center overflow-scroll pb-[20px] pt-[80px]  `}>
                <div className={`  absolute ${loding ? '' : 'hidden'}`}>
                <Loding/>
                </div>
       <div className="text-white w-full md:w-[700px] h-[auto] bg-[#232323] rounded-[8px]">
           <div className=" relative w-full h-[60px] border-b border-gray-500 flex flex-row items-center justify-center">
                <span className="text-[20px] select-none">{err ? <span className="text-[orange]">{err}</span>  : updatedata?.postid? 'Update Post' :'Create Post'  }
          
                </span>
                <BsXLg onClick={onclose} className=" absolute right-[15px] text-[30px] p-[5px] text-black bg-[#ededed] hover:bg-[#ffffff] cursor-pointer  rounded-full"/>
           </div>
           <div className="w-full h-[65px] flex flex-row items-center justify-start">
                <div className="w-[50px] h-[50px] relative  rounded-full overflow-hidden ml-[14px] md:ml-[15px] mr-[10px] ">
                    <img
                    src={`https://grapesocialmedia.onrender.com/img/${userdata?.picturePath}`}
                    className=" select-none absolute w-[auto] h-[auto]"
                    />
                </div>
                <div className=" cursor-pointer">
                    <span className="text-[16px]">{userdata.firstName} {userdata.lastName}</span>
                    <span className="flex flex-row items-center px-[3px] py-[1px]  bg-[#59595991] rounded-[3px]  ">
                        <BiWorld className="text-[20px] mr-[2px]"/>
                         <span className="text-[12px] translate-y-[1px]">Public</span>
                        <AiFillCaretDown className="text-[11px] translate-y-[2px]"/>
                        </span>
                </div>           
           </div>
           <div className="w-full h-[auto] ">
           <textarea
                 id="input"
                 className='w-full h-[auto]  p-[18px] outline-none m-auto  text-[18px] bg-transparent  '
                 placeholder='Create a plubic post...'
                 onChange={(e) => setdescription(e.target.value)}              
                 value={description}
                >
             
                </textarea>
           </div>
           
            <div className="w-[90%] max-h-[700px] m-auto rounded overflow-hidden select-none flex flex-row items-center justify-center">
            <input 
                  type="file"
                  id="myfiles"
                   accept="image/*" 
                   multiple
                   ref={userRef}
                   onChange={(e) => setimage(e.target.files)}
                   className="absolute text-[2px] left-0  hidden"
                />
                {
                       
                    success === true &&  url    ? 
                    
                    <div className="w-full h-auto relative">
                    <BsXLg onClick={handleimagedelete} className=" absolute right-[0px] text-[30px] p-[5px] text-white bg-[#0000004c] hover:bg-[black] cursor-pointer  rounded-full"/>
                  
                  <img 
                   src={`${success === true || onupdate ? url : '' }`}
                  className="w-full h-auto"                   
                  />
                               
                  </div>
                  
                 :
                   <i onClick={handleRef} className="fa-solid fa-images text-[30px] cursor-pointer text-emerald-500 hover:text-green-400 mr-[10px] ml-[5px] mb-[20px] "></i>
                }
                
         
            </div>
                {updatedata.postid 
                ?
                 <div onClick={handlePostUpdate} 
                 className=" select-none w-[90%] h-[40px] cursor-pointer rounded-[5px] bg-sky-500 text-[20px]  mt-[15px] mb-[25px] m-auto flex flex-row items-center justify-center">
                 Post Update  </div>
                :
                <div onClick={Post} 
                className=" select-none w-[90%] h-[40px] cursor-pointer rounded-[5px] bg-sky-500 text-[20px]  mt-[15px] mb-[25px] m-auto flex flex-row items-center justify-center">
                    Post  </div>
          
                }
            
            
          
        </div>
    </div>
  )
}

export default Postcreate