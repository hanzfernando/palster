import logo from '../assets/logo.png'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { FaSignOutAlt } from 'react-icons/fa'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
    const { user } = useAuthContext()
    const { logout } = useLogout()

    // For text links
    const setTextIsActive = () => 
        ({isActive}) => isActive 
            ? 'flex items-center justify-center rounded-md hover:bg-blue px-4 py-2 text-white bg-blue'
            : 'flex items-center justify-center rounded-md hover:bg hover:text-white px-4 py-2 text-white ';

    const handleLogout = () => {
        logout()
    }

    return (
        <nav className="bg-blue border-b border-blue">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start font-roboto text-white">
                        {/* <!-- Logo --> */}
                        <NavLink to="/" className="flex flex-shrink-0 items-center mr-4" href="/index.html">
                            <img
                                className="h-10 w-auto"
                                src={logo}
                                alt="Palster"
                            />
                            <span className="hidden md:block text-2xl font-playfair ml-2 font-bold">Palster</span>
                        </NavLink>
                            
                        <div className="md:ml-auto">
                            <div className="flex font-roboto space-x-2">
                                

                                {/* Auth */}
                                {!user && (
                                    <>
                                        {/* LOGIN */}
                                        <NavLink to="/login" className={setTextIsActive()}>
                                            Login
                                        </NavLink>
                                        {/* SIGN UP */}
                                        <NavLink to="/signup" className={setTextIsActive()}>
                                            Signup
                                        </NavLink>
                                    </>
                                )}

                                {/* PROFILE and LOGOUT */}
                                {user && (
                                    <>
                                        {/* PROFILE */}
                                        <NavLink
                                            to={`/profile/${user._id}`} // Adjust the path to your profile route
                                            className="flex items-center justify-center rounded-md hover:bg-blue  py-2"
                                        >
                                            <img
                                                src={user.avatar}
                                                alt="Profile"
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        </NavLink>

                                        {/* LOGOUT */}
                                        <button
                                            onClick={handleLogout}
                                            className='flex items-center justify-center rounded-md hover:bg-gold-light text-white px-4 py-2 text-black'>
                                            <FaSignOutAlt className='mr-1 '/>
                                            Log out
                                        </button>
                                    </>
                                )}

                                
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar