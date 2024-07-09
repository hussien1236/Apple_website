import { useGSAP } from '@gsap/react'
import { useState} from 'react'
import { all_colorsImg } from '../utils'
import {models} from '../constants'
import { animateWithGsap } from '../utils/animation'
const Model = () => {
    useGSAP(()=>{
 //   animateBottomPart('#section','#bottom');
     animateWithGsap('#heading',{
        y:0, opacity:1
     })
    },[])
    const [model, setModel] = useState({
        id:1,
        title: '6.1” iPhone 15 Pro2 in four colors',
        color:['#8F8A81', '#FFE789', '#6F6C64'],
        img: all_colorsImg
    })


  return (
    <section id='section' className='common-padding'>
      <div className='screen-max-width'>
         <h1 id="heading" className='section-heading '>
            Take a closer look.
         </h1>
      </div>
       {/* <div className='flex  '> */}
       <div className='w-full flex flex-col items-center justify-center h-[75vh] md:h-[90vh]
            overflow-hidden relative '>
               <div>
            <img src={model.img} alt={model.title} className={`lg:h-[500px] md:h-[400px] ${model.id == 1?'h-[300px]':'h-[400px]'}`}/>
              </div>
      </div>  
      <div id='bottom' className='mx-auto w-full flex-col items-center z-10'>
               <p className='text-sm font-light text-center
               mb-5'>{model.title}</p>
               <div className='flex-center'>
                 <ul className='color-container'>
                  {models.map((item,i)=>(
                     <li key={i} className={`w-6 h-6
                     rounded-full mx-2 cursor-pointer 
                     ${item.id === model.id?'border-2 border-white':''}`} style={{backgroundColor:item.color[0]}}
                     onClick={()=> setModel(item)} />
                  ))}
                 </ul>
               </div>
      </div>
      {/* </div> */}
    </section>
  )
}

export default Model