import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"

import PPYohana from '../assets/PPYohana.webp'
import PPLius from '../assets/PPLius.webp'

import mom1 from '../assets/mom1.webp'
import mom2 from '../assets/mom2.webp'
import mom3 from '../assets/mom3.webp'
import mom4 from '../assets/mom4.webp'
import mom5 from '../assets/mom5.webp'
import mom6 from '../assets/mom6.webp'

const Profile = () => {
    const { setPageTitle } = useOutletContext()
    const [lightboxImg, setLightboxImg] = useState(null)

    useEffect(() => {
        setPageTitle('Profile')
    }, [])

    const momImages = [mom1, mom2, mom3, mom4, mom5, mom6]

    return (
        <div className="px-4 mt-4 h-full pb-[30px] overflow-auto">
            {/* Profile 1 */}
            <div className="flex">
                <div className="rounded-full w-[80px] h-[80px] bg-zinc-100 flex items-center justify-center mr-3">
                    <img src={PPLius} className="w-full h-full rounded-full" />
                </div>
                <div className="flex flex-col justify-center">
                    <div className="font-[600]">Lius Alviando</div>
                    <div className="text-sm">29 July 1998</div>
                </div>
            </div>

            {/* Profile 2 */}
            <div className="flex mt-3">
                <div className="rounded-full w-[80px] h-[80px] bg-zinc-100 flex items-center justify-center mr-3">
                    <img src={PPYohana} className="w-full h-full rounded-full" />
                </div>
                <div className="flex flex-col justify-center">
                    <div className="font-[600]">Yohana Merina</div>
                    <div className="text-sm">19 May 2000</div>
                </div>
            </div>

            {/* Title */}
            <div className="mt-3 text-primary font-bold text-[20pt] mb-2">
                Our Moments
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-2 pb-[120px]">
                {momImages.map((src, idx) => (
                    <div
                        key={idx}
                        className="rounded-xl overflow-hidden bg-zinc-100 cursor-pointer"
                        onClick={() => setLightboxImg(src)}
                    >
                        <img
                            src={src}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {lightboxImg && (
                <div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                    onClick={() => setLightboxImg(null)}
                >
                    <img
                        src={lightboxImg}
                        className="max-w-[90%] max-h-[90%] rounded-xl shadow-xl"
                    />
                </div>
            )}
        </div>
    )
}

export default Profile
