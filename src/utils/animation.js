import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollTrigger);
export const animateWithGsap = (target, animationProps,scrollProps)=>{
    gsap.to(target,{
        ...animationProps,
        scrollTrigger:{
        trigger:target,        
        toggleActions:'restart reverse restart reverse',
        start:'top 85%',
        ...scrollProps
        }
    })
}
export const animateBottomPart = (section,target)=>{
gsap.timeline(target,{    
        scrollTrigger:{
        trigger:section,
        start: 'top top', // When the section top reaches the top of the viewport
        end: 'bottom bottom', // When the section bottom reaches the top of the viewport
        pin: target
        }
})
}