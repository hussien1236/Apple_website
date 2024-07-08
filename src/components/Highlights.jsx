import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import React from 'react'
import {watchImg, rightImg} from '../utils'
import VideoCarousel from './VideoCarousel';
import { animateWithGsap } from '../utils/animation';

const Highlights = () => {
  useGSAP(()=>{
  animateWithGsap("#title",{
    y:0,
    opacity:1
  })
  gsap.to(".link", {
    y:0,
    opacity:1,
    duration:1,
    stagger:0.25
  })
  },[]);
  return (
    <section id="highlights" className='w-screen h-full  common-padding
    bg-zinc'>
      <div className='screen-max-width'>
        <div className='mb-12 w-full items-end justify-between md:flex'>
          <h1 id="title" className='section-heading'>Get the highlights.</h1>
          <div className='flex flex-wrap gap-5 '>
            <p className='link'>Watch the film <img className='ml-2' src={watchImg} alt="watch" /></p>
            <p className='link'>Watch the event <img className='ml-2' src={rightImg} alt="right" /></p>
          </div>
        </div>
        <VideoCarousel/>
      </div>
    </section>
  )
}

export default Highlights