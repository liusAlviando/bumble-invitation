import { useOutletContext } from "react-router-dom"
import ChatBumble from "../components/ChatBumble"
import { useEffect } from "react"

const Chats = () => {
    const {setPageTitle} = useOutletContext()
    useEffect(()=>{
        setPageTitle('RSVP')
    },[])
    return (
        <div className="h-full pb-[120px]">
            <ChatBumble></ChatBumble>
        </div>
    )
}

export default Chats