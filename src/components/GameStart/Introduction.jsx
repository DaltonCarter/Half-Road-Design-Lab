import React from 'react'
import { useNavigate } from 'react-router-dom'

const Backdrop = ({handleClick}) => {
    return <div onClick={() => handleClick()} className='gameover-backdrop parchment-bg bg-cover flex flex-col justify-center items-center'/>
}

const IntroductionOverlay = ({handleClick}) => {
    return (
        <div  onClick={() => handleClick()} className='gameover-modal flex flex-col justify-center items-center text-center'>
            <h1  className='border-8 border-double border-black p-2 text-4xl m-5 font-bold'>INTRODUCTION:</h1>
            <h3 className='border-8 border-double border-black p-2 text-2xl m-5 font-bold'>This is the only plot you're getting so pay attention...or don't up to you,
                but it MIGHT be important later... </h3>
            <p className='text-2xl m-5 font-semibold italic'>
                You hail from the Vernath Empire and are 'x'th child of a minor noble house.
                Meaning you don't get to rely on an inheritance like your older sibling(s).
                So you decided to take your love for combat and try to forge a Name
                and fortune all your own.
            </p>
            <p className='text-2xl m-5 font-semibold italic'>
                Your sharp mind, and raw talent in battle quickly brought
                you prominence in the Imperial Army. Ever hungry for the chance to
                improve, and test yourself you volunteered to be the Imperial representative
                at the Khadran Games. The Emperor, and Empress both gave you their blessings,
                and the promise of great rewards should you become Champion.
            </p>
            <h2 className='border-8 border-double border-black text-red-500 p-2 text-xl m-5 font-extrabold'> Click anywhere to continue...</h2>
        </div>
    )

}

const Introduction = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/Game')
        
    }
  return (
    <section >
    <Backdrop handleClick={handleClick}/>
    <IntroductionOverlay handleClick={handleClick}/>
    </section>
  )
}

export default Introduction