import React, { useState } from 'react';
import logo from '/Users/jana/Desktop/jayskitchen/src/images/logo.png';
import { HiMenuAlt3 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom'; // Importing Link from React Router
import Button from './button';

// NavBar Component
const NavBar = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className='w-full fixed z-10 bg-black opacity-90'>
            <nav className='flex w-full py-2 md:py-3 px-4 md:px-20 items-center justify-between'>
                <Link to='/' className='flex items-center justify-center text-white text-lg cursor-pointer'>
                    <img src={logo} alt='logo' className='hidden md:block w-8 h-8 lg:w-14 lg:h-14' />
                    Jay's<span>Kitchen</span>
                </Link>
                <ul className='hidden md:flex text-white gap-6'>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/recipes'>Explore</Link></li>
                    <li><Link to='/favorites'>Favorites</Link></li>
                </ul>
                {/* "Sign in" button that redirects to the login page */}
                <Link to="/login">
                    <Button
                        title='Log in'
                        containerStyle='hidden md:block bg-transparent border border-white text-white hover:bg-white hover:text-slate-700 rounded-full min-w-[130px]'
                    />
                </Link>
                <button
                    className='block md:hidden text-white text-xl'
                    onClick={() => setOpen((prev) => !prev)}
                >
                    {open ? <AiOutlineClose /> : <HiMenuAlt3 />}
                </button>
            </nav>
            <div className={`${open ? "flex" : "hidden"} bg=black flex-col w-full px-4 pt-16 pb-10 text-white gap-6 text-[14px]`}>
                <Link to="/">Home</Link>
                <Link to="/recipes">Recipes</Link>
                <Link to="/favorites">Favorites</Link>
            </div>
        </header>
    );
};

export default NavBar;
