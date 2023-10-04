import { themeChange } from 'theme-change'
import React, {  useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BellIcon  from '@heroicons/react/24/outline/BellIcon'
import Bars3Icon  from '@heroicons/react/24/outline/Bars3Icon'
import MoonIcon from '@heroicons/react/24/outline/MoonIcon'
import SunIcon from '@heroicons/react/24/outline/SunIcon'
import { openRightDrawer } from '../features/common/rightDrawerSlice';
import { RIGHT_DRAWER_TYPES } from '../utils/globalConstantUtil'

import { NavLink,  Routes, Link , useLocation} from 'react-router-dom'


function Header(){

    const dispatch = useDispatch()
    const {noOfNotifications, pageTitle} = useSelector(state => state.header)
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme"))

    useEffect(() => {
        themeChange(false)
        if(currentTheme === null){
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ) {
                setCurrentTheme("dark")
            }else{
                setCurrentTheme("light")
            }
        }
        // 👆 false parameter is required for react project
      }, [])


    // Opening right sidebar for notification
    const openNotification = () => {
        dispatch(openRightDrawer({header : "Notifications", bodyType : RIGHT_DRAWER_TYPES.NOTIFICATION}))
    }


    function logoutUser(){
        localStorage.clear();
        window.location.href = '/'
    }

    return(
        <>
            <div className="navbar  flex justify-between bg-base-100  z-10 shadow-md ">


                {/* Menu toogle for mobile view or small screen */}
                <div className="">
                    <label htmlFor="left-sidebar-drawer" className="btn btn-primary drawer-button lg:hidden">
                    <Bars3Icon className="h-5 inline-block w-5"/></label>
                    <h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1>
                </div>

                

            <div className="order-last">

                {/* Multiple theme selection, uncomment this if you want to enable multiple themes selection, 
                also includes corporate and retro themes in tailwind.config file */}
                
                {/* <select className="select select-sm mr-4" data-choose-theme>
                    <option disabled selected>Theme</option>
                    <option value="light">Default</option>
                    <option value="dark">Dark</option>
                    <option value="corporate">Corporate</option>
                    <option value="retro">Retro</option>
                </select> */}


            {/* Light and dark theme selection toogle **/}
            <label className="swap ">
                <input type="checkbox"/>
                <SunIcon data-set-theme="light" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 "+(currentTheme === "dark" ? "swap-on" : "swap-off")}/>
                <MoonIcon data-set-theme="dark" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 "+(currentTheme === "light" ? "swap-on" : "swap-off")} />
            </label>


                {/* Notification icon */}
                <button className="btn btn-ghost ml-4  btn-circle" onClick={() => openNotification()}>
                    <div className="indicator">
                        <BellIcon className="h-6 w-6"/>
                        {noOfNotifications > 0 ? <span className="indicator-item badge badge-secondary badge-sm">{noOfNotifications}</span> : null }
                    </div>
                </button>


                {/* Profile icon, opening menu on click */}
                <div className="dropdown dropdown-end ml-4">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                        <img src="data:image/jpeg;base64,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" alt="profile" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li className="justify-between">
                        <Link to={'/app/settings-profile'}>
                            Profile Settings
                            <span className="badge">New</span>
                            </Link>
                        </li>
                        {/* <li className=''><Link to={'/app/settings-billing'}>Bill History</Link></li> */}
                        <div className="divider mt-0 mb-0"></div>
                        <li><a onClick={logoutUser}>Logout</a></li>
                    </ul>
                </div>
            </div>
            </div>

        </>
    )
}

export default Header