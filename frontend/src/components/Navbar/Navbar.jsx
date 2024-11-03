import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaMicrophoneAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';

const NAVLINKS = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Categories',
        path: '/categories'
    },
    {
        name: 'All Podcasts',
        path: '/all-podcasts'
    }
]



const Navbar = () => {

    const { isLoggedIn } = useSelector(state => state.auth);




    const [showMenu, setShowMenu] = useState(false);





    const handleMenu = () => setShowMenu(!showMenu);


    return (
        <nav className='relative w-full'>

            <div className='container mx-auto px-2 py-6 flex justify-between items-center '>

                <div>
                    <NavLink
                        to='/'

                        className='text-2xl font-bold flex gap-1 items-center'>
                        <FaMicrophoneAlt size={35} />
                        Podcaster
                    </NavLink>
                </div>


                <div className='hidden lg:flex items-center gap-8 justify-around '>
                    {NAVLINKS.map(link => {
                        return (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) => {

                                    return `${isActive ? "font-semibold" : ""} hover:font-semibold hover:drop-shadow-2xl hover:-translate-y-0.5 transition-all duration-200`
                                }}



                            >
                                {link.name}
                            </NavLink>
                        )
                    })}

                </div>




                <div className='hidden lg:flex gap-3 items-center'>

                    {!isLoggedIn &&
                        <>
                            <NavLink
                                to='/login'

                                className='px-4 py-3 border border-black bg-white hover:bg-black hover:border-white hover:text-white hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 rounded-full'
                            >Login</NavLink>

                            <NavLink
                                to='/sign-up'

                                className='px-4 py-3 border border-black bg-black text-white hover:bg-white hover:border-black hover:text-black hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 rounded-full'
                            >Sign Up</NavLink>
                        </>}

                    {isLoggedIn && <NavLink
                        to='/profile'

                        className='px-4 py-3 border border-black bg-black text-white hover:bg-white hover:border-black hover:text-black hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 rounded-full'
                    >Profile</NavLink>}

                </div>

                <div className='ml-auto block lg:hidden'>


                    <div className='w-8 h-8  flex flex-col justify-between p-1 ' onClick={handleMenu}>

                        <div className={`line line-1 ${showMenu ? 'active' : ''}`}></div>
                        <div className={`line line-2 ${showMenu ? 'active' : ''}`}></div>
                        <div className={`line line-3 ${showMenu ? 'active' : ''}`}></div>

                    </div>

                </div>

                <div className={`lg:hidden absolute top-[83px]  left-0 w-full bg-blue-800/95 p-6 text-white flex flex-col gap-6  origin-top transition-all duration-300 z-30 ${showMenu ? 'translate-x-[0%]' : 'translate-x-[-100%]'}`}>

                    <div className='flex flex-col gap-6  '>
                        {NAVLINKS.map(link => {
                            return (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    onClick={handleMenu}
                                    className=' hover:font-semibold hover:drop-shadow-2xl hover:-translate-y-0.5 transition-all duration-200 '
                                >
                                    {link.name}
                                </NavLink>
                            )
                        })}

                    </div>

                    <div className='flex gap-3 items-center'>

                        {!isLoggedIn &&
                            <>
                                <NavLink
                                    to='/login'
                                    onClick={handleMenu}
                                    className='px-4 py-3 border border-black bg-white text-black hover:bg-black hover:border-white hover:text-white hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 rounded-full'
                                >Login</NavLink>

                                <NavLink
                                    to='/sign-up'
                                    onClick={handleMenu}
                                    className='px-4 py-3 border border-black bg-black text-white hover:bg-white hover:border-black hover:text-black hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 rounded-full'
                                >Sign Up</NavLink>
                            </>}

                        {isLoggedIn &&
                            <NavLink
                                to='/profile'
                                onClick={handleMenu}
                                className='px-4 py-3 border border-black bg-black text-white hover:bg-white hover:border-black hover:text-black hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 rounded-full'
                            >Profile</NavLink>}

                    </div>


                </div>




            </div>

        </nav>
    )
}

export default Navbar