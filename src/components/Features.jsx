import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { animateWithGsap } from '../utils/animation';
import { explore1Img,explore2Img, exploreVideo } from '../utils';
import gsap from 'gsap';

const Features = () => {
    const videoRef = useRef();
    useGSAP(()=>{
        gsap.to(videoRef.current,{
         scrollTrigger:{
            trigger:videoRef.current,
            toggleActions:'play pause reverse restart' 
         },
         onComplete:()=>{
            videoRef.current.play();
         }
        })
        animateWithGsap('#feature_title', {y:0, opacity:1}),
        animateWithGsap('.g_grow', 
            {scale:1, opacity:1, ease:'power1'}
        )
        animateWithGsap('.g_text',
            {y:0, opacity:1,
                 stagger: 0.2,
                },
            {scrub:1}    
)
      },[])
    return (
    <section className='h-full common-padding bg-zinc
    relative overflow-hidden'>
    <div className='screen-max-width'>
      <div className='mb-12 w-full'>
         <h1 id="feature_title"
         className='section-heading'>Explore the full story.</h1>
      </div>
      <div className='flex flex-col justify-center items-center
      overflow-hidden'>
        <div className='mt-30 mb-24 pl-10'>
        <h2 className='text-5xl lg:text-7xl 
            font-semibold'>iPhone.</h2>
        <h2 className='text-5xl lg:text-7xl 
            font-semibold'>Forged in titanium.</h2>
        </div>
        <div className='flex-center flex-col sm:px-10'>
            <div className='relative h-[50vh] w-full flex
            items-center mb-5'>
                <video playsInline id='exploreVideo'
                className='w-full h-full object-cover
                object-center' preload="none" muted
                autoPlay ref={videoRef}>
                    <source src={exploreVideo} type='video/mp4'/>
                </video>
            </div>
            <div className='flex flex-col w-full relative'>
                <div className='feature-video-container'>
                    <div className='overflow-hidden flex-1 h-[50vh]'>
                        <img src={explore1Img} alt="titanium" 
                        className='feature-video g_grow'/>
                    </div> 
                    <div className='overflow-hidden flex-1 h-[50vh]'>
                        <img src={explore2Img} alt="titanium2" 
                        className='feature-video g_grow'/>
                    </div>
                </div>
                <div className='feature-text-container'>
                    <p className='feature-text g_text'>
                        iPhone 15 Pro is {' '}
                        <span className='text-white'>
                            the first iPhone to feature an 
                            aerospace-grade titanium design
                        </span>,
                        using the same alloy that spacecrafts
                        use for missions to Mars.
                    </p>
                    <p className='feature-text g_text'>
                        Titanium has one of the best 
                        strength-to-weight ratios of any
                        metal, making these our {' '}
                        <span className='text-white'>
                        lightest Pro models ever.   
                        </span>,
                        You'll notice the difference the 
                        moment you pick one up.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>  
    </section>
  )
}

export default Features