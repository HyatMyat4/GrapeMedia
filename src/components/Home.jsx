import Bodyleft from "./Bodyleft"
import Bodyright from "./Bodyright"
import BodyMid from "./BodyMid"
import MessageFriendsGroup from '../Message/MessageFriendsGroup'
import { MessageGroupOCC } from '../setting/ActionSlice'
import HeaderMain from '../Header/HeaderMain'
import { useSelector } from "react-redux"
const Home = () => {  
  const openclose= useSelector(MessageGroupOCC)
  return (

      <div id='input'  className={` w-[100%]  ${openclose ?  'h-[100%]' : ''}   3xl:w-[85%] 1lg:w-[1110px]   w-[100%]  overflow-hidden m-auto flex flex-col    `}>  
      <div className="w-full h-[9vh]">
      <HeaderMain/>
      </div>
      <div className="w-full h-[91vh] flex flex-row items-start justify-between">
      <MessageFriendsGroup/>
      <Bodyleft/>
      <BodyMid/>
      <Bodyright/>
      </div>  
    </div>

  )
}

export default Home