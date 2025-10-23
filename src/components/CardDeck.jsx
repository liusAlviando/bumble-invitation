import React, { useState, useRef } from 'react';
import { motion, AnimatePresence ,useTransform, useMotionValue} from 'framer-motion';

// --- Sample data ---
const sampleProfiles = [
  {
    id: 1,
    text: 'kata katat katkatk aakdaskdkas aksdaks',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 2,
    text: 'kata katat katkatk aakdaskdkas aksdaks',
    img: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=800&q=60',
  },
];

// --- Helpers ---
const SWIPE_VELOCITY = 0; // px/s
const SWIPE_DISTANCE = 300; // px threshold

function Card({ item, onSwipe, index, total }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]); // rotate based on drag direction

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

  const handleSwipe = (item, dir, opts = {}) => {
    if (animating) return;
    setAnimating(true);
  
    // mark direction for exit animation
    setStack(prev =>
      prev.map(i => (i.id === item.id ? { ...i, direction: dir } : i))
    );
  
    // after animation delay, move swiped card to back of stack
    // setTimeout(() => {
      setStack(prev => {
        const remaining = prev.filter(i => i.id !== item.id);
        const swipedCard = { ...item, direction: null }; // reset direction
        console.log([...remaining, swipedCard])
        return [...remaining, swipedCard]; // push to end = loop
      });
      setAnimating(false);
      if (onSwipe) onSwipe(item, dir);
    // }, 100);
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-5">
      <div className="relative h-full w-full">
        <AnimatePresence>
          {stack.slice(0, 4).map((item, idx) => (
            <motion.div
                className=''
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
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
