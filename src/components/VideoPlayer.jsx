import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useAudioPlayer } from "../hooks/useAudioPlayer";

export default function VideoPlayer({ video, thumbnail }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { play: audioPlay, pause: audioPause } = useAudioPlayer();

  const handlePlayClick = async () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    setIsPlaying(true);

    // Pause global soundtrack BEFORE video playback
    audioPause();

    await video.play();

    // Fullscreen
    if (video.requestFullscreen) await video.requestFullscreen();
    else if (video.webkitRequestFullscreen) await video.webkitRequestFullscreen();
    else if (video.msRequestFullscreen) await video.msRequestFullscreen();

    // Preserve aspect ratio
    video.style.objectFit = "contain";
  };

  const handleFullscreenChange = () => {
    const video = videoRef.current;
    if (!video) return;

    const isFullscreen =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement;

    // When exiting fullscreen
    if (!isFullscreen) {
      video.pause();
      setIsPlaying(false);

      // Resume audio soundtrack
      audioPlay();
    }
  };

  /** Add video play/pause listeners */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onVideoPlay = () => audioPause();
    const onVideoPause = () => {
      if (!document.fullscreenElement) audioPlay();
    };

    video.addEventListener("play", onVideoPlay);
    video.addEventListener("pause", onVideoPause);

    return () => {
      video.removeEventListener("play", onVideoPlay);
      video.removeEventListener("pause", onVideoPause);
    };
  }, []);

  /** fullscreen listeners */
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
