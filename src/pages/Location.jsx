import { useEffect } from "react"
import MapEmbed from "../components/MapEmbed"
import { useOutletContext } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarker, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"

const Location = () => {
    const {setPageTitle} = useOutletContext()
    useEffect(()=>{
        setPageTitle('Location')
    },[])
  return (
    <div className="flex flex-col items-center w-full h-full px-4 overflow-y-auto">

        <div className="">
            <div>
            We can’t wait to celebrate this special day with you!
            <br></br>
            <br></br>
            Here’s where our story continues — we’ll be waiting with open hearts.
            <br></br>
            <br></br>
            <div className="bg-primary rounded-lg p-3">
                <div className="font-bold text-lg text-wh">28th December 2025</div>
                <div className="font-semibold">Holy Matrimony</div>
                <div>10:30 - 12:00</div>
                <div className="font-semibold"><span className="w-[100px]"><FontAwesomeIcon icon={faMapMarkerAlt} className="text-[15pt]"></FontAwesomeIcon> Gereja Katolik Paroki Gembala Baik</span></div>
                <br></br>
                <div className="font-semibold">Wedding Ceremony</div>
                <div>13:00 - 15:00</div>
                <div className="font-semibold"><span className="w-[100px]"><FontAwesomeIcon icon={faMapMarkerAlt} className="text-[15pt]"></FontAwesomeIcon> Camping Ground Gereja Katolik Paroki Gembala Baik</span></div>
            </div>
            <br></br>
            {/* <span className="w-[100px]"><FontAwesomeIcon icon={faMapMarkerAlt} className="text-[15pt]"></FontAwesomeIcon> Gereja Katolik Paroki Gembala Baik</span> */}
            
            <br></br>
            <div className="ml-[10px] font-semibold">Detailed Location:</div>
            <div className="text-sm ml-[20px]">Jl. Ridwan No.16, RT./RW:/RW.02/05, Ngaglik, Kec. Batu, Kota Batu, Jawa Timur</div>
            </div>
            <div className="mt-5">
                <MapEmbed />
            </div>
        </div>
    </div>
  )
}

export default Location