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
    <div className="flex flex-col items-center w-full h-full px-4">

        <div className="pb-[70px]">
            <div>
            We can’t wait to celebrate this special day with you!
            <br></br>
            <br></br>
            Here’s where our story continues — we’ll be waiting with open hearts.
            <br></br>
            <br></br>
            <div className="bg-primary rounded-lg p-3">
                <div>28 December 2025</div>
                <div>Holy Matrimony</div>
                <div>10:30 - 12:00</div>
                <br></br>
                <div>Wedding Ceremony</div>
                <div>13:00 - 15:00</div>
            </div>
            <br></br>
            <span className="w-[100px]"><FontAwesomeIcon icon={faMapMarkerAlt} className="text-[15pt]"></FontAwesomeIcon> Gereja Katolik Paroki Gembala Baik</span>
            <br></br>
            <div className="text-sm ml-[30px]">Jl. Ridwan No.16, RT./RW:/RW.02/05, Ngaglik, Kec. Batu, Kota Batu, Jawa Timur</div>
            </div>
            <div className="mt-5">
                <MapEmbed />
            </div>
        </div>
    </div>
  )
}

export default Location