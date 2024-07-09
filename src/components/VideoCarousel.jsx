import React, { useEffect, useState, useRef } from 'react'
import {hightlightsSlides} from '../constants'
import gsap from 'gsap';
import { replayImg,playImg, pauseImg } from '../utils';
import { useGSAP } from '@gsap/react';

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);
  const [loadedData,setLoadedData] = useState([]);
  const [video,setVideo] = useState({
    isPlaying : false,
    isEnd: false,
    isLastVideo : false,
    videoId:0,
    startPlay:false
  });
  const {isPlaying, isEnd, isLastVideo, videoId, startPlay} = video;
  useGSAP(()=>{
   gsap.to("#slider", {
    transform:`translateX(${-100*videoId}%)`
   })
   gsap.to("#video",{
    scrollTrigger:{
      trigger:'#video',
      toggleActions:'restart none none none'
    },
    onComplete: ()=>{
      setVideo((pre)=>({...pre,startPlay:true,isPlaying:true}))
    }
   })
  },[isEnd,videoId]);
  const handleLoadedMetaData= (i,e)=> 
    setLoadedData((pre) => [...pre,e]);
  
  useEffect(()=>{
    if(loadedData.length > 3){
      if(!isPlaying){
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play()
      }
    }
  },[startPlay,videoId, isPlaying, loadedData])
  useEffect(()=>{
   let currentProgress = 0;
   let span = videoSpanRef.current;
  if(span && span[videoId]){
    //animate the progress of the video
    let anim = gsap.to(span[videoId],{
      onUpdate:() => {
       const progress = Math.ceil(anim.progress()*100);
       if(progress != currentProgress){
        currentProgress = progress;
       
       gsap.to(videoDivRef.current[videoId],{
        width: window.innerWidth<760 
        ? '10vw'
        :window.innerWidth < 1200?
        '10vw': '4vw'
       })

       gsap.to(span[videoId],{
        width: `${currentProgress}%`,
        backgroundColor:'white'
       });
      }
      },
      onComplete:() => {
        if(isPlaying){
          gsap.to(videoDivRef.current[videoId],{
            width:'12px'
          });
          gsap.to(span[videoId],{
            backgroundColor: '#afafaf'
          });
        }
      }
    })
  //  if(videoId === 0){
  //    anim.restart();
  //  }

    const animUpdate = () => {
      anim.progress(videoRef.current[videoId].currentTime /
        hightlightsSlides[videoId].videoDuration
      )
    }
    if(isPlaying){
      gsap.ticker.add(animUpdate);
    }
    else{
      gsap.ticker.remove(animUpdate);
    }
  }
  else {
    console.warn(`GSAP target for videoId ${videoId} not found.`);
  }
  },[videoId, startPlay]);
  const handleProcess = (type, i) => {
    switch (type){
      case 'video-end':
        console.log("videoId is equal to :"+videoId);  
      setVideo((prevVideo) => ({...prevVideo,isEnd:true,videoId:i+1}));    
        break;
      case 'video-last' :
        setVideo((prevVideo)=> ({...prevVideo, isLastVideo:true }))
        break;
      case 'video-reset' :
        setVideo((prevVideo)=>({...prevVideo,isLastVideo:false ,videoId:0}))
        break;
        case "pause":
          setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
          break;  
      case 'play':
        setVideo((prevVideo)=>({...prevVideo, isPlaying:!prevVideo.isPlaying}))
        break;
      default:
        return video;
    }
  }

  return (
    <>
    <div className='flex items-center'>
      {hightlightsSlides.map((list,i)=>(
       <div key={list.id} id='slider' className='sm:pr-20 pr-10'>
        <div className='video-carousel_container sm:pr-0 pr-8'>
           <div className='w-full h-full overflow-hidden bg-black
           rounded-3xl flex-center '>
           <video id='video' className={`${list.id === 2 && 
           "translate-x-44"} pointer-events-none`} muted playsInline={true} 
             preload='auto' ref={(el)=> (videoRef.current[i] = el)}
            onPlay={()=>
              setVideo((prevVideo)=>({...prevVideo,isPlaying:true}))}
            onLoadedMetadata={(e)=>handleLoadedMetaData(i,e)}
            onEnded={()=> i != 3? handleProcess('video-end',i):handleProcess('video-last')}
           >
            <source src={list.video} type='video/mp4'/>
           </video>
           </div>
           <div className='absolute top-12 left-[5%] md z-10'>
            {list.textLists.map((text)=>
            <p key={text} className='md:text-2xl 
            text-xl font-medium'>{text}</p>
            )}
           </div>
        </div>
       </div>
      ))}
    </div>
    <div className='relative flex-center mt-10 '>
      <div className='flex-center py-5 px-7 bg-gray-300
      backdrop-blur rounded-full'>
        {videoRef.current.map((_,i)=>(
          <span key={i} 
          ref={(el)=> (videoDivRef.current[i] = el)}
          className='mx-2 w-3 h-3 bg-gray-200 
          rounded-full relative cursor-pointer'
          >
           <span className='absolute h-full w-full rounded-full' 
           ref={(el)=> (videoSpanRef.current[i] = el)}/>
          </span>
        ))}
      </div>
        <button className='control-btn'>
          <img src={isLastVideo?replayImg:!isPlaying?playImg:pauseImg} 
          alt={isLastVideo?"replay":!isPlaying?"play":"pause"}
          onClick={isLastVideo?
            ()=> handleProcess('video-reset')
            :!isPlaying?
            ()=> handleProcess('play')
            : ()=> handleProcess('pause')
          }/>
        </button>
    </div>
    </>
  )
}

export default VideoCarousel