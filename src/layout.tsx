
import { CallIcon, CartIcon, HomeIcon, MealIcon, MenuIcon } from "@icons/index"
import { Outlet } from "react-router-dom"

import { useInit } from "./hooks"
const Layout = () => {

    useInit()
    return (
        <div className="drawer drawer-mobile">
            <input id="menu" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content relative bg-back">

                <NavBar />
                <Outlet />
                <BottomNav />
            </div>
            <div className="drawer-side">
                <label htmlFor="menu" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-base-100 text-base-content">

                    <li><a href="/">Sidebar Item 1</a></li>
                    <li><a href="/">Sidebar Item 2</a></li>
                </ul>

            </div>
        </div>
    )
}

export default Layout


const NavBar = () => {
    return <div className="p-content flex flex-row items-center justify-between h-16">
        <label htmlFor="menu" className="btn btn-ghost drawer-button lg:hidden bg-white">
            <MenuIcon className="text-2xl text-text" />


        </label>

        <span className="font-extrabold text-text">
            EAT
            <span className="text-primary">
                OUT
            </span>
        </span>
        <div className="avatar">
            <div className="w-10 mask mask-squircle">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=100&q=10" alt="test" />
            </div>
        </div>
    </div>
}






const BottomNav = () => {
    return <div className="btm-nav bg-white text-xl text-text">
        <button className="active">
            <HomeIcon />
        </button>
        <button>
            <MealIcon />
        </button>

        <button>
            <div className="bg-primary rounded-full p-3 text-2xl drop-shadow-lg">
                <CartIcon />
            </div>
        </button>
        <button>
            <CallIcon />
        </button>
    </div>
}

