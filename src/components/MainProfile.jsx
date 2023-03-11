import React from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import FakePost from "./FakePost";
import { useGetUserPostQuery } from "../api/PostApiSLice";
import { DotPulse } from "@uiball/loaders";
import Header from "../Header/HeaderMain";
import {
  userdataC,
  FriendsC,
  daynightModeC,
  handleOpenEngin,
  handleOpenC,
} from "../setting/ActionSlice";
const MainProfile = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("Token");
  const { id } = jwt_decode(token);

  const userdata = useSelector(userdataC);
  const friendsdata = useSelector(FriendsC);
  const daynight = useSelector(daynightModeC);
  const handleOpen = useSelector(handleOpenC);

  const [usepost, setuserpost] = useState();
  const [Enter, setEnter] = useState(false);
  const [comment, setcomment] = useState("");
  const [handleid, sethandleid] = useState("");

  const userId = userdata?._id;
  const bgimage = `https://grapesocialmedia.onrender.com/img/${userdata?.backgrounpicture}`;
  const userimg = `https://grapesocialmedia.onrender.com/img/${userdata?.picturePath}`;

  //const {
  // data,
  // isLoading,
  //  isSuccess,
  //  error
  // } = useGetUserPostQuery(id)

  const getUserPost = async () => {
    const response = await fetch(
      `https://grapesocialmedia.onrender.com/posts/${id}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setuserpost(data);
  };

  useEffect(() => {
    getUserPost();
  }, []);

  // For Reactiona to work
  const handleMouseEnter = (e) => {
    setEnter(true);
  };

  // Comment Bar open
  const handleCommentOpen = (e) => {
    const id = e.target.id;
    sethandleid(id);
    dispatch(handleOpenEngin(true));
  };
  // Comment Bar Close
  const handleCommentClose = (e) => {
    sethandleid("");
    dispatch(handleOpenEngin(false));
  };

  return (
    <div id='cutomscoll'  className=" w-full h-[100vh] overflow-y-scroll  ">
      <div className="w-full h-[8vh]">
      <Header />
      </div>
      <div className="relative max-w-[1000px]   h-[400px] m-auto  rounded-[7px]">
        <div
          className={` w-[full]   h-[400px] ${
            userdata?.backgrounpicture ? "" : "bg-gray-200 "
          }   overflow-hidden  rounded-[7px]`}
        >
          <div
            className="w-full h-[100%] bg-cover bg-center"
            style={{ backgroundImage: `url(${bgimage})` }}
          ></div>
        </div>
        <div className=" group absolute  z-10   bottom-[-90px] left-[20px] w-[200px] h-[200px]  rounded-full border-[3px] border-[black] overflow-hidden ">
          <img
            src={userimg}
            className=" w-full h-full object-cover rounded-full select-none "
          />
          <div className=" cursor-pointer group-hover:flex hidden animate-slideup42   absolute bottom-0 w-full h-[45%] bg-[#00000056] z-20  flex-row  items-start justify-center">
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button
                    variant="contained"
                    color="primary"
                    {...bindTrigger(popupState)}
                  >
                    <CameraAltIcon />
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem id="fontbt2" onClick={popupState.close}>
                      Dowload{" "}
                      <i className="fa-solid fa-download ml-[14px] text-sky-500 text-[20px] hover:text-sky-600 "></i>
                    </MenuItem>
                    <MenuItem id="fontbt2" onClick={popupState.close}>
                      Upload{" "}
                      <i className="fa-solid fa-cloud-arrow-up ml-[20px] text-[orange] text-[20px] hover:text-[#ffa600ed] "></i>
                    </MenuItem>
                    <MenuItem id="fontbt2" onClick={popupState.close}>
                      Delete{" "}
                      <i className="fa-solid fa-trash ml-[24px] text-[#ff003c] text-[20px] hover:text-[#ff004c] "></i>
                    </MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </div>
        </div>
        <div className="ml-[230px] hidden  2lg:flex  flex-row  items-center justify-between">
          <div className="">
            <Link to="/BodyRoute">
              <span className=" text-[25px] hover:underline ">
                {userdata?.firstName} {userdata?.lastName}
              </span>
            </Link>
            <div className="text-[15px] text-[#b5b5b5] hover:underline cursor-pointer">
              {friendsdata?.length} Friends
            </div>
          </div>
          <div className=" select-none flex flex-col mr-[5px]">
            <Link to="/EditCoverPhoto">
              <div className="py-[7px] px-[15px] bg-[#313131d3] rounded hover:bg-[#202020d3] cursor-pointer mt-[8px]">
                <i className="fa-solid fa-pen-fancy mr-[5px] text-[18px] text-[#49e6d9] "></i>
                <span>Edit Profile</span>
              </div>
            </Link>
            <div className="py-[7px] px-[15px] bg-[#136de4] rounded hover:bg-[#1075f9] cursor-pointer mt-[8px]">
              <i className="fa-solid fa-plus mr-[5px] text-[18px] text-[#49e6d9]"></i>
              <span>Add To story</span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1000px]   h-[auto] m-auto  flex flex-col  lg:flex-row items-start justify-center lg:justify-between mt-[100px]">
        <div className=" w-[100%] lg:w-[43%] h-[auto] sticky lg:top-0  ">
          <div className="w-[100%] h-auto  bg-[black] rounded-[5px]">
            <div className="w-[90%] h-[40px] m-auto hidden 2lg:flex flex-row items-center">
              Intro
            </div>
            <div className=" 2lg:hidden flex flex-col items-center justify-center">
              <span className=" text-[25px] ">
                {userdata?.firstName} {userdata?.lastName}{" "}
              </span>
              <Link to="/EditCoverPhoto">
                <div className=" select-none py-[7px] px-[15px] bg-[#313131d3] rounded hover:bg-[#202020d3] cursor-pointer mt-[8px]">
                  <i className="fa-solid fa-pen-fancy mr-[5px] text-[18px] text-[#49e6d9] "></i>
                  <span>Edit Profile</span>
                </div>
              </Link>
              <div className=" select-none py-[7px] px-[15px] bg-[#136de4] rounded hover:bg-[#1075f9] cursor-pointer mt-[8px]">
                <i className="fa-solid fa-plus mr-[5px] text-[18px] text-[#49e6d9]"></i>
                <span>Add To story</span>
              </div>
            </div>
            <div className="w-[90%] h-[40px] flex flex-row items-center justify-center   m-auto  p-[25px] ">
              Dream Car Apolo IE
            </div>
            <div className="w-[90%] h-[40px] flex flex-row items-center justify-center   m-auto bg-[#151515e1] cursor-pointer hover:bg-[#505050e2] rounded-[5px]">
              Edit Bio
            </div>
            <div className="w-[90%] h-[40px] flex flex-row items-center justify-start  m-auto  ">
              <i className="fa-solid fa-house text-[20px] mr-[10px] text-sky-400"></i>
              <span>{userdata?.location}</span>
            </div>
            <div className="w-[90%] h-[40px] flex flex-row items-center justify-start  m-auto  ">
              <i className="fa-solid fa-heart text-[20px] mr-[10px] text-red-600"></i>

              <span>Single</span>
            </div>
            <div className="w-[90%] h-[40px] flex flex-row items-center justify-start  m-auto  ">
              <i className="fa-solid fa-briefcase text-[20px] mr-[10px] text-orange-700"></i>

              <span>{userdata?.job}</span>
            </div>
          </div>
          <div className="w-[100%] h-auto   rounded-[5px]  bg-[black] py-[10px] mt-[10px]  ">
            <div className="w-[95%] h-[50px] mt-[10px] flex flex-row items-center justify-between cursor-pointer m-auto">
              <div className=" flex flex-row items-center ">
                <i className="fa-brands fa-facebook text-[30px] text-sky-500 ml-[5px] mr-[10px]"></i>
                <div className="flex flex-col">
                  <span className="text-[13px] hover:underline cursor-pointer">
                    Face Book
                  </span>
                  <span className="text-[12px] text-gray-400 font-normal">
                    Social Media
                  </span>
                </div>
              </div>
              <i className="fa-solid fa-pen-fancy hover:text-sky-500"></i>
            </div>
            <div className="w-[95%] h-[50px] m-auto flex flex-row items-center justify-between cursor-pointer">
              <div className="flex flex-row items-center">
                <i className="fa-brands fa-twitter text-[30px] text-sky-500 ml-[5px] mr-[10px]"></i>
                <div className="flex flex-col">
                  <span className="text-[17px] hover:underline cursor-pointer">
                    Twitter
                  </span>
                  <span className="text-[12px] text-gray-400 font-normal">
                    Social Media
                  </span>
                </div>
              </div>
              <i className="fa-solid fa-pen-fancy hover:text-sky-500"></i>
            </div>
            <div className="w-[95%] h-[50px] m-auto flex flex-row items-center justify-between cursor-pointer">
              <div className="flex flex-row items-center">
                <i
                  id="instgram"
                  className="fa-brands fa-instagram text-[30px]  ml-[5px] mr-[10px]"
                ></i>
                <div className="flex flex-col">
                  <span className="text-[17px] hover:underline cursor-pointer">
                    Instgram
                  </span>
                  <span className="text-[12px] text-gray-400 font-normal">
                    Social Media
                  </span>
                </div>
              </div>
              <i className="fa-solid fa-pen-fancy hover:text-sky-500"></i>
            </div>
            <div className="w-[95%] h-[50px] m-auto flex flex-row items-center justify-between cursor-pointer">
              <div className="flex flex-row items-center">
                <i className="fa-brands fa-linkedin text-[30px]  text-cyan-600 ml-[5px] mr-[10px]"></i>
                <div className="flex flex-col">
                  <span className="text-[17px] hover:underline cursor-pointer">
                    Link in
                  </span>
                  <span className="text-[12px] text-gray-400 font-normal">
                    Job platform
                  </span>
                </div>
              </div>
              <i className="fa-solid fa-pen-fancy hover:text-sky-500"></i>
            </div>
          </div>
        </div>
        <div className="relative w-[100%] lg:w-[56%] h-[auto] mt-[10px] lg:mt-0 ">
          {usepost ? (
            usepost.map((data) => (
              <FakePost
                data={data}
                daynight={daynight}
                userId={userId}
                Enter={Enter}
                handleMouseEnter={handleMouseEnter}
                handleOpen={handleOpen}
                handleid={handleid}
                handleCommentClose={handleCommentClose}
                handleCommentOpen={handleCommentOpen}
                comment={comment}
                setcomment={setcomment}
                userdata={userdata}
                userimg={userimg}
              />
            ))
          ) : (
            <div className="w-full h-[400px] flex flex-col items-center justify-center">
              <DotPulse size={60} speed={1.3} color="#FB8C00" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainProfile;
