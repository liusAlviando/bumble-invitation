import { faCompass, faHeart, faMessage, faUser } from "@fortawesome/free-regular-svg-icons"
import { faGift } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, Outlet } from "react-router-dom"
import logo_bumble from '../assets/logo-bumble.png'
import { useState } from "react"

const BottomMenuItem = ({ icon, text , img , to , isActive}) => {
  return (
    <Link to={to || '/'} className="flex flex-col items-center justify-center w-[50px]">
      {
        img && <img className="w-[23px] h-[23px] mb-[-3px]" src={img}></img>
      }
      {
        icon && <FontAwesomeIcon icon={icon} className="text-[15pt]"></FontAwesomeIcon>
      }
      <div className="text-[9pt] mt-1">{text}</div>
    </Link>
  )
}
const HomeLayout = () => {
  const [pageTitle , setPageTitle] = useState('Bumble')
  return (
    <div className="bg-zinc-100 flex justify-center min-h-screen overflow-hidden">
        <div className="flex flex-col h-screen w-screen md:w-[400px] relative bg-white">
            <div className="px-4 pt-2 flex justify-between items-center">
              <div className={`${pageTitle == 'Bumble' ? 'font-bold' : 'font-normal'} text-[20pt]`}>
                {pageTitle}
              </div>
              <Link to={'/present'}>
                <FontAwesomeIcon className="text-[15pt]" icon={faGift}></FontAwesomeIcon>
              </Link>
            </div>
            <div className="h-full">
              <Outlet context={{setPageTitle}} />
            </div>
            <div className="cursor-pointer fixed bg-white bottom-0 left-0 right-0 mx-auto w-screen md:w-[400px] h-[70px] flex justify-around items-center z-[10] rounded-t-xl">
              <div>
                <BottomMenuItem
                  text={'Profile'}
                  icon={faUser}
                  to={'/profile'}
                />
              </div>
              <div>
                <BottomMenuItem
                  text={'Location'}
                  icon={faCompass}
                  to={'/location'}
                />
              </div>
              <div>
                <BottomMenuItem
                  text={'Home'}
                  img={logo_bumble}
                  to={'/home'}
                />
              </div>
              <div>
                <BottomMenuItem
                  text={'Liked'}
                  icon={faHeart}
                  to={'/liked'}
                />
              </div>
              <div>
                <BottomMenuItem
                  text={'RSVP'}
                  icon={faMessage}
                  to={'/chats'}
                />
              </div>
            </div>
        </div>
    </div>
  )
}

export default HomeLayout