import React from 'react'
import { useState , useRef , useEffect } from 'react'
import { useSelector } from 'react-redux'
import { userdataC ,  singleGroupdataEngin } from '../setting/ActionSlice'
import { useDispatch } from 'react-redux';
import UserMessage from './SingleMessage/UserMessage';
import FriendsMessage from './SingleMessage/FriendsMessage';
import MessageFooterinput from './MessageFooterinput';
const MessageSendBox = ({singledata , userimg , token , daynight , fullscreen , getsingleGroup}) => {
 const dispatch = useDispatch()


  const messagesEndRef = useRef(null);
  const FileRef =  useRef()
  const userdata =  useSelector(userdataC)
  
  const [ Messagetext , setMessagetext ] = useState('')
  const [ imagefile , setimagefile ] = useState()
  const [ picturePath , setpicturePath ] = useState()
  const [ AllData , setAllData ] = useState()
  const [ trustimage , srttrustimage ] = useState(false)
  const [ URL , setURL ] = useState()
  const [ link , setlink ] = useState()
  const [ ctrlink , setctrlink ] = useState(false)


  const GroupId = singledata?._id
  const userId = userdata?._id

  const ClickFile = () => {
    FileRef.current.click()
  }


  const sendMessage = async () => {
    if(!Messagetext && !link && !picturePath  ){     
       return
    }
    const response = await fetch(`https://grapesocialmedia.onrender.com/Message/newsingleMessage`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body:JSON.stringify(AllData),
    })
    const data = await response.json()
    setctrlink(false)
    setlink()
     if(data?._id) {
      setMessagetext('')
      setpicturePath('')
      setURL('')
      setimagefile('')
      srttrustimage(false)
     }    
    dispatch(singleGroupdataEngin(data))
    
  }



  

  const uploadimage = async () => {
    if(!imagefile) return       
    if(!GroupId || !userId ) return
    setAllData({message:Messagetext , GroupId: GroupId , userId:userId , link:link , img:imagefile[0].name  })
    try{
      const formdata = new FormData();
      Object.keys(imagefile).forEach(key => {
          formdata.append("picture" , imagefile.item(key))
        })
        const response = await fetch( `https://grapesocialmedia.onrender.com/upload`, {
          method: "POST",
          body: formdata,
        });
        const data = await response.json();
        if(data?.message.includes('setimgsuccess')){        
          setURL(`https://grapesocialmedia.onrender.com/img/${imagefile[0].name}`)
          srttrustimage(true)         

        }
    } catch (err) {
      console.warn(err)
    }
   
  }  

  const handleimagedelete = async () => {
    const picturepath ={ picturepath : picturePath }
   const response = await fetch(`https://grapesocialmedia.onrender.com/deletePhoto`,{
     method: "DELETE",               
     headers: { "Content-Type": "application/json"  },   
     body:JSON.stringify(picturepath),         
          
   });

    const message = await response.json()
    setpicturePath('')
    setURL('')
    setimagefile('')
    srttrustimage(false)
  
  
 }

 useEffect(() => {
  if(!GroupId || !userId ) return
 
  setAllData({message:Messagetext , GroupId: GroupId , userId:userId , link:link , img:picturePath  })
  }, [Messagetext , imagefile , link ])

  
  useEffect(() => {
   if(!imagefile) return   
   setpicturePath(imagefile[0].name)
   uploadimage()
   
  },[imagefile])



  
  
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [singledata]);



  useEffect(() => {
    scrollToBottom()
  },[])

  //userjob
 //userlocation


  return (    
    <div id='cutomscoll'  className={`w-[100%] ${fullscreen? 'w-full' : '1xs:w-[350px]' }    h-[92%] overflow-y-scroll  select-none    `}>     
        
        <div className='w-[120px] h-auto rounded-full m-auto flex flex-col items-center'>
          <img
          loading='lazy'
          className={`w-full h-auto rounded-full ${singledata?.FriendsPicturePath ? '' : 'hidden'}`}
          src={  singledata?.userId === userId  ? `${userimg}${singledata?.FriendsPicturePath}` : `${userimg}${singledata?.userPicturePath}` }
          />
          { singledata?.userId === userId ?
            <span className='text-[20px] '>{singledata?.friendsfirstName}{singledata?.friendslastName}</span>
        :
        <span className='text-[20px] '>{singledata?.userfirstName}{singledata?.userlastName}</span>
        }          
           <span className={`text-[15px] text-gray-400  ${singledata?.FriendsPicturePath ? '' : 'hidden'} `}>
           <i className="fa-solid fa-house mr-[3px] text-emerald-500 "></i>
            { singledata?.userId === userId ? singledata?.friendslocation : singledata?.userlocation}</span>
           <span className={`text-[13px] text-gray-400 text-center ${singledata?.FriendsPicturePath ? '' : 'hidden'} `}>
           <i className="fa-solid fa-briefcase text-[15px] mr-[5px] text-orange-700"></i>
            { singledata?.userId === userId ? singledata?.friendsjob : singledata?.userjob}</span>
        </div>
        <>
        {singledata?.Message?.length   ? singledata.Message.map(data => (
           data.userId === userId  ?
             <UserMessage 
             data={data}
             userimg={userimg}
             />
          :  
           
           <FriendsMessage
            data={data}
            userimg={userimg}
           />          
        ))  
        
            : 
        ''
      } 
      <div ref={messagesEndRef} />
      </>
      <MessageFooterinput 
        getsingleGroup={getsingleGroup}
        trustimage={trustimage}
        handleimagedelete={handleimagedelete}
        Messagetext={Messagetext}
        ClickFile={ClickFile}
        FileRef={FileRef}
        setimagefile={setimagefile}
        ctrlink={ctrlink}
        setctrlink={setctrlink}
        link={link}
        setlink={setlink}
        setMessagetext={setMessagetext}
        daynight={daynight}
        sendMessage={sendMessage}
        URL={URL}
      />    
    </div>
  )
}

export default MessageSendBox