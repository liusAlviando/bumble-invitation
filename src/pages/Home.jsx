import { useOutletContext } from "react-router-dom"
import CardDeck from "../components/CardDeck"
import { useEffect, useState } from "react"
import swipeIllus from '../assets/swipe-illus.png'
import { motion } from "framer-motion";

const Home = () => {
    const {setPageTitle} = useOutletContext()

    const [onboarding, setOnboarding] = useState(false)
    useEffect(()=>{
        setPageTitle('Bumble')
        setOnboarding(true)
    },[])
  return (
    <div className="flex flex-col items-center w-full h-full">
        {onboarding && (
  <div
    onClick={() => {
      setOnboarding(false);
    }}
    className="cursor-pointer absolute top-0 left-0 w-full h-full bg-black opacity-60 z-[100] flex flex-col items-center justify-center text-center px-4"
  >
    <motion.img
      className="w-[150px]"
      src={swipeIllus}
      animate={{
        rotate: [-6, 6, -6],
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    />

    {/* Swipe Right */}
    <motion.div
      className="text-white text-[15pt] mt-4 font-semibold"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Swipe right
    </motion.div>

    {/* Scroll Down */}
    <motion.div
      className="text-white text-[13pt] mt-2 opacity-80"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
    >
      scroll down to see our moment ↓
    </motion.div>
  </div>
)}
        <div className="h-full w-full pb-[70px]">
            <CardDeck></CardDeck>
        </div>
    </div>
  )
}

export default Home