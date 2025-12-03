import { useState, useEffect } from "react";
import bg1 from "../assets/mom1.webp";
import bg2 from "../assets/mom2.webp";
import bg3 from "../assets/mom3.webp";
import bg4 from "../assets/mom4.webp";
import bg5 from "../assets/mom5.webp";


const BgSlider = () => {
  const [index, setIndex] = useState(0);
  const imgList = [bg1, bg2,bg3,bg4,bg5];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imgList.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [imgList.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div
        className="flex transition-transform duration-[1000ms] ease-out"
        style={{
          transform: `translateX(-${index * 100}%)`,
        }}
      >
        {imgList.map((src, i) => (
          <div key={i} className="w-full flex-shrink-0 h-screen relative overflow-hidden">
            <img
              key={index === i ? `active-${Date.now()}` : `inactive-${i}`}
              src={src}
              style={{
                filter: "grayscale(1) brightness(0.65) contrast(1)",
              }}
              alt=""
              className={`w-full h-full object-cover transform scale-110 ${
                index === i ? "animate-zoom-slow" : ""
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BgSlider;
