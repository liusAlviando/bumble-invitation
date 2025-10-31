import { useEffect } from "react"
import { useOutletContext } from "react-router-dom"

const Profile = () => {

    const {setPageTitle} = useOutletContext()
    useEffect(()=>{
        setPageTitle('Profile')
    },[])
    return (
        <div className="px-4 mt-4 h-full pb-[30px] overflow-auto">
            <div className="flex">
                <div className="rounded-full w-[80px] h-[80px] bg-zinc-100 flex items-center justify-center mr-3">
                    
                </div>
                <div className="flex flex-col justify-center">
                    <div className="font-[600]">
                        Lius Alviando
                    </div>
                    <div className="text-sm">
                        29 July 1998
                    </div>
                </div>
            </div>
            <div className="flex mt-3">
                <div className="rounded-full w-[80px] h-[80px] bg-zinc-100 flex items-center justify-center mr-3">
                    
                </div>
                <div className="flex flex-col justify-center">
                    <div className="font-[600]">
                        Yohana Merina
                    </div>
                    <div className="text-sm">
                        29 July 1998
                    </div>
                </div>
            </div>
            <div className="mt-3 text-primary font-bold text-[20pt] mb-2">
                Our Moments
            </div>
            <div className="grid grid-cols-3 gap-2 pb-[120px]">
                {
                    [1,2,3,4,5,6,7,8,9,10,11,12].map((i)=>{
                        return(
                            <div className="aspect-4/5 rounded-xl p-4 bg-zinc-100 flex items-center justify-center">
                                <div className="text-sm font-semibold">
                                    {i}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Profile