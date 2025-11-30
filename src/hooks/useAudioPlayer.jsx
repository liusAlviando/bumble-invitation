import { useContext } from "react";
import { AudioContextReact } from "../contexts/AudioProvider";

export const useAudioPlayer = () => {
    return useContext(AudioContextReact);
};
