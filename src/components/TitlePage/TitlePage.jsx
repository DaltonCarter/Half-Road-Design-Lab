import React from 'react'
import Button from '../Button'
import {NavLink} from 'react-router-dom'

const TitlePage = () => {
  return (
    <main className='flex flex-col justify-evenly items-center'>
    <div className='text-4xl font-extrabold m-5'>Working Title: Sythoran Colosseum</div>
    <br/>
    <NavLink to={"/Game"}><Button className={'m-5 border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-blue-500 hover:bg-blue-300 focus:translate-y-1'} type={"Start Game"}/></NavLink>
    <NavLink to={"/About"}><Button className={'m-5 border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-blue-500 hover:bg-blue-300 focus:translate-y-1'} type={"About"}/></NavLink>
    
    



        <footer>Ver: 0.0.5 (Alpha)  Copyright 2023 Half-Road Design Lab</footer>
    </main>
  )
}

export default TitlePage