import { createContext, useEffect, useRef, useState } from "react";
import soundtrack from "../assets/soundtrack.mp3";

export const AudioContextReact = createContext(null);

export const AudioProvider = ({ children }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    /** Initialize only once */
    useEffect(() => {
        audioRef.current = new Audio(soundtrack);
        audioRef.current.volume = 0.35;

        const audio = audioRef.current;

        const updateProgress = () => setProgress(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);

        audio.addEventListener("timeupdate", updateProgress);
        audio.addEventListener("loadedmetadata", updateDuration);
        audio.addEventListener("ended", () => setIsPlaying(false));

        return () => {
            audio.pause();
            audio.removeEventListener("timeupdate", updateProgress);
            audio.removeEventListener("loadedmetadata", updateDuration);
        };
    }, []);

    const play = () => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.play();
        setIsPlaying(true);
    };

    const pause = () => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.pause();
        setIsPlaying(false);
    };

    const toggle = () => {
        isPlaying ? pause() : play();
    };

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
