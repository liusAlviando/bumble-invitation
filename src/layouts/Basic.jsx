import { Outlet } from "react-router-dom"

const Basic = () => {
  return (
    <div className="bg-zinc-100 min-h-screen flex justify-center">
        <div className="bg-white h-screen w-screen md:w-[400px]">
            <Outlet />
        </div>
    </div>
  )
}

export default Basic