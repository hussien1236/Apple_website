import React, { useEffect, useState } from 'react'
import { appleImg, bagImg, menuImg, searchImg } from '../utils'
import { navLists } from '../constants'
import HamburgerMenu from './HamburgerMenu';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(()=>{
  const handleScroll = ()=>{
    if(window.scrollY>50)
      setScrolled(true);
    else 
      setScrolled(false);};
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      }
  },[])
  return (
  <header className={`w-full py-5 sm:px-10 px-7 flex 
    justify-between items-center sticky ${scrolled && 'bg-zinc'} top-0 z-10 bg-opacity-50`}>
        <nav className='flex w-full screen-max-width'>
            <img src={appleImg} alt="Apple" 
            width={14} height={18}/>
            <div className='flex flex-1 justify-center
            max-sm:hidden'>
                {navLists.map(
                (nav)=>
                <div key={nav} className='px-5 text-gray text-sm
                cursor-pointer hover:text-white transition-all'>
                 {nav}
                </div>
                )}
            </div>
            <div className='flex gap-7 items-center 
            max-sm:justify-end max-sm:flex-1'>
                <img className='cursor-pointer' src={searchImg} alt="search" width={18} height={18}/>
                <img className='cursor-pointer' src={bagImg} alt="bag" width={18} height={18}/>
                  <HamburgerMenu />
            </div>
        </nav>
    </header>
  )
}

export default Navbar