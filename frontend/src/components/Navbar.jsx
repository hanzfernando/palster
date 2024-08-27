import logo from '../assets/logo.png'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { user } = useAuthContext()

    // For text links
    const setTextIsActive = () => 
        ({isActive}) => isActive 
            ? 'flex items-center justify-center rounded-md hover:bg-blue hover:text-white px-4 py-2 text-white bg-blue'
            : 'flex items-center justify-center rounded-md hover:bg hover:text-white px-4 py-2 text-black ';

    return (
        <nav className="bg-blue border-b border-blue">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start font-roboto">
                        {/* <!-- Logo --> */}
                        <NavLink to="/" className="flex flex-shrink-0 items-center mr-4" href="/index.html">
                            <img
                                className="h-10 w-auto"
                                src={logo}
                                alt="Co's Crochet"
                            />
                            <span className="hidden md:block text-2xl font-playfair  ml-2">CO&#39;s Crochet</span>
                        </NavLink>
                            
                        <div className="md:ml-auto">
                            <div className="flex font-roboto space-x-2">
                                {user && ( 
                                    <>
                                        {/* User Greeting */}
                                        <div className="flex items-center mr-6">
                                            {user.name && <span className=''>Welcome, {user.name}</span>}
                                        </div>
                                    </>
                                )}

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

                                
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar