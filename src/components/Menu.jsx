import React, { useRef, useState } from 'react'
import { sliderLists } from '../../constants'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Menu = () => {
    const [currentIndex,setCurrentIndex] = useState(0);
    const [currentCocktail,setCurrentCocktail] = useState(sliderLists[currentIndex]);
    
    const totalCockTail = sliderLists.length;
    const goToSlide = (index)=>{
        const newIndex = (index+ totalCockTail) % totalCockTail;
        setCurrentIndex(newIndex)
        setCurrentCocktail(sliderLists[newIndex])
    }

    const [isLeft,setIsLeft] = useState(true)
    const  contentRef = useRef();
    useGSAP(()=>{
      gsap.fromTo('#title',{
        opacity:0
      },{
        opacity:1,
        duration:1
      })
      gsap.fromTo('.cocktail img',{
       opacity:0,
       xPercent:isLeft?-100:100,
      },
    {
        opacity:1,
        xPercent:0,
        duration:1,
        ease:'power1.inOut'
    })
    },[currentIndex])
  return (
    <section id="menu" aria-labelledby='menu-heading'>
     <img src='/images/slider-left-leaf.png' alt="left-leaf" id='m-left-leaf'/>
     <img src='/images/slider-right-leaf.png' alt="right-leaf" id='m-right-leaf'/>

      <h2  id='menu-heading' className='sr-only'> 
        Cocktail Menu
      </h2>
      <nav className='cocktail-tabs' aria-label='cocktail Navigation'>
     {
        sliderLists.map((item,index)=>{
         const isActive = index==currentIndex;
         return (
            <button onClick={()=>goToSlide(index)} key={item.id} className={`${isActive?'text-white border-white':'text-white/50 border-white/50'}`}>
          {item.name}
            </button>
         )
})
     }
      </nav>
      <div className='content'>
    <div className='arrows'>
     <button className='text-left' onClick={()=>{
         goToSlide(currentIndex-1)
         setIsLeft(true);
     }}>
     <span>{sliderLists[currentIndex-1<0?sliderLists.length-1:currentIndex-1].name}</span>
     <img src='/images/right-arrow.png' alt='right-arrow' aria-hidden="true"/>
     </button>
     
      <button className='text-right' onClick={()=> {
        goToSlide(currentIndex+1)
        setIsLeft(false)
      }}>
     <span>{sliderLists[currentIndex+1>=sliderLists.length?0:currentIndex+1]?.name}</span>
     <img src='/images/left-arrow.png' alt='left-arrow' aria-hidden="true"/>
     </button>
    </div>
    <div className='cocktail'>
     <img src={currentCocktail.image} className='object-contain'/>
    </div>
    <div className='recipe'>
   <div className='info' ref={contentRef}>
    <p>Recipe for :</p>
    <p id='title'>{currentCocktail.name}</p>
   </div>
   <div className='details'>
    <h2>{currentCocktail.title}</h2>
    <p>{currentCocktail.description}</p>
   </div>
    </div>
      </div>
    </section>
  )
}

export default Menu