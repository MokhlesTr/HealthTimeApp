import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const Layouts = () => {
    return (
        <div className="flex flex-row bg-neutral-200 h-screen overflow-x-hidden w-screen  ">
            <Sidebar />
            <div className="flex-1">
                <Header />
                <div>{<Outlet />}</div>
            </div>
            {/* <div>Footer</div> */}
        </div>
    )
}

export default Layouts
