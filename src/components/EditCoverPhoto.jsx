import { Button } from "@mui/material"
import React, { useState } from "react";
import Slider from '@mui/material/Slider';
import Cropper from "react-easy-crop"
import getCroppedImg  from '../utils/cropimage'
import { dataURLtoFile } from "../utils/dataUrltoFile";
import {  profileimgnameEngine } from '../setting/ActionSlice'

import { useSelector , useDispatch } from 'react-redux'
import { userdataC } from "../setting/ActionSlice"
import  { userdataEngine }  from '../setting/ActionSlice';
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const EditCoverPhoto = () => {
    const navagate = useNavigate()
    const dispatch = useDispatch()   
    const useRef = React.useRef() 

    const userdata =useSelector(userdataC) 

    const [realimg , setrealimg] = useState()
    const [ image , setiamge ] = React.useState(null)
    const [ crop , setCrop ] = React.useState({x: 0 , y: 0})
    const [ zoom , setZoom ] = React.useState(1)
    const [ cropArea , setCropArea ] = React.useState(null)
    const [ success , setsuccess ] = useState('')
    const [  MessageErr  , setMessageErr] = React.useState("")


    const id = userdata?._id     

    
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
  const imageid = uuidv4()  
   if(realimg){
     
     dispatch(profileimgnameEngine(`${imageid}.${realimg[0].type.slice(6)}`))
   }
   if (!image)
   return setMessageErr(    
     "Please select an image!",    
   );
   const canvas = await getCroppedImg(image, cropArea);
   const canvasDataUrl = canvas.toDataURL(realimg[0].type);
   const convertedUrlToFile = dataURLtoFile(
     canvasDataUrl,`${imageid}.${realimg[0].type.slice(6)}`);
  
  
 
 
 
 try {
   const formdata = new FormData();
   formdata.append("picture", convertedUrlToFile);   
   for (let value in userdata) {
    formdata.append(value, userdata[value]);
  }
  formdata.delete('backgrounpicture');
  formdata.append("backgrounpicture", `${imageid}.${realimg[0].type.slice(6)}`);
 
 
   const res = await fetch(`https://grapesocialmedia.onrender.com/users/${id}`, {
     method: "PATCH",
     body: formdata,
   }); 
   const res2 = await res.json();  
    if(res2.backgrounpicture){
        dispatch(userdataEngine(res2))
        navagate('/Profile')   
    } 
 } catch (err) { 
   console.warn(err);
 }}
 
 const handleclose = () => {  
     navagate('/Profile')
 }
 
 
  return (
    <div className={` absolute w-full h-[92%] bg-[#000000e7] z-10 overflow-hidden   `}>
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
								aspect={2}
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

export default EditCoverPhoto