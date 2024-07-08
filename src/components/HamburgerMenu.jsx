import React, { useEffect, useRef, useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { IoMenu } from "react-icons/io5";
import { navLists } from '../constants';
import gsap from 'gsap';

const HamburgerMenu = () => {
  const [isOpen,setIsOpen] = useState(false);
  const menuRef = useRef();
  useEffect(()=>{
    if(isOpen){
    gsap.to('#menuRef',{
      duration: 0.5,
        opacity: 1,
        scale: 1,
        ease: "power2.out"
    } 
  )}else {
    gsap.to('#menuRef', {
      duration: 0.5,
      opacity: 0,
      scale: 0.95,
      ease: "power2.in",
    });
  }
  },[isOpen])
  return (
    <section className='sm:hidden flex flex-col self-center'>
    <div onClick={()=> setIsOpen(!isOpen)}><IoMenu size={25} className='mt-1'/></div>
    <div id="menuRef" className="absolute top-10 right-0 px-5 py-2 bg-zinc w-[120px] h-[120px] rounded-xl opacity-0">
    <ul>
      {navLists.map((link)=>(
        <li key={link} className="block data-[focus]:bg-blue-100 text-gray text-md
                cursor-pointer hover:text-white transition-all" href="/">
          {link}
        </li>))}
      </ul>
     
    </div>
  </section>
  )
}

export default HamburgerMenu