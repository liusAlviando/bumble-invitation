import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import bg_hexa from '../assets/bg-hexa.png'
import BgSlider from '../components/BgSlider'
import { faEnvelope, faHeart } from '@fortawesome/free-regular-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import logo_bumble from '../assets/logo-bumble.png'
import { Link } from 'react-router-dom'
const Welcome = () => {
  return (
    <div className="relative">
        <div className='absolute top-0 left-0 w-full h-full'>
          <BgSlider />
        </div>
        <div className='absolute top-0 left-0 w-full h-screen z-1 px-4'>
          <div className='text-primary flex flex-col items-center justify-between w-full h-full'>
            <div className='flex flex-col items-center justify-center pt-[20%]'>
              <div className='font-[800] text-[15pt] mb-[-20px]'>
                Not
              </div>
              <div className='font-[700] text-[28pt] flex items-center'>
                <img className='w-[40px] h-[40px]' style={{filter:'brightness(1.1) saturate(75%)'}} src={logo_bumble}></img>
                Bumble
              </div>
              <div className='text-[12pt] mb-[-10px]'>It's a</div>
              <div className='text-[15pt]'>Wedding Invitation</div>
            </div>
            <div className='pb-[10%] w-full flex flex-col items-center justify-center'>
              
              <div>
                Hello,
              </div>
              <div className='font-[600] text-[20pt]'>
                Yohana Merina
              </div>
              <div className='mb-4'>
                You are invited!
              </div>
              <Link to={'/home'} className='cursor-pointer text-black bg-zinc-100 w-full flex items-center justify-center py-3 rounded-xl'>
                  Open Invitation
              </Link>
            </div>

          </div>

        </div>

    </div>
  )
}

export default Welcome