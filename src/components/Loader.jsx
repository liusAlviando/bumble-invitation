import logo_bumble from '../assets/logo-bumble.png'
import { motion } from "framer-motion";

const Loader = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-white">
            <motion.img
            className='w-[100px] h-[100px]'
            style={{filter:'brightness(1.1) saturate(75%)'}}
            src={logo_bumble}
            animate={{
                scale: [1, 1.1, 1],
            }}
            transition={{
                duration: 1.2,
                ease: "easeInOut",
                repeat: Infinity,
            }}
            />
            {/* <img className='w-[100px] h-[100px]' style={{filter:'brightness(1.1) saturate(75%)'}} src={logo_bumble}></img> */}
        </div>
    )
}

export default Loader