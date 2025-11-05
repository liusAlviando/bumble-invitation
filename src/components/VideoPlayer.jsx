import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export default function VideoPlayer({ video, thumbnail }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = async () => {
    const video = videoRef.current;
    if (!video) return;
  
    video.muted = false;
    setIsPlaying(true);
    await video.play();
  
    // Fullscreen
    if (video.requestFullscreen) await video.requestFullscreen();
    else if (video.webkitRequestFullscreen) await video.webkitRequestFullscreen();
    else if (video.msRequestFullscreen) await video.msRequestFullscreen();
  
    // Make sure aspect ratio is preserved
    video.style.objectFit = "contain"; // instead of "cover"
  };

  const handleFullscreenChange = () => {
    const video = videoRef.current;
    if (!video) return;

    const isFullscreen =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement;

    if (!isFullscreen) {
      video.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("msfullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div className="relative w-full mt-2 rounded-lg overflow-hidden aspect-video">
      {/* Thumbnail with play button */}
      {!isPlaying && (
  <div
    className="absolute inset-0 flex items-center justify-center bg-black cursor-pointer z-10"
    onClick={handlePlayClick}
  >
    <img
      src={thumbnail}
      alt="Video thumbnail"
      className="w-full h-full object-cover opacity-80"
    />
    <div className="absolute flex items-center justify-center">
      <div className="bg-primary bg-opacity-80 rounded-full p-6 shadow-lg hover:scale-110 transition-transform">
        <FontAwesomeIcon icon={faPlay} size="2x" className="text-black" />
      </div>
    </div>
  </div>
)}

      {/* Video */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        controls={isPlaying}
        loop
        playsInline
      >
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
}
