import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollTrigger);
export const animateWithGsap = (target, animationProps,scrollProps)=>{
    gsap.to(target,{
        ...animationProps,
        scrollTrigger:{
        trigger:target,        
        toggleActions:'restart reverse restart reverse',
        start: "top bottom", // start when the top of the element reaches the bottom of the viewport
        end: "bottom top", 
        ...scrollProps
        }
    })
}
