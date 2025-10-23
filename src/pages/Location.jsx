import { useEffect } from "react"
import MapEmbed from "../components/MapEmbed"
import { useOutletContext } from "react-router-dom"

const Location = () => {
    const {setPageTitle} = useOutletContext()
    useEffect(()=>{
        setPageTitle('Location')
    },[])
  return (
    <div className="flex flex-col items-center w-full h-full px-4">
        <div className="h-full w-full pb-[70px]" style={{overflowX:'hidden'}}>
            <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <MapEmbed />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Location