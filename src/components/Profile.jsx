import { Button } from "@mui/material"
import React, { useState , useEffect } from "react";
import Slider from '@mui/material/Slider';
import Cropper from "react-easy-crop"
import getCroppedImg  from '../utils/cropimage'
import { dataURLtoFile } from "../utils/dataUrltoFile";
import { cropProfileopencloseEngine , profileimgnameEngine } from '../setting/ActionSlice'
import { cropProfileopencloseC , profileimgnameC  } from '../setting/ActionSlice'
import { useSelector , useDispatch } from 'react-redux'
const Profile = () => {
   const useRef = React.useRef()
   const dispatch = useDispatch()


   const openclose = useSelector(cropProfileopencloseC)  
  
  const [realimg , setrealimg] = useState()  
  const [  MessageErr  , setMessageErr] = React.useState("")
  const [ image , setiamge ] = React.useState(null)
  const [ crop , setCrop ] = React.useState({x: 0 , y: 0})
  const [ zoom , setZoom ] = React.useState(1)
  const [ cropArea , setCropArea ] = React.useState(null)
  const [ canClose , setcanClose] = useState(false)
  const [ success , setsuccess ] = useState('')


const handleChooseimage = () => {
  setMessageErr('')
  useRef.current.click()
}

const handleSelectImg = (e) => {
  if(e.target.files && e.target.files.length > 0){
    setrealimg(e.target.files)

    
    const Reader = new FileReader()
    Reader.readAsDataURL(e.target.files[0])
    Reader.addEventListener('load', () => {
      setiamge(Reader.result)
    })
  }
}

const onCropComplete = (croppedAreaPercentage , croppedAreaPixels ) => {
  setCropArea(croppedAreaPixels)
}
const onUpload = async ()  => { 
  if(realimg){
    
    dispatch(profileimgnameEngine(realimg[0].name))
  }
  if (!image)
  return setMessageErr(    
    "Please select an image!",    
  );
  const canvas = await getCroppedImg(image, cropArea);
  const canvasDataUrl = canvas.toDataURL(realimg[0].type);
  const convertedUrlToFile = dataURLtoFile(
    canvasDataUrl,realimg[0].name);
 
try {
  const formdata = new FormData();
  formdata.append("picture", convertedUrlToFile);



  const res = await fetch(`https://grapesocialmedia.onrender.com/upload`, {
    method: "POST",
    body: formdata,
  });

  const res2 = await res.json();
if(res2.message.includes('setimgsuccess')){
  setsuccess(' Upload Success...')
  dispatch(cropProfileopencloseEngine(false))
  setcanClose(true)
}

} catch (err) {
  console.warn(err);
}

}

const handleclose = () => {   
    dispatch(cropProfileopencloseEngine(false))
}


  return (
    <div className={` absolute w-full h-[100%] bg-[#000000e7] z-10 overflow-hidden ${openclose ? '' : 'hidden'}  `}>
      <div className={` absolute inset-0 top-5 w-[300px] h-aut0 m-auto animate-slidedown2 ${MessageErr ? '' : 'hidden'}`}>
          <span className="o px-[30px] py-[10px] bg-orange-500 rounded animate-pulse  ">{MessageErr}</span>
      </div>
      
        <div className="  w-[80%] h-[80%] m-auto  mt-[40px]  ">
          <div className={` justify-center text-[40px] text-emerald-400 absolute  z-50  animate-slideleft3  ${success ? '' : 'hidden'}`}>{success}</div>
        <div className={`${image ? '' :  'hidden'}  w-[100%] h-[100%]   `}>   
        <Cropper
								image={image}
								crop={crop}
								zoom={zoom}
								aspect={1}
								onCropChange={setCrop}
								onZoomChange={setZoom}
								onCropComplete={onCropComplete}
							/>          
           </div>    
        </div>
        <div className=" w-[40%] h-[135px] flex flex-col m-auto  translate-y-[-65px] lg:translate-y-[0px]  ">
        <div className=" mt-[20px]">
        <Slider
            size="small"            
            aria-label="Small"
            min={1}             
            setp={0.1}
            value={zoom}
            onChange={(e, zoom) => setZoom(zoom)}
          />
        </div>
          <div className="w-full h-[45px] flex flex-row items-center justify-center">
            <div className="mr-[50px]">    
            <input 
              type='file'
              accept="image/*"
              ref={useRef}
              onChange={ (e) => handleSelectImg(e)}
              className=' absolute hidden bottom-0 right-0 '
            /> 
            <Button onClick={handleChooseimage} variant="contained"   >
              <span className=" hidden lg:inline" >Choose</span>
             <i className="fa-solid fa-images text-[25px] text-emerald-500 hover:text-green-400 mr-[10px] ml-[5px]"></i>
            </Button>
            </div>   
            <Button onClick={onUpload} variant="contained" color="secondary">
              <span className=" hidden lg:inline">Upload</span>             
             <i className="  fa-solid fa-cloud-arrow-up text-[orange] hover:text-yellow-300 cursor-pointer text-[25px] ml-[5px]"></i>
            </Button>
            </div>   
            
        </div>
        <i onClick={handleclose}  className="fa-solid fa-x  absolute top-[15px] right-[15px] py-[10px] px-[12px] bg-[#e1fffb] text-black rounded-full hover:bg-[#c9fff8] cursor-pointer"></i>
    </div>
  )
}

export default Profile