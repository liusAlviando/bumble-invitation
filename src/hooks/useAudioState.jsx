import { useContext } from "react";
import { AudioContextReact } from "../contexts/AudioProvider";

export const useAudioState = () => {
    const {
        isPlaying,
        currentSrc,
        progress,
        duration
    } = useContext(AudioContextReact);

    return {
        isPlaying,
        currentSrc,
        progress,
        duration
    };
};
