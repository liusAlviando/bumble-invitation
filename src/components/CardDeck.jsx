import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence ,useTransform, useMotionValue} from 'framer-motion';
import verified from '../assets/verified.png'
import { Link, useNavigate } from 'react-router-dom';

const CardLayout = ({title,children}) =>{
    return(
        <div className='shadow-lg rounded-xl p-2 mt-2'>
            <div className='font-[600]'>{title}</div>
            <div>{children}</div>
        </div>
    )
}

const Pill = ({body}) =>{
    return(
        <div>
            <div>{body}</div>
        </div>
    )
}

// --- Sample data ---
const sampleProfiles = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=60',
    text: 
    <div>
        <div className='text-[23pt] font-bold flex items-center'>
            <span>
            Yohana & Lius
            </span>
            <img className='w-[20px] h-[20px] ml-1' src={verified}></img>
        </div>
        <div className='text-sm'>
            28 December 2025
        </div>
    </div>,
    extraContent: 
    <div className=''>
        <CardLayout
            title={'Our bio'}
        >
            asdada
        </CardLayout>
        <CardLayout
            title={'Our interest'}
        >
            asdada
        </CardLayout>
        <CardLayout
            title={'We\'re looking for'} 
        >
            asdada
        </CardLayout>
    </div>,
  }
];



// --- Helpers ---
const SWIPE_VELOCITY = 0; // px/s
const SWIPE_DISTANCE = 100; // px threshold

function Card({ item, onSwipe, index, total ,stackref}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]); // rotate based on drag direction
  const startPos = useRef({ x: 0, y: 0 });
  const startScrollY = useRef(0);

  const [dragged, setDragged] = useState(false);
    
  const handlePointerDown = (e) => {
    startPos.current = { x: e.clientX, y: e.clientY };
    startScrollY.current = window.scrollY;
    setDragged(true);
    console.log(e.clientX, e.clientY);
    // setCanDrag(false); // reset
    };
    const handlePointerUp = (e) => {
        setDragged(false);
    };
  const handlePointerMove = (e) => {
    const dx = Math.abs(e.clientX - startPos.current.x);
    const dy = Math.abs(e.clientY - startPos.current.y);
    const dy_init = (e.clientY - startPos.current.y);
    
    // if vertical > horizontal, treat as scroll
    if (dy > dx && dy > 10) {
        if(dragged){
            console.log(startScrollY.current + dy_init);
            if(stackref.current){
                stackref.current.scrollTo(0, startScrollY.current - dy_init);
            }
        }
    } else if (dx > dy && dx > 10) {
    //   setCanDrag(true);
    }
  };

  return (
    <motion.div
        ref={ref}
        layout
        className={`absolute top-0 h-full w-full rounded-2xl bg-white overflow-hidden`} 
        style={{
            zIndex: total - index,
            transformOrigin: 'center',
            x,
            rotate, // 👈 dynamic rotation
            cursor:'grab'
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        drag="x"
        dragConstraints={{left: 0, right: 0}}
        dragElastic={0.5}
        onDrag={(e, info) => {
            const offset = info.offset.x;
            // console.log(info.offset.x);
            const dir = offset > 0 ? 1 : -1;
            // If dragged far enough OR fast enough, consider it a swipe
            if (Math.abs(offset) > SWIPE_DISTANCE) {
                
                // animate out and trigger onSwipe
                const xTo = dir * 1000; // fly off-screen
                onSwipe(item, dir === 1 ? 'right' : 'left', { xTo });
            } else {
            // do nothing; framer will snap back
            }
        }}
        initial={{ scale: 1 - index * 0.03, y: index * 8, opacity: 1 - index * 0.03}}
        animate={{ scale: 1 - index * 0.03, y: index * 8, opacity: 1 - index * 0.03 }}
        // whileHover={{ scale: 1.05 }}
        whileDrag={{}}
        whileTap={{ scale: 1.05, cursor:'grabbing' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
    <div className="w-full h-full flex flex-col relative">
        <div
          className="flex-1 bg-cover bg-center"
          style={{ backgroundImage: `url(${item.img})` }}
        />
        <div className='text-white absolute bottom-0 z-[2] pl-4 pb-2'>
           {item.text}
        </div>
        <div className="absolute bottom-0 h-[200px] w-full bg-gradient-to-b to-gray-800"> 

        </div>
      </div>
    </motion.div>
    
  );
}

export default function CardDeck({ items = sampleProfiles, onSwipe }) {
    const [stack, setStack] = useState(items);
    const [animating, setAnimating] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0); // track current top card
    
    const [cardHeight, setCardHeight] = useState(0);
    const cardStackRef = useRef(null);
    const [isMatched, setIsMatched] = useState(false);
    const [showHearts, setShowHearts] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        if (isMatched) {
          // start hearts animation slightly later
          const timer = setTimeout(() => setShowHearts(true), 500);
          return () => clearTimeout(timer);
        } else {
          setShowHearts(false);
        }
      }, [isMatched]);

    useEffect(() => {
        const updateHeight = () => setCardHeight(window.innerHeight - 48 - 70 -20);
        updateHeight(); // initial set
        window.addEventListener('resize', updateHeight);
      
        return () => window.removeEventListener('resize', updateHeight);
      }, []);

    const handleSwipe = (item, dir, opts = {}) => {
      if (animating) return;
      setAnimating(true);
  
      setStack(prev =>
        prev.map(i => (i.id === item.id ? { ...i, direction: dir } : i))
      );
  
      setTimeout(() => {
        setStack(prev => {
          const remaining = prev.filter(i => i.id !== item.id);
          const swipedCard = { ...item, direction: null };
          const newStack = [...remaining, swipedCard];
          setActiveIndex((old) => (old + 1) % items.length);
          return newStack;
        });
        setAnimating(false);
        if (onSwipe) onSwipe(item, dir);
        setIsMatched(true);
      }, 300);
    };
  
    const activeItem = stack[0]; // top card is the "active" one
  
    return (
      <div ref={cardStackRef} className="flex flex-col items-center justify-start h-full w-full overflow-y-auto px-2" style={{flexShrink:0}}>
        {/* --- Card Deck Section --- */}
        <div className="relative w-full max-w-[400px] mt-5 flex-shrink-0" style={{height:cardHeight}}>
          <AnimatePresence>
            {stack.slice(0, 4).map((item, idx) => (
              <motion.div
                className=""
                custom={item.direction || 0}
                key={item.id}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={(customDir) => ({
                  opacity: 0,
                  scale: 0.8,
                  x: customDir === 'right' ? 300 : customDir === 'left' ? -300 : 0,
                  rotate: customDir === 'right' ? 15 : customDir === 'left' ? -15 : 0,
                  transition: { duration: 0.3 },
                })}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <Card
                  item={item}
                  index={idx}
                  total={stack.length}
                  onSwipe={(it, dir, opts) => handleSwipe(it, dir, opts)}
                  stackref={cardStackRef}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
  
        {/* --- Scrollable Extra Content for Active Card --- */}
        <div className="mt-6 mb-10 w-full max-w-[400px] text-zinc-700 pb-[30px]">
          {activeItem?.extraContent && (
            activeItem.extraContent
          )}
        </div>
        <AnimatePresence>
      {isMatched && (
        <motion.div
          key="match"
          className="absolute top-0 left-0 w-full h-full bg-primary z-[100] flex flex-col items-center justify-center overflow-hidden"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 70, damping: 15 }}
        >
          {/* Floating hearts layer */}
          {showHearts && (
            <motion.div
              className="absolute inset-0 pointer-events-none overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-white text-2xl"
                  style={{
                    left: `${Math.random() * 100}%`,
                    bottom: `${Math.random() * 20}%`,
                  }}
                  initial={{ y: 0, opacity: 0, scale: 0.8 }}
                  animate={{
                    y: -600 - Math.random() * 400,
                    opacity: [0, 1, 0],
                    scale: [0.8, 1.2, 1],
                    rotate: Math.random() * 60 - 30,
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    delay: Math.random() * 0.5,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                >
                  💛
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* BOOM! */}
          <motion.div
            className="text-white text-[35pt] font-bold tracking-widest z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.3, 1], opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            BOOM!
          </motion.div>

          {/* it's a match */}
          <motion.div
            className="text-white font-semibold text-[20pt] mt-[-10px] z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            it’s a match!
          </motion.div>

          {/* profile images */}
          <motion.div
            className="flex mt-6 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 120 }}
          >
            <motion.div
              className="rounded-full w-[90px] h-[90px] bg-zinc-100 flex items-center justify-center mr-3"
              whileHover={{ scale: 1.05 }}
            />
            <motion.div
              className="rounded-full w-[90px] h-[90px] bg-zinc-100 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
            />
          </motion.div>

          {/* Button */}

          <motion.div
            className="cursor-pointer bg-white rounded-xl px-4 py-2 mt-6 text-sm font-semibold z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
            onClick={()=>{navigate('/chats')}}
          >
            Go to RSVP
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
        
      </div>
    );
  }
  
