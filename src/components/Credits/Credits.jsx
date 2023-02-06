import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../Button'

const Credits = () => {
    const navigate= useNavigate()
  return (
    <div className='flex flex-col justify-center items-center parchment-bg bg-cover'>
      <h1 className='text-4xl font-extrabold m-5'>Credits and Thanks:</h1>
      <h1 className='text-4xl p-2 font-extrabold text-red-700'>DO NOT RIP THESE IMAGES!!! </h1>
        <p className='mb-3.5 text-3xl italic'>I provided the links go support these awesome people who put their works out there for free <br/>slash at a reasonable price so nerds like me can make amazing sites and games!</p>


        <h1 className='text-3xl italic font-bold'>Static Battler Graphics by Ækashics:</h1>
        <h2 className='text-3xl italic font-bold text-red-700'>If you like the Battler graphics please follow one of the links which will take you to where you can get access to them and Support this awesome Artist.</h2>
        <a className='mb-3.5 p-2 border-8 border-double border-black text-3xl font-bold text-blue-700 italic underline ' href='http://www.akashics.moe'>http://www.akashics.moe</a>
        <a className='mb-3.5 p-2 border-8 border-double border-black text-3xl font-bold text-blue-700 italic underline ' href='https://aekashics.itch.io/'>https://aekashics.itch.io/</a>

        <h1 className='text-3xl italic font-bold'>Half-Road Productions Icon:</h1>
        <a className='mb-3.5 p-2 border-8 border-double border-black text-3xl font-bold text-blue-700 italic underline ' href='https://www.canva.com/'>Made using resources on Canva.com.</a>
        

        <h1 className='text-3xl italic font-bold'>Colosseum Battle Background:</h1>
        <a className='mb-3.5 p-2 border-8 border-double border-black text-3xl font-bold text-blue-700 italic underline ' href="https://www.vecteezy.com/free-vector/battle-background">Link to: Battle Background Vectors by Vecteezy</a>
        <a className='mb-3.5 p-2 border-8 border-double border-black text-3xl font-bold text-blue-700 italic underline ' href='https://www.vecteezy.com/vector-art/15370321-ancient-roman-arena-for-gladiators-fight'>Link to: The Background Image</a>
       
        <h1 className='text-3xl italic font-bold'>Crossed Swords graphic used in W.I.P Title Image:</h1>
        <a className='mb-3.5 p-2 border-8 border-double border-black text-3xl font-bold text-blue-700 italic underline ' href='https://www.vecteezy.com/vector-art/7275947-swords-crossed-emblem'>https://www.vecteezy.com/vector-art/7275947-swords-crossed-emblem</a>

        <h1 className='text-3xl italic font-bold'>Parchment Background:</h1>
        <a className='mb-3.5 p-2 border-8 border-double border-black text-3xl font-bold text-blue-700 italic underline ' href='https://www.myfreetextures.com/worn-parchment-paper-2/'>Link to: An old and worn out parchment paper background texture
By: Phil</a>

<Button className={'font-bold border-8 border-double border-black w-36 h-12 rounded-lg shadow-xl bg-white hover:bg-yellow-200 focus:translate-y-1'} onClick={() => navigate('/')} type={'Return to Title'}/>
    </div>
  )
}

export default Credits