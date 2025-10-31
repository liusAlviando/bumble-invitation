import { useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import logo_bca from '../assets/logo-bca.png'
const Present = () => {
    const {setPageTitle} = useOutletContext()
    useEffect(()=>{
        setPageTitle('Gift')
    },[])
    return (
        <div className="px-4">
            Your love and laughter are the best gifts we could ever receive.
            <br></br>
            <br></br>
            Should you wish to honor us with a token of affection, you may do so through:
            <br></br>
            <div className="flex items-center">
                <img className='w-[100px] h-[100px]' src={logo_bca}></img>
                <div className="ml-2">
                    <div className="text-sm font-semibold">Yohana Merina</div>
                    <p className="text-sm tracking-wider" style={{letterSpacing:'2px'}}>1234123412</p>
                </div>
            </div>
        </div>
    )
}

export default Present