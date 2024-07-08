import React, { useEffect, useState } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import _gsap from 'gsap/gsap-core';
import {heroVideo, smallHeroVideo} from '../utils'
const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth > 760? heroVideo: smallHeroVideo
  );
  const handleVideoSrcSet = ()=>{
    if(window.innerWidth >760)
      setVideoSrc(heroVideo);
    else
      setVideoSrc(smallHeroVideo);
  }
 useEffect(()=>{ 
  window.addEventListener("resize",handleVideoSrcSet);
  return ()=> window.removeEventListener("resize",handleVideoSrcSet);
},[]);

    useGSAP(()=>{
     gsap.to("#hero",{
        opacity:1,
        delay:2
     })
    gsap.to("#heroBottom",{
      y:-50,
      opacity:1,
      delay:2
    })
    },[]);
  return (
    <section className='relative w-full nav-height  '>
        <div className='flex-col flex-center 
        w-full h-5/6'>
        <p id='hero' className='hero-title'>iPhone 15 Pro</p>
        <div className='md:w-10/12 max-md:max-w-[360px]'>
          <video className='pointer-events-none' autoPlay muted 
          playsInline={true} key={videoSrc} >
            <source src={videoSrc} type='video/mp4'/>
          </video>
        </div>
        </div>
        <div id="heroBottom" className='flex flex-col 
        items-center opacity-0 translate-y-20'>
          <a href="#highlights" className='btn' >Buy</a>
          <p className='font-normal text-xl'>From $199/month or $999</p>
        </div>
    </section>
  )
}

export default Hero