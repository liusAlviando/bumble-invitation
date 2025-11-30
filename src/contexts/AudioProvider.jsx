import { createContext, useEffect, useRef, useState } from "react";
import soundtrack from "../assets/soundtrack.mp3";

export const AudioContextReact = createContext(null);

export const AudioProvider = ({ children }) => {
    const audioRef = useRef(new Audio(soundtrack)); // preload soundtrack
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const audio = audioRef.current;

    /** Always play the same soundtrack */
    const play = () => {
        if (audio.src !== soundtrack) {
            audio.src = soundtrack;
            audio.volume = 0.35;
        }
        audio.play();
        setIsPlaying(true);
    };

    /** Pause */
    const pause = () => {
        audio.pause();
        setIsPlaying(false);
    };

    /** Toggle play/pause */
    const toggle = () => {
        isPlaying ? pause() : play();
    };

    /** Update listeners */
    useEffect(() => {
        const updateProgress = () => setProgress(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);

        audio.addEventListener("timeupdate", updateProgress);
        audio.addEventListener("loadedmetadata", updateDuration);
        audio.addEventListener("ended", () => setIsPlaying(false));

        return () => {
            audio.removeEventListener("timeupdate", updateProgress);
            audio.removeEventListener("loadedmetadata", updateDuration);
        };
    }, []);

    return (
        <AudioContextReact.Provider
            value={{
                play,
                pause,
                toggle,
                isPlaying,
                progress,
                duration,
                audioRef,
            }}
        >
            {children}
        </AudioContextReact.Provider>
    );
};
