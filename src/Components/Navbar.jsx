import React, { useState } from 'react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav className='relative z-10 flex justify-between items-center bg-slate-700 text-white py-4 px-6 md:px-32'>
                <div className="logo font-bold text-xl">
                    Chore Champ - Conquer Your Chores
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        {isMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )}
                    </button>
                </div>
                <ul className={`md:flex md:gap-8 ${isMenuOpen ? 'block' : 'hidden'} absolute md:static top-full left-0 w-full md:w-auto bg-slate-700 md:bg-transparent md:flex-row flex-col transition-all duration-300`}>
                    <li className='cursor-pointer py-2 md:py-0 md:px-4 hover:font-bold transition-all duration-150'>Home</li>
                    <li className='cursor-pointer w-24  hover:font-bold transition-all duration-150'>Your Tasks</li>
                </ul>
            </nav>
            {isMenuOpen && <div className="fixed inset-0 bg-black opacity-25 z-0" onClick={toggleMenu}></div>}
        </>
    );
};

export default Navbar;
